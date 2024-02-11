<script>
	import { page } from "$app/stores";
	import logo from "$lib/images/svelte-logo.svg";
	import github from "$lib/images/github.svg";
</script>

<header class="bg-white">
	
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
				<a href="/">Home</a>
			</li>
			<li
				aria-current={$page.url.pathname === "/about"
					? "page"
					: undefined}
			>
				<a href="/about">About</a>
			</li>
			<li
				aria-current={$page.url.pathname === "/gallery"
					? "page"
					: undefined}
			>
				<a href="/gallery">Gallery</a>
			</li>
			<li
				aria-current={$page.url.pathname === "/policies"
					? "page"
					: undefined}
			>
				<a href="/policies">Policies</a>
			</li>

			<li
				aria-current={$page.url.pathname === "/fees"
					? "page"
					: undefined}
			>
				<a href="/fees">Fees</a>
			</li>

			<li
				aria-current={$page.url.pathname === "/contact"
					? "page"
					: undefined}
			>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
	<p class=" px-4 md:px-7 py-2 mb-0 text-xl">Little People's Childminding</p>
</header>

<style lang="scss">
	header {
	
		width: 100%;
	}

	nav {
		justify-content: center;
		--background: #336699;
		color: #ffffff;
		width: 100%;
		text-align: center;
		background-color: #336699;
		height: 61px;

		a:link {
			color: white;
		}

		a:visited {
			color: white;
		}

		ul {
			position: relative;
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			background: var(--background);
			
		}

		li {
			display: inline-block;
		}

		li a {
			display: block;
			color: white;
			text-align: center;
			padding: 16px;
			text-decoration: none;
		}

		li a:hover {
			background-color: var(--color-theme-1);
		}
	}
</style>
