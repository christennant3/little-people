

<div class="app">
	<div id="wrapper">
		<Header />

		<main class="bg-white">
			<slot />
		</main>

		<Footer />
	</div>
</div>

<style>
	.app {
		min-height: 100vh;
	}

	#wrapper {
		max-width: 1250px;
		margin: 0 auto;
	}

	main {
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding-bottom: 32px;
	}
</style>

<script>
	import Header from "./Header.svelte";
	import "./app.css";
	import "./styles.css";
	import Footer from "../lib/components/Footer.svelte";
</script>
