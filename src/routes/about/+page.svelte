<script>
	import header from '$lib/images/about/pond-header.jpg';
	import dales from '$lib/images/about/dales.jpg';
	import kate from '$lib/images/about/kate.jpg';
</script>


<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
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
			<h1>About Kate</h1>
			<p>
				Meet Kate, a dedicated childminder who believes in the
				importance of taking children outside to play and explore. Kate
				is proud to have a "good" Ofsted rating, which is a testament to
				her hard work and dedication to providing a safe and nurturing
				environment for the children in her care.
			</p>
			<p>
				With Kate as their childminder, parents can have peace of mind
				knowing that their children are in good hands.
			</p>

			<p>
				Kate's childminding setting is located in Skelton, TS12. Skelton
				is a small town in the borough of Redcar and Cleveland, in the
				ceremonial county of North Yorkshire. The town is surrounded by
				beautiful countryside, making it an ideal location for taking
				children outside to play and explore. Kate's setting serves the
				families in and around Skelton, Saltburn and Brotton, providing
				a convenient and accessible option for parents in the area who
				are in need of childminding services.
			</p>
		</div>
	</div>
</section>
