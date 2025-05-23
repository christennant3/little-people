<script lang="ts">
  import { slide } from "svelte/transition";
  import { sineInOut } from "svelte/easing";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  const gallery_items = [
    {
      url: "/src/lib/images/woods.jpg",
      description: "Children in the pond",
    },
    {
      url: "/gallery-images/corn.jpg",
      description: "Corn",
    },
    {
      url: "/gallery-images/sand.jpg",
      description: "Beach",
    },
    {
      url: "/gallery-images/trunk.jpg",
      description: "Woods",
    },
    {
      url: "/gallery-images/owl.jpg",
      description: "Children with owl",
    },
    {
      url: "/gallery-images/woods2.jpg",
      description: "Exploring in the woods",
    },
  ];

  let currentSlideItem = 0;
  let isPlaying = true;
  let interval: ReturnType<typeof setInterval>;
  let isLoading = true;
  let loadTimeout: ReturnType<typeof setTimeout>;

  const nextImage = () => {
    currentSlideItem = (currentSlideItem + 1) % gallery_items.length;
  };

  const prevImage = () => {
    currentSlideItem =
      currentSlideItem === 0 ? gallery_items.length - 1 : currentSlideItem - 1;
  };

  const togglePlay = () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startAutoPlay();
    } else {
      clearInterval(interval);
    }
  };

  const startAutoPlay = () => {
    if (interval) clearInterval(interval);
    interval = setInterval(nextImage, 5000);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === " ") {
      event.preventDefault();
      togglePlay();
    }
  };

  const preloadImages = async () => {
    let loadedCount = 0;
    
    try {
      const loadPromises = gallery_items.map((item) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          
          const cleanup = () => {
            img.onload = null;
            img.onerror = null;
          };
          
          img.onload = () => {
            cleanup();
            loadedCount++;
            // Only hide loading when all images are loaded
            if (loadedCount === gallery_items.length) {
              isLoading = false;
            }
            resolve();
          };
          
          img.onerror = () => {
            cleanup();
            console.error(`Failed to load image: ${item.url}`);
            reject(new Error(`Failed to load image: ${item.url}`));
          };
          
          img.src = item.url;
        });
      });

      await Promise.allSettled(loadPromises);
    } catch (error) {
      console.error('Error preloading images:', error);
    } finally {
      // Set loading to false after maximum wait time
      setTimeout(() => {
        isLoading = false;
      }, 5000);
    }
  };

  onMount(async () => {
    if (browser) {
      window.addEventListener("keydown", handleKeydown);
      await preloadImages();
      
      if (isPlaying) {
        startAutoPlay();
      }
    }
  });

  onDestroy(() => {
    if (browser) {
      if (interval) clearInterval(interval);
      window.removeEventListener("keydown", handleKeydown);
    }
  });

  // Reactive statement to handle autoplay when isPlaying changes
  $: if (browser && !isLoading) {
    if (isPlaying) {
      startAutoPlay();
    } else {
      if (interval) clearInterval(interval);
    }
  }
</script>

{#key currentSlideItem}
<div class="carousel">
  <div class="image-container">
    {#if isLoading}
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Loading images...</p>
      </div>
    {:else}
      <img
        transition:slide={{ duration: 400, easing: sineInOut }}
        src={gallery_items[currentSlideItem].url}
        alt={gallery_items[currentSlideItem].description}
        class="carousel-image"
        on:error={() => console.error(`Failed to display image: ${gallery_items[currentSlideItem].url}`)}
      />
    {/if}
  </div>

  {#if !isLoading}
    <div class="carousel-controls">
      <div class="nav-buttons">
        <button
          class="nav-button prev"
          on:click={prevImage}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="nav-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <button
          class="play-button"
          on:click={togglePlay}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {#if isPlaying}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="nav-icon"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6" />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="nav-icon"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round" 
                stroke-linejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          {/if}
        </button>

        <button
          class="nav-button next"
          on:click={nextImage}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="nav-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  {/if}
</div>
{/key}

<style lang="scss">
  .carousel {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .carousel-controls {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    pointer-events: none;
  }

  .nav-buttons {
    pointer-events: auto;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 2rem;
    width: fit-content;
    margin: 0 auto;
  }

  .nav-button,
  .play-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .nav-icon {
    width: 1.5rem;
    height: 1.5rem;
    stroke: white;
    stroke-width: 2;
    fill: none;
  }

  .play-button {
    .nav-icon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 600px;
    width: 100%;
  }

  .carousel-image {
    max-width: 100%;
    max-height: 600px;
    height: auto;
    display: block;
    margin: 0 auto;
    object-fit: contain;  // Ensure images maintain aspect ratio
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: #4b5563;
    
    p {
      margin: 0;
      font-size: 1.1rem;
    }
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
