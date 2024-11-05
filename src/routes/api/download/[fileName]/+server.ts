import { readFileSync, readFile } from "node:fs";

export async function GET({ params }) {
  const fileName = params.fileName;
  const filePath = './tmp/output/' + fileName + ".tar.bz3";

  try {
    const data = readFileSync(filePath)
    if (!data) {
      throw new Error("Couldn't open file.")
    }
    const contentType = "application/x-bzip2"

    return new Response(data, {
      status: 200,
      headers: {
        "Content-type": contentType,
        "Content-disposition": "attachment; fileName=" + fileName + ".tar.bz3"
      },
    });
  }
  catch (error) {
    console.log(error)
    return new Response("File not found.", {
      status: 404,
    });
  }
}
