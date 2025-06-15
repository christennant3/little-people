<script>
	import Side from "../../lib/components/Side.svelte";
	import header from "$lib/images/about/pond-header.jpg";
</script>

<svelte:head>
	<title>Contact me</title>
	<meta
		name="description"
		content="Contat Little People Childminding Skelton"
	/>
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
			<h1>Contact Me</h1>

			<p><a href="mailto:kate.tennant91@gmail.com>" class="text-xl pb-3"
				>kate.tennant91@gmail.com</a
			></p>
			<p>
				If you have any questions or would like to discuss your child's
				care, please feel free to reach out via email. I look forward to
				hearing from you!
			</p>
		</div>
	</div>
</section>
