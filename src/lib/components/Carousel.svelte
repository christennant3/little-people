<script lang="ts">
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

  // Add type declaration for window.Glider
  declare global {
    interface Window {
      Glider: any;
    }
  }

  let gliderElement: HTMLElement;
  let glider: any;
  let isPlaying = true;
  let autoplayInterval: ReturnType<typeof setInterval>;
  let isLoading = true;
  let currentSlide = 0;

  const togglePlay = () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startAutoplay();
    } else {
      clearInterval(autoplayInterval);
    }
  };

  const startAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (glider && isPlaying) {
        const nextIndex = (currentSlide + 1) % gallery_items.length;
        glider.scrollItem(nextIndex);
      }
    }, 5000);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!glider) return;
    
    if (event.key === "ArrowLeft") {
      const prevIndex = currentSlide === 0 ? gallery_items.length - 1 : currentSlide - 1;
      glider.scrollItem(prevIndex);
    }
    if (event.key === "ArrowRight") {
      const nextIndex = (currentSlide + 1) % gallery_items.length;
      glider.scrollItem(nextIndex);
    }
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
      setTimeout(() => {
        isLoading = false;
      }, 5000);
    }
  };

  const initGlider = async () => {
    if (!browser || !gliderElement) return;

    // Load Glider.js script dynamically
    if (typeof window.Glider === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    
    glider = new window.Glider(gliderElement, {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dragVelocity: 1.3,
      dots: '.glider-dots',
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dragVelocity: 1
          }
        }
      ]
    });

    // Listen for slide changes
    gliderElement.addEventListener('glider-slide-visible', (event: any) => {
      currentSlide = event.detail.slide;
    });

    if (isPlaying) {
      startAutoplay();
    }
  };

  onMount(async () => {
    if (browser) {
      // Load Glider.js CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css';
      document.head.appendChild(link);

      window.addEventListener("keydown", handleKeydown);
      await preloadImages();
      await initGlider();
    }
  });

  onDestroy(() => {
    if (browser) {
      if (autoplayInterval) clearInterval(autoplayInterval);
      window.removeEventListener("keydown", handleKeydown);
      if (glider && glider.destroy) {
        glider.destroy();
      }
    }
  });

  const goToPrev = () => {
    if (glider) {
      const prevIndex = currentSlide === 0 ? gallery_items.length - 1 : currentSlide - 1;
      glider.scrollItem(prevIndex);
    }
  };

  const goToNext = () => {
    if (glider) {
      const nextIndex = (currentSlide + 1) % gallery_items.length;
      glider.scrollItem(nextIndex);
    }
  };
</script>

<div class="carousel-container">
  {#if isLoading}
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading images...</p>
    </div>
  {:else}
    <div class="glider-contain">
      <div class="glider" bind:this={gliderElement}>
        {#each gallery_items as item}
          <div class="glider-slide">
            <img
              src={item.url}
              alt={item.description}
              class="carousel-image"
              on:error={() => console.error(`Failed to display image: ${item.url}`)}
            />
          </div>
        {/each}
      </div>

      <button 
        class="glider-prev nav-button" 
        aria-label="Previous image"
        on:click={goToPrev}
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
        class="glider-next nav-button" 
        aria-label="Next image"
        on:click={goToNext}
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

      <!-- Dots positioned below the carousel -->
      <div class="glider-dots"></div>
    </div>

    <!-- Play button positioned at bottom of screen -->
    <div class="carousel-controls">
      <div class="control-buttons">
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
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .carousel-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .glider-contain {
    position: relative;
    width: 100%;
  }

  .glider-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 600px;
  }

  .carousel-image {
    max-width: 100%;
    max-height: 600px;
    height: auto;
    display: block;
    object-fit: contain;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    z-index: 5;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      background: rgba(0, 0, 0, 0.9);
      border-color: white;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    &.glider-prev {
      left: 1rem;
    }

    &.glider-next {
      right: 1rem;
    }
  }

  .nav-icon {
    width: 1.5rem;
    height: 1.5rem;
    stroke: white;
    stroke-width: 2;
    fill: none;
  }

  .carousel-controls {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .control-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 2rem;
    width: fit-content;
  }

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

    .nav-icon {
      width: 1.2rem;
      height: 1.2rem;
    }
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

  // Custom Glider.js styles - dots positioned below carousel
  :global(.glider-dots) {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    position: relative;

    button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid rgba(0, 0, 0, 0.3);
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;

      &.active {
        background: #3498db;
        border-color: #3498db;
      }

      &:hover {
        border-color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  // Override default Glider.js styles
  :global(.glider::-webkit-scrollbar) {
    display: none;
  }

  :global(.glider) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>