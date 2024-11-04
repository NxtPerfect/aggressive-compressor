import { writeFile, readFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

export const actions = {
  upload: async ({ cookies, request, url }) => {
    if (env.FEATURE_FLAG_LOGIN === "true") {
      console.log("But are you logged in?")
    }
    if (env.FEATURE_FLAG_PRICING === "true") {
      console.log("But did you pay for that?")
    }

    const data = await request.formData()
    const uploadFile = data.get("uploadedFile")

    if (!uploadFile || !data) {
      return fail(400, { missing: true })
    }

    const extension = uploadFile.name.split(".")[1]
    const bannedExtensions = ["js", "ts", "zip", "7z", "tar", "exe", "sh", "bat"]
    if (bannedExtensions.includes(extension)) {
      console.error("Tried to upload banned extension file.")
      return fail(400, { incorrect: true })
    }

    const hashInputFile = computeHash(uploadFile.name)
    console.log("Hash of file", hashInputFile)
    const inputPath = "tmp/input/" + hashInputFile + "." + extension
    const outputPath = "tmp/output/" + hashInputFile + ".tar.bz3"
    await writeFile(inputPath, Buffer.from(await uploadFile.arrayBuffer()))
    const { error, stdout, stderr } = execSync(`touch ${outputPath}
                                      & tar -cvf - ${inputPath}
                                      | bzip3 -j 16 > ${outputPath}`)
    if (error) {
      console.error(error)
      return fail(500)
    }
    const output = await readFile(outputPath)
    console.log("Output:", output)
    // if (url.searchParams.has('redirectTo')) {
    //   redirect(303, url.searchParams.get('redirectTo'));
    // }
    return { success: true }
  },
  download: async ({ cookies, request }) => {
    console.log("Here to download a file fr fr fr")
    return { success: true }
  }
}

function computeHash(fileName: string) {
  return createHash("sha1").update(fileName + env.SECRET).digest('hex')
}
