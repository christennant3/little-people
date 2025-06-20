<script>
	import header from '$lib/images/about/pond-header.jpg';
	import dales from '$lib/images/about/dales.jpg';
	import kate from '$lib/images/about/kate.jpg';

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="Child minding policies" />
</svelte:head>

<section id="content">
	<div id="image-section">
		<img
			src="{header}"
			alt="children down at Skelton pond"
			class="mx-auto"
		/>
	</div>

	<div id="main-content" class="grid grid-cols-1 md:grid-cols-7">
		<div class="col-span-1 md:col-span-2 text-center order-2 md:order-1 mx-auto">
			<img
				src="{dales}"
				alt="Kate"
				class="mb-6"
			/>

			<img src="{kate}" alt="Kate" class="mb-6" />
		</div>
		<div class="col-span-1 md:col-span-5 order-1">
			<h1>Policies</h1>
			
		</div>
	</div>
</section>
