import { createHash } from "node:crypto";
import { env } from "$env/dynamic/private";
import { execSync } from "node:child_process";
import { fail } from "@sveltejs/kit";
import { writeFile } from "node:fs/promises";

export const filesRootFolder = "tmp/"
export const inputFolder = filesRootFolder + "input/"
export const outputFolder = filesRootFolder + "output/"
export const bannedExtensions = ["js", "ts", "zip", "7z", "tar", "exe", "sh", "bat"]

export const actions = {
  upload: async ({ cookies, request, url }) => {
    checkFeatureFlags()

    const uploadFile = await getFileFromFormData(request)

    if (!uploadFile) {
      return fail(400, { missing: true })
    }

    if (hasBannedExtension(uploadFile)) {
      console.error("Tried to upload banned extension file.")
      return fail(400, { incorrect: true })
    }

    const hashInputFile = computeHash(uploadFile.name)

    const inputPath = inputFolder + hashInputFile + "." + getExtensionOfFile(uploadFile)
    const outputPath = outputFolder + hashInputFile + ".tar.bz3"

    await writeFile(inputPath, Buffer.from(await uploadFile.arrayBuffer()))
    const { error, stdout, stderr } = execSync(`touch ${outputPath} & tar -cvf - ${inputPath} | bzip3 -j 16 > ${outputPath}`)
    if (error) {
      console.error(error)
      return fail(500)
    }
    return { success: true, message: hashInputFile }
  }
}

export function checkFeatureFlags() {
  if (env.FEATURE_FLAG_LOGIN === "true") {
    console.log("But are you logged in?")
  }
  if (env.FEATURE_FLAG_PRICING === "true") {
    console.log("But did you pay for that?")
  }
  return
}

export function computeHash(fileName: string) {
  return createHash("sha1").update(fileName + env.SECRET).digest('hex')
}

export async function getFileFromFormData(request: Request) {
  const data = await request.formData()
  const uploadFile = data.get("uploadedFile") as File
  return uploadFile
}

export function hasBannedExtension(uploadFile: File) {
  const extension = getExtensionOfFile(uploadFile)
  return bannedExtensions.includes(extension)
}

export function getExtensionOfFile(file: File) {
  return file.name.split(".")[1]
}

export function fetchUploadedFileAndDownload(form: Response) {
  var filename = "";
}
