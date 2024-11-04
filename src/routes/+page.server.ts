import { writeFile, readFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const uploadFile = data.get("uploadedFile") as File;
    // console.log("Array buffer of original file", uploadFile.arrayBuffer())

    const extension = uploadFile.name.split(".")[1]
    const bannedExtensions = ["js", "ts", "zip", "7z", "tar", "exe", "sh", "bat"]
    if (bannedExtensions.includes(extension)) {
      console.error("Tried to upload banned extension file.")
      return fail(500, { message: "Tried to upload banned file type." })
    }

    const hashInputFile = computeHash(uploadFile.name)
    console.log("Hash of file", hashInputFile)
    const inputPath = "tmp/input/" + hashInputFile + "." + extension
    const outputPath = "tmp/output/" + hashInputFile + ".tar.bz3"
    await writeFile(inputPath, Buffer.from(await uploadFile.arrayBuffer()))
    const {error, stdout, stderr} = execSync(`touch ${outputPath} & tar -cvf - ${inputPath} | bzip3 -j 16 > ${outputPath}`)
    if (error) {
      console.error(error)
      return fail(500, { message: "Failed to compress file." })
    }
    const output = await readFile(outputPath)
    console.log("Output:", output)
    return { success: true, file: output}
  }
}

function computeHash(fileName: string) {
  return createHash("sha1").update(fileName + env.SECRET).digest('hex')
}
