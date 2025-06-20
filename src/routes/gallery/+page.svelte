
<script>
	import { onMount } from 'svelte';
	let galleryReady = false;

	onMount(() => {
		// Check if the custom element is already defined
		if (customElements.get('image-gallery')) {
			galleryReady = true;
			return;
		}

		// If not defined, wait for it to be defined
		const observer = new MutationObserver(() => {
			if (customElements.get('image-gallery')) {
				galleryReady = true;
				observer.disconnect();
			}
		});

		observer.observe(document.head, {
			childList: true,
			subtree: true
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Little Peoples' Childminding Gallery</title>
	<meta name="Childminder Skelton Gallery" content="Gallery and images" />
</svelte:head>

<section id="content">
	<div class="grid grid-cols-1 md:grid-cols-1 gap-1 pt-5 px-2 md:px-6">
		<div class="text-center">
			<h1 class="hidden lg:block">Gallery</h1>
			{#if galleryReady}
				<image-gallery></image-gallery>
			{:else}
				<div class="min-h-[300px] md:min-h-[600px] flex items-center justify-center">
					<p>Loading gallery...</p>
				</div>
			{/if}
		</div>
	</div>
</section>


