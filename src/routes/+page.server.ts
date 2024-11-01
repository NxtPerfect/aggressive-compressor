// import { $ } from "bun";

export const actions = {
  upload: async ({ request }) => {
    const data = await request.formData();
    // Since this is a request, it won't work
    const file = data.get("uploadedFile") as File;
    console.log(file)
    // Save file
    // await Bun.write(`./tmp/input/${file.name}`, file)
    // console.log("We're in the server now");
    // // tar -czf - ./tmp/input/${file.name} | bzip3 ./tmp/output/${noExtensionFileName}.tar.bz
    // const [noExtensionFileName, fileExtension] = file.name.strip(".")
    //
    // const bannedExtensions = ["js", "ts", "zip", "7z", "tar", "tar.gz", "tar.bz", "exe", "sh", "bat"]
    // if (bannedExtensions.includes(fileExtension)) {
    //   console.error("Tried to upload banned extension file.")
    //   return
    // }
    // await $`tar -czf - ./tmp/input/${file.name} | bzip3 ./tmp/output/${noExtensionFileName}.tar.bz`
  }
}

function computeHash(fileName) {
  return -1
}
