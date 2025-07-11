<script lang="ts">
  import { slide } from "svelte/transition";
  import { sineInOut } from "svelte/easing";
  import { onMount, onDestroy } from "svelte";
  import kate from '$lib/images/about/kate.jpg';
  import trunk from '$lib/images/gallery/trunk.jpg';
  import pond from '$lib/images/gallery/owl.jpg';

  const gallery_items = [
    {
      url: kate,
      description: "Child with owl",
    },
    {
      url: trunk,
      description: "Child with owl",
    },
    {
      url: pond,
      description: "Corn",
    },
    {
      url: kate,
      description: "Child with owl",
    }
  ];

  let currentSlideItem = 0;
  let intervalId: number;

  // Use function declarations instead of arrow functions for better compatibility
  function nextImage() {
    currentSlideItem = (currentSlideItem + 1) % gallery_items.length;
    console.log('Next clicked, current slide:', currentSlideItem); // Replace debugger
  }

  function prevImage() {
    if (currentSlideItem !== 0) {
      currentSlideItem = currentSlideItem - 1;
    } else {
      currentSlideItem = gallery_items.length - 1;
    }
    console.log('Prev clicked, current slide:', currentSlideItem); // Replace debugger
  }

  // Handle button clicks explicitly
  function handleNextClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    nextImage();
  }

  function handlePrevClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    prevImage();
  }

  onMount(() => {
    // Ensure we're in the browser
    if (typeof window !== 'undefined') {
      // Preload images
      gallery_items.forEach((item) => {
        const img = new Image();
        img.src = item.url;
      });

      // Set up interval
      intervalId = setInterval(nextImage, 7000);
    }
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<div class="carousel-buttons grid grid-cols-2 gap-4">
  <button
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    on:click={handlePrevClick}
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
    <span> Previous</span>
  </button>

  <button
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    on:click={handleNextClick}
    type="button"
  >
    <span>Next</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  </button>
</div>

<div>
  {#each [gallery_items[currentSlideItem]] as item (currentSlideItem)}
    <img
      transition:slide={{ duration: 500, easing: sineInOut }}
      src={item.url}
      alt={item.description}
      class="mx-auto text-center"
    />
  {/each}
</div>

<div class="carousel-buttons grid grid-cols-2 gap-4">
  <button
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    on:click={handlePrevClick}
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
    <span> Previous</span>
  </button>

  <button
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    on:click={handleNextClick}
    type="button"
  >
    <span>Next</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  </button>
</div>

<style lang="scss">
  .carousel-buttons {
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 14px;
    margin-top: 12px;
  }
</style>