import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
import { files, users } from './schema';
import moment from "moment";
import { and, eq, not } from 'drizzle-orm';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = new Database(env.DATABASE_URL);
export const db = drizzle(client);

export interface UploadFile {
  hash: string,
  path: string,
  sizeInBytes: number
}

export interface CompressedFile {
  path: string,
}

export interface User {
  id: number,
  email: string,
  password: string,
  subscriptioneExpirationDate: string,
  totalBandwidthLeftInGB: number
}

export async function uploadFileToDb(originalFile: UploadFile, compressedFile: CompressedFile, userId: number) {
  const todaysDate = moment()
  console.log("Let's check first.")
  const fileInDb = await db.select({
    howManyTimesUploaded: files.howManyTimesUploaded,
    expirationDate: files.expirationDate
  })
    .from(files)
    .where(and(eq(files.hash, originalFile.hash),
      eq(files.toBeDeleted, 0),
      not(eq(files.expirationDate, todaysDate.format("D-MM-YYYY")))))

  if (fileInDb && fileInDb[0]) {
    console.log("File exists in db.")
    await db.update(files)
      .set({ howManyTimesUploaded: fileInDb[0].howManyTimesUploaded + 1 })
      .where(eq(files.hash, originalFile.hash))
    return fileInDb[0].howManyTimesUploaded
  }
  console.log("New file in db.")

  await db.insert(files).values(
    {
      hash: originalFile.hash,
      originalPath: originalFile.path,
      sourcePath: compressedFile.path,
      rawSizeBytes: originalFile.sizeInBytes,
      compressedSizeBytes: null,
      howManyTimesUploaded: null,
      toBeDeleted: 0,
      expirationDate: todaysDate.add(2, 'days').format("D-MM-YYYY"),
      uploadedBy: userId.toString()
    }
  )
}

export async function registerNewUser(newUser: User) {
  await db.insert(users).values(
    {
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
      subscriptioneExpirationDate: newUser.subscriptioneExpirationDate,
      totalBandwidthLeftInGB: newUser.totalBandwidthLeftInGB
    }
  )
}

export async function checkIfUserMatchesInDatabase(email: string, password: string) {
  const result = await db.select({ password: users.password }).from(users).where(eq(users.email, email))
  console.log(result)
  if (result.length === 0 || result[0].password !== password) {
    return false
  }
  return true
}
