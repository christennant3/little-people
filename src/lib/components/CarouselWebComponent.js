class ImageCarousel extends HTMLElement {
    constructor() {
      
        super();
        this.currentSlide = 0;
        this.autoAdvanceInterval = null;

        // Get images from attributes or use defaults
        const imageUrls = this.getAttribute('images') || '';
        const imageAlts = this.getAttribute('alts') || '';

        if (imageUrls) {
            const urls = imageUrls.split(',');
            const alts = imageAlts.split(',');
            this.images = urls.map((url, index) => ({
                src: url.trim(),
                alt: (alts[index] || `Image ${index + 1}`).trim()
            }));
        } else {
            // Fallback images - replace with your actual image paths
            this.images = [
                { src: '/src/lib/images/about/kate.jpg', alt: 'Child with owl' },
                { src: '/src/lib/images/gallery/trunk.jpg', alt: 'Child with owl' },
                { src: '/src/lib/images/gallery/owl.jpg', alt: 'Corn' }
            ];
        }
    }

    connectedCallback() {
        this.preloadImages().then(() => {
            this.render();
            this.attachEventListeners();
            this.startAutoAdvance();
        });
    }

    async preloadImages() {
        const loadPromises = this.images.map(img => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(true);
                image.onerror = () => {
                    console.error(`Failed to load image: ${img.src}`);
                    reject();
                };
                image.src = img.src;
            });
        });

        try {
            await Promise.all(loadPromises);
        } catch (error) {
            console.error('Error preloading images:', error);
        }
    }

    render() {
        this.innerHTML = `
        <style>
          .carousel {
            width: 100%;
            max-width: 800px;
            margin: 2rem auto;
            position: relative;
          }
          
          .carousel-buttons {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 1rem;
            pointer-events: none;
            z-index: 10;          
          }
          
          .carousel-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s;
            backdrop-filter: blur(4px);
            pointer-events: auto;
          }
          
          .carousel-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
          }
          
          .carousel-btn:active {
            transform: scale(0.95);
          }
          
          .btn-icon {
            width: 1.5rem;
            height: 1.5rem;
            stroke: white;
            stroke-width: 2;
          }
          
          .image-container {
            position: relative;
            aspect-ratio: 16/9;
            overflow: hidden;
            border-radius: 0.5rem;
            background: #f3f4f6;
          }
          
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 0.5s ease;
          }
          
          .slide-counter {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            backdrop-filter: blur(4px);
          }

          .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .loading::after {
            content: '';
            width: 2rem;
            height: 2rem;
            border: 2px solid #f3f4f6;
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            display: block;
          }
        </style>
        
        <div class="carousel">
          <div class="image-container">
            <img 
              class="carousel-image" 
              id="carousel-image" 
              src="${this.images[0].src}" 
              alt="${this.images[0].alt}"
              style="opacity: 0"
            >
            <div class="slide-counter">
              <span id="current-slide">1</span> / ${this.images.length}
            </div>
          </div>
          
          <div class="carousel-buttons">
            <button class="carousel-btn" id="prev-btn" aria-label="Previous image">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="carousel-btn" id="next-btn" aria-label="Next image">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <h1>Image Carousel --- !!!!!</h1>
        </div>
      `;

      // Show initial image with fade
      setTimeout(() => {
          const image = this.querySelector('#carousel-image');
          if (image) /** @type {HTMLImageElement} */ (image).style.opacity = '1';
      }, 100);
    }

    attachEventListeners() {
        const prevBtn = this.querySelector('#prev-btn');
        const nextBtn = this.querySelector('#next-btn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Add keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    updateImage() {
        const image = this.querySelector('#carousel-image');
        const counter = this.querySelector('#current-slide');

        if (image) {
            /** @type {HTMLImageElement} */ (image).style.opacity = '0';

            requestAnimationFrame(() => {
                setTimeout(() => {
                    /** @type {HTMLImageElement} */ (image).src = this.images[this.currentSlide].src;
                    /** @type {HTMLImageElement} */ (image).alt = this.images[this.currentSlide].alt;
                    if (counter) counter.textContent = String(this.currentSlide + 1);

                    requestAnimationFrame(() => {
                        /** @type {HTMLImageElement} */ (image).style.opacity = '1';
                    });
                }, 300);
            });
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.updateImage();
        this.resetAutoAdvance();
    }

    previousSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.images.length - 1 : this.currentSlide - 1;
        this.updateImage();
        this.resetAutoAdvance();
    }

    startAutoAdvance() {
        this.autoAdvanceInterval = setInterval(() => {
            this.nextSlide();
        }, 7000);
    }

    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
        }
    }

    resetAutoAdvance() {
        this.stopAutoAdvance();
        this.startAutoAdvance();
    }

    disconnectedCallback() {
        this.stopAutoAdvance();
        // Remove keyboard event listener
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Handles keyboard navigation for the carousel.
     * @param {KeyboardEvent} e
     */
    handleKeyDown(e) {
        if (e.key === 'ArrowLeft') this.previousSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
    }
}

// Register the component
customElements.define('image-carousel', ImageCarousel);