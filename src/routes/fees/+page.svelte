<script>
	import Free from "$lib/components/Free.svelte";
	import header from "$lib/images/about/pond-header.jpg";
	import Side from "$lib/components/Side.svelte";
    import Hours from "$lib/components/Hours.svelte";
</script>

<svelte:head>
	<title>Fees</title>
	<meta name="description" content="Childminding fees in skelton" />
</svelte:head>

<section id="content">
	<div id="image-section">
		<img src={header} alt="children down at Skelton pond" class="mx-auto" />
	</div>

	<div id="main-content" class="grid grid-cols-1 md:grid-cols-7">
		<div
			class="col-span-1 md:col-span-2 text-center order-2 md:order-1 mx-auto"
		>
			<Side />
		</div>
		<div class="col-span-1 md:col-span-5 order-1">
			<h1>Fees and free childcare</h1>
			<p>
				I am registered to provide funded childcare for children aged 9
				months to nursery age. This means you can access up to 30 hours
				of free childcare per week during term time, depending on your
				eligibility.
			</p>
			<Free />
			<Hours />
		</div>
	</div>
</section>

<style lang="scss">
</style>
