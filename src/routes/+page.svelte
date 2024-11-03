<main class="text-white bg-black pt-52 min-h-[100svh] flex flex-col justify-self-center content-center items-center">
  <h1 class="text-white text-2xl">Welcome to <span class="font-mono text-red-500 shadow-black animate-pulse duration-500 text-4xl tracking-wide">Aggressive Compressor</span></h1>

  <form method="POST" enctype="multipart/form-data" class="flex flex-col gap-2 w-fit items-center mt-16">
    <input type="file" id="uploadedFile" name="uploadedFile" class="text-white" accept="video/*, audio/*, text/*, image/*, .md, .json" required/>
    <button class="bg-white px-2 py-1 text-black w-fit rounded-md hover:bg-neutral-600 active:bg-neutral-400" type="submit">Upload file</button>
  </form>

  <h2 class="mt-64 text-4xl">FAQ</h2>
  <div class="flex flex-col mx-24 gap-16">
    <div class="grid grid-cols-2 gap-16 min-h-[6lh] justify-center justify-items-center items-center self-center content-center">
      <h3 class="text-2xl">What?</h3>
      <p>It's a website to compress any non-executable and non-code file to as small size as possible. Perhaps you need to send it through an email, or you simply have bad bandwidth, or the receipant. Aggressive Compressor lets you solve these issues with easy of use web interface.</p>
    </div>
    <div class="grid grid-cols-2 gap-16 min-h-[6lh] justify-items-center items-center content-center">
      <h3 class="text-2xl">How?</h3>
      <p>Using Linux magic and a bit of celestial dust, we can achieve the best compression any other website on this domain has ever done.</p>
    </div>
    <div class="grid grid-cols-2 gap-16 min-h-[6lh] justify-items-center items-center content-center">
      <h3 class="text-2xl">Why?</h3>
      <p>Aggressive Compressor is a hobby project created from a simple idea, how much can you really compress a file? How corrupt would the data be? What is the limit of compression, before being unusable? All of these questions this project answers</p>
    </div>
  </div>
</main>
