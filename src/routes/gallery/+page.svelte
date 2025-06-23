<script>
	import { onMount, onDestroy } from 'svelte';
	
	let currentIndex = 0;
	const images = [
		{ url: '/gallery-images/woods2.jpg', alt: 'Woods' },
		{ url: '/gallery-images/corn.jpg', alt: 'Corn' },
		{ url: '/gallery-images/sand.jpg', alt: 'Beach' },
		{ url: '/gallery-images/trunk.jpg', alt: 'Woods' },
		{ url: '/gallery-images/owl.jpg', alt: 'Owl' }
	];

	let interval;

	function nextSlide() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prevSlide() {
		currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
	}

	function showSlide(index) {
		currentIndex = index;
		// Restart auto-advance when manually navigating
		startAutoAdvance();
	}

	function startAutoAdvance() {
		if (interval) clearInterval(interval);
		interval = setInterval(nextSlide, 5000);
	}

	function stopAutoAdvance() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}

	onMount(() => {
		startAutoAdvance();
	});

	onDestroy(() => {
		stopAutoAdvance();
	});
</script>

<style>
	.carousel {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 8px;
	}

	.carousel-container {
		position: relative;
		min-height: 300px;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 80px;
	}

	@media (min-width: 600px) {
		.carousel-container {
			min-height: 600px;
			margin-bottom: 20px;
		}
	}

	.carousel-slide {
		position: absolute;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 800px;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.carousel-slide.active {
		opacity: 1;
		pointer-events: all;
	}

	.carousel-slide img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 800px;
		object-fit: contain;
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.3);
		border: none;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(4px);
		transition: all 0.3s ease;
		color: white;
		font-size: 24px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		z-index: 10;
	}

	.carousel-btn:hover {
		background: rgba(0, 0, 0, 0.5);
		transform: translateY(-50%) scale(1.1);
		border-color: rgba(255, 255, 255, 0.8);
	}

	.carousel-btn:active {
		transform: translateY(-50%) scale(0.95);
	}

	.prev { left: 20px; }
	.next { right: 20px; }

	.dots {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 12px;
		padding: 8px 16px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		backdrop-filter: blur(4px);
	}

	.dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.dot:hover {
		background: rgba(255, 255, 255, 0.8);
		transform: scale(1.2);
	}

	.dot.active {
		background: white;
		transform: scale(1.2);
		border-color: rgba(255, 255, 255, 0.8);
	}
</style>

<svelte:head>
	<title>Little Peoples' Childminding Gallery</title>
	<meta name="Childminder Skelton Gallery" content="Gallery and images" />
</svelte:head>

<section id="content">
	<div class="grid grid-cols-1 md:grid-cols-1 gap-1 pt-5 px-2 md:px-6">
		<div class="text-center">
			<h1 class="hidden lg:block">Gallery</h1>
			<div class="carousel" 
				on:mouseenter={stopAutoAdvance} 
				on:mouseleave={startAutoAdvance}>
				<div class="carousel-container">
					{#each images as image, i}
						<div class="carousel-slide" class:active={currentIndex === i}>
							<img src={image.url} alt={image.alt}>
						</div>
					{/each}
				</div>

				<button class="carousel-btn prev" on:click={prevSlide} aria-label="Previous slide">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<button class="carousel-btn next" on:click={nextSlide} aria-label="Next slide">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>

				<div class="dots">
					{#each images as _, i}
						<button 
							class="dot" 
							class:active={currentIndex === i}
							on:click={() => showSlide(i)}
							aria-label="Go to slide {i + 1}"
							type="button"
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
