class SiteHeader extends HTMLElement {

    constructor() {
        super();
        this.currentIndex = 0;
        this.images = [
            { url: '/gallery-images/woods2.jpg', alt: 'Woods' },
            { url: '/gallery-images/corn.jpg', alt: 'Corn' },
            { url: '/gallery-images/sand.jpg', alt: 'Beach' },
            { url: '/gallery-images/trunk.jpg', alt: 'Woods' },
            { url: '/gallery-images/owl.jpg', alt: 'Owl' }
        ];
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .carousel {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto;
                    overflow: hidden;
                    border-radius: 8px;
                }

                .carousel-container {
                    position: relative;
                    aspect-ratio: 16/9;
                }

                .carousel-slide {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .carousel-slide.active {
                    opacity: 1;
                }

                .carousel-slide img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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

            <div class="carousel">
                <div class="carousel-container">
                    ${this.images.map((img, index) => `
                        <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                            <img src="${img.url}" alt="${img.alt}">
                        </div>
                    `).join('')}
                </div>

                <button class="carousel-btn prev" aria-label="Previous slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="carousel-btn next" aria-label="Next slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div class="dots">
                    ${this.images.map((_, index) => `
                        <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            </div>
        `;

        this.setupCarousel();
    }

    setupCarousel() {
        const slides = this.querySelectorAll('.carousel-slide');
        const dots = this.querySelectorAll('.dot');
        const prevBtn = this.querySelector('.prev');
        const nextBtn = this.querySelector('.next');

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            this.currentIndex = index;
        };

        const nextSlide = () => {
            const next = (this.currentIndex + 1) % slides.length;
            showSlide(next);
        };

        const prevSlide = () => {
            const prev = this.currentIndex === 0 ? slides.length - 1 : this.currentIndex - 1;
            showSlide(prev);
        };

        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto advance
        let interval = setInterval(nextSlide, 5000);
        
        this.addEventListener('mouseenter', () => clearInterval(interval));
        this.addEventListener('mouseleave', () => {
            interval = setInterval(nextSlide, 5000);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }
}

customElements.define('site-header', SiteHeader);