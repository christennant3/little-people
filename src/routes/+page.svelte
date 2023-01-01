<script>
	import Counter from "./Counter.svelte";

	import { Grid, Row, Column } from "carbon-components-svelte";
	import "carbon-components-svelte/css/white.css";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="content">
	<div id="image-section">
		<img
			src="/src/lib/images/home/home-banner.jpg"
			alt="girls playing in the woods"
		/>
	
	</div>

	<Grid>
  <Row>
    <Column sm={1} md={4} lg={8}>sm: 1, md: 4, lg: 8</Column>
    <Column sm={1} md={2} lg={2}>sm: 1, md: 2, lg: 2</Column>
    <Column sm={1} md={1} lg={1}>sm: 1, md: 1, lg: 1</Column>
    <Column sm={1} md={1} lg={1}>sm: 1, md: 1, lg: 1</Column>
  </Row>
</Grid>


	<Grid>
		<Row>
			<Column>Column</Column>
			<Column>Column</Column>
			<Column>Column</Column>
			<Column>Column</Column>
		</Row>
	</Grid>

	<Grid>
		<Row>
			<Column sm={12} md={4} lg={4}>
				<img alt="Little People Logo" src="/src/lib/images/logo.png" />
			</Column>
			<Column sm={12} md={8} lg={8}>col 2 reht hrehreth</Column>
		</Row>
	</Grid>

	<!-- 	<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture> -->
	<h1>
		<span class="welcome"> HELLO </span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<Grid>
	<Row>
		<Column sm={12} md={4} lg={8}>sm: 1, md: 4, lg: 8</Column>
		<Column sm={12} md={2} lg={2}>sm: 1, md: 2, lg: 2</Column>
		<Column sm={12} md={1} lg={1}>sm: 1, md: 1, lg: 1</Column>
		<Column sm={12} md={1} lg={1}>sm: 1, md: 1, lg: 1</Column>
	</Row>
</Grid>

<style lang="scss">

	#image-section {
		img {
			max-width: 100%;
		}
	}
	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>
