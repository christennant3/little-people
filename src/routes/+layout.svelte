<script>	
	import Header from "./Header.svelte";
	import "./app.css";
	import "./styles.css";
</script>

<div class="app">
	<div id="wrapper">
		<Header />

		<main>			
			<slot />
		</main>

		<footer>
			<p>
				Footer
			</p>
		</footer>
	</div>
</div>

<style>

	
	.app {
		min-height: 100vh;
	}

	#wrapper {
		max-width: 1000px;
		margin: 0 auto;
	}

	main {

		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
