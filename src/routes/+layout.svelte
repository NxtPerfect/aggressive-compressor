<script lang="ts">
	import '../app.css';
	let { children } = $props();
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<Nav/>
<main class="text-white bg-black pt-52 min-h-[100svh] flex flex-col justify-self-center content-center items-center">
  {@render children()}
</main>
<Footer/>
