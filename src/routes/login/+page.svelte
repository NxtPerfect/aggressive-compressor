<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>
<main>
  <form action="?/login" method="POST" class="flex flex-col max-w-[50svw] px-8 gap-4 items-center">
    <input class="bg-black text-white border-solid border-neutral-500 border-2" type="email" name="email" required/>
    <input class="bg-black text-white border-solid border-neutral-500 border-2" type="password" name="password" required/>
    <button class="hover:bg-neutral-500 bg-black text-white" type="submit">Login</button>
    {#if !form?.success}
      <span class="bg-red-600 text-white">Failed to log in. Check if you put correct credentials.</span>
    {/if}
  </form>
</main>
