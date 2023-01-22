<script>
	import Counter from "./Counter.svelte";

	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="Little Peoples' Childminding in Skelton"
		content="Childminding in Skelton"
	/>
</svelte:head>

<section id="content">
	<div id="image-section">
		<img
			src="/src/lib/images/home/home-banner.jpg"
			alt="girls playing in the woods"
			class="mx-auto pt-4"
		/>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-7 gap-1 pt-5 px-2 md:px-6">
		<div class="col-span-2 text-center order-2 md:order-1">
			<img
				src="/src/lib/images/logo.png"
				alt="Little Peoples' Childminding Logo"
				class="mx-auto"
			/>
			<div class="text-center">
				<p class="font-bold text-xl pb-3">Enquire now</p>
				M:07961610806<br />Tel:02085672669
			</div>
		</div>
		<div class="col-span-5 order-1">
			<h1>Welcome to Little Peoples' Childminding</h1>

			<p>
				Welcome to our childminding setting in Skelton East Cleveland.
				My name is Kate. I believe in the importance of spending time
				outdoors and allowing children to explore and discover the
				natural world around them. Our setting is located in a beautiful
				and safe area, perfect for outdoor play and learning.
			</p>

			<p>
				I will provide a nurturing and
				stimulating environment for your child. We plan a variety of
				activities that encourage children to learn through play,
				including outdoor games, gardening, and nature walks.
			</p>

			<p>
				I believe in the benefits of fresh air and exercise for both
				physical and mental well-being and try to spend as much time
				outside as possible. From building dens, to bug hunting, to
				gardening, children will have the opportunity to learn and
				discover in the great outdoors.
			</p>

			<p>
				At our childminding setting, we strive to provide a safe,
				stimulating, and enjoyable environment for children to grow and
				learn. If you're interested in learning more about our services,
				please do not hesitate to contact us.
			</p>

			<h2>Ofsted</h2>
			<p>I am rated good. Download my report.</p>
		</div>
	</div>
</section>

<style lang="scss">
	#image-section {
		img {
			max-width: 100%;
		}
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>
