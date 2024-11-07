import { createHash } from "node:crypto";
import { env } from "$env/dynamic/private";
import { execSync } from "node:child_process";
import { fail } from "@sveltejs/kit";
import { writeFile } from "node:fs/promises";
import { type UploadFile, type CompressedFile, type User, uploadFileToDb, registerNewUser } from "$lib/server/db";

export const filesRootFolder = "tmp/"
export const inputFolder = filesRootFolder + "input/"
export const outputFolder = filesRootFolder + "output/"
export const bannedExtensions = ["js", "ts", "zip", "7z", "tar", "exe", "sh", "bat"]

export const actions = {
  upload: async ({ request }) => {
    checkFeatureFlags("login")
    checkFeatureFlags("pricing")

    const uploadFile = await getFileFromFormData(request)

    if (!uploadFile) {
      return fail(400, { missing: true })
    }

    if (hasBannedExtension(uploadFile)) {
      console.error("Tried to upload banned extension file.")
      return fail(400, { incorrect: true })
    }

    const hashInputFile = computeHash(uploadFile.name)
    const inputFile = sanitizePaths(hashInputFile + "." + getExtensionOfFile(uploadFile))
    const inputPath = sanitizePaths(inputFolder + inputFile)
    const inputFileSize = uploadFile.size
    const dbUploadFile = {
      hash: computeHash(uploadFile.name),
      path: inputPath,
      sizeInBytes: inputFileSize
    } as UploadFile

    const outputPath = sanitizePaths(outputFolder + hashInputFile + ".tar.bz3")
    const dbCompressedFile = {
      path: outputPath,
    } as CompressedFile

    // const newUser = {
    //   id: 0,
    //   email: "admin@admin.io",
    //   password: "admin",
    //   subscriptioneExpirationDate: "01-01-2077",
    //   totalBandwidthLeftInGB: 1024
    // } as User
    //
    // await registerNewUser(newUser)
    await uploadFileToDb(dbUploadFile, dbCompressedFile, 0)

    await writeFile(inputPath, Buffer.from(await uploadFile.arrayBuffer()))
    const { error, stdout, stderr } = execSync(`tar -C "${inputFolder}" -cvf "${outputPath}" "${inputFile}" -I bzip3`)
    if (error) {
      console.error(error)
      return fail(500)
    }
    return { success: true, message: hashInputFile }
  }
}

function checkFeatureFlags(flag: "login" | "pricing") {
  if (flag === "login" && env.FEATURE_FLAG_LOGIN === "true") {
    console.log("But are you logged in?")
    return true
  }
  if (flag === "pricing" && env.FEATURE_FLAG_PRICING === "true") {
    console.log("But did you pay for that?")
    return true
  }
  return false
}

function computeHash(fileName: string) {
  return createHash("sha1").update(fileName + env.SECRET).digest('hex')
}

function sanitizePaths(input: string) {
  return input.replace(/[^a-zA-Z0-9_\-\.\/]/g, '')
}

async function getFileFromFormData(request: Request) {
  const data = await request.formData()
  const uploadFile = data.get("uploadedFile") as File
  return uploadFile
}

function hasBannedExtension(uploadFile: File) {
  const extension = getExtensionOfFile(uploadFile)
  return bannedExtensions.includes(extension)
}

function getExtensionOfFile(file: File) {
  return file.name.split(".")[1]
}
