<script>
	import banner from '$lib/images/home/home-banner.jpg';
	import Side from "../lib/components/Side.svelte";
	import { onMount } from 'svelte';

	onMount(() => {
		const stars = document.querySelectorAll('.star-icon');
		setTimeout(() => {
			// @ts-ignore
			stars.forEach(star => star.style.animation = 'none');
		}, 6000);
	});
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
			src="{banner}"
			alt="girls playing in the woods"
			class="mx-auto"
		/>
	</div>

	<div id="main-content" class="grid grid-cols-1 md:grid-cols-7">
		<div class="col-span-1 md:col-span-2 text-center order-2 md:order-1 mx-auto">
		<Side />
		</div>
		<div class="col-span-1 md:col-span-5 order-1">
			<h1>Welcome to Little Peoples' Childminding</h1>

			<p>
				Welcome to our childminding setting in Skelton East Cleveland.
				My name is Kate. I believe in the importance of spending time
				outdoors and allowing children to explore and discover the
				natural world around them. Our setting is located in a beautiful
				and safe area, perfect for outdoor play and learning.
			</p>

			<p>
				I will provide a nurturing and stimulating environment for your
				child. We plan a variety of activities that encourage children
				to learn through play, including outdoor games, gardening, and
				nature walks.
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

			<div class="free-childcare-banner">
				<div class="banner-content">
					<svg class="star-icon" viewBox="0 0 24 24" width="24" height="24">
						<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
					</svg>
					<p>
						<a href="/fees" class="childcare-link">Free 30 hours of childcare</a> is available for eligible children.
					</p>
					<svg class="star-icon" viewBox="0 0 24 24" width="24" height="24">
						<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
					</svg>
				</div>
			</div>
			
			<h2>Ofsted</h2>
			<p>I am rated good.</p>
		</div>
	</div>
</section>

<style lang="scss">
	#image-section {
		img {
			max-width: 100%;
			
		}
	}

	.free-childcare-banner {
		margin: 2rem 0;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(153, 51, 102, 0.1) 0%, rgba(64, 117, 166, 0.15) 100%);
		border-radius: 12px;
		border: 3px solid var(--color-theme-2);
		box-shadow: 0 4px 12px -2px rgba(64, 117, 166, 0.25);
	}

	.banner-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		
		p {
			margin: 0;
			font-size: 1.35rem;
			font-weight: 600;
			color: var(--color-theme-1);
		}
	}

	.childcare-link {
		color: var(--color-theme-2);
		text-decoration: underline;
		transition: all 0.2s ease;
		font-weight: 700;

		&:hover {
			color: #669933;
			text-decoration: none;
		}
	}

	.star-icon {
		fill: var(--color-theme-2);
		animation: pulse 2s 3;  // Run 3 times (6 seconds total)
		width: 28px;
		height: 28px;
	}

	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.15); opacity: 0.8; }
		100% { transform: scale(1); }
	}
</style>
