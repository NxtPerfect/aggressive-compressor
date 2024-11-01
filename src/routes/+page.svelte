<main class="bg-black pt-52 h-[100svh] flex flex-col justify-self-center content-center items-center">
  <h1 class="text-white">Welcome to <span class="text-lg font-mono text-red-500 shadow-black animate-pulse duration-500">Aggressive Compressor</span></h1>

  <form method="POST" action="?/upload" class="flex flex-col gap-2 w-fit items-center mt-16">
    <input type="file" id="uploadedFile" name="uploadedFile" class="text-white" accept="video/*, audio/*, text/*, image/*, .md, .json" required/>
    <button class="bg-white px-2 py-1 text-black w-fit rounded-md hover:bg-neutral-600 active:bg-neutral-400" type="submit">Upload file</button>
  </form>
</main>
