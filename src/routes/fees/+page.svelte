<svelte:head>
	<title>Fees</title>
	<meta name="description" content="Childminding fees in skelton" />
</svelte:head>

<section id="content">
	<div id="image-section">
		<img
			src="/src/lib/images/about/pond-header.jpg"
			alt="children down at Skelton pond"
			class="mx-auto pt-4"
		/>
	</div>

	<div id="main-content" class="grid grid-cols-1 md:grid-cols-7">
		<div class="col-span-1 md:col-span-2 text-center order-2 md:order-1 mx-auto">
			<Side />
		</div>
		<div class="col-span-1 md:col-span-5 order-1">
			<h1>Fees</h1>
			
		</div>
	</div>
</section>

<script>

	import Side from "../../lib/components/Side.svelte";
</script>
