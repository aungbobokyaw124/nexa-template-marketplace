/**
 * neXa Template Marketplace - Slider/Carousel System
 * Handles hero slider and featured templates carousel
 */

class TemplateSlider {
    constructor() {
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.setupHeroSlider();
        this.setupFeaturedCarousel();
    }

    /**
     * Hero Section Template Preview Slider
     */
    setupHeroSlider() {
        const sliderContainer = document.getElementById('heroSlider');
        
        const previewCards = [
            { title: 'SaaS Dashboard', category: 'Web App' },
            { title: 'Portfolio Pro', category: 'Creative' },
            { title: 'Ecommerce UI', category: 'Online Store' },
            { title: 'Landing Page', category: 'Marketing' }
        ];

        previewCards.forEach(card => {
            const cardHTML = `
                <div class="template-preview-card">
                    <div class="preview-image">${card.title} Preview</div>
                    <h3 class="preview-title">${card.title}</h3>
                    <p class="preview-category">${card.category}</p>
                </div>
            `;
            
            sliderContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Animate cards periodically
        setInterval(() => {
            const cards = sliderContainer.querySelectorAll('.template-preview-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(-15px)';
                    setTimeout(() => {
                        card.style.transform = 'translateY(0)';
                    }, 500);
                }, index * 200);
            });
        }, 4000);
    }

    /**
     * Featured Templates Carousel
     */
    setupFeaturedCarousel() {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');

        const templates = [
            {
                name: 'SaaS Landing Page',
                category: 'SaaS',
                price: 49,
                rating: 4.9,
                reviews: 234,
                image: 'SaaS Landing Preview'
            },
            {
                name: 'Portfolio Pro',
                category: 'Portfolio',
                price: 29,
                rating: 4.8,
                reviews: 189,
                image: 'Portfolio Design Preview'
            },
            {
                name: 'Business Website',
                category: 'Business',
                price: 39,
                rating: 4.7,
                reviews: 156,
                image: 'Business Layout Preview'
            },
            {
                name: 'AI Startup Template',
                category: 'SaaS',
                price: 59,
                rating: 4.9,
                reviews: 312,
                image: 'AI Startup Preview'
            },
            {
                name: 'Ecommerce Store',
                category: 'Ecommerce',
                price: 69,
                rating: 4.8,
                reviews: 267,
                image: 'Store Template Preview'
            },
            {
                name: 'Blog Magazine',
                category: 'Blog',
                price: 19,
                rating: 4.6,
                reviews: 143,
                image: 'Blog Layout Preview'
            }
        ];

        // Generate carousel items
        templates.forEach((template, index) => {
            const stars = '⭐'.repeat(Math.floor(template.rating));
            const cardHTML = `
                <div class="template-card" data-index="${index}">
                    <div class="template-image">${template.image}</div>
                    <h3 class="template-name">${template.name}</h3>
                    <p class="template-category">${template.category}</p>
                    <div class="template-footer">
                        <span class="template-price">$${template.price}</span>
                        <div class="template-rating">
                            ${stars}
                            <span>(${template.reviews})</span>
                        </div>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 12px;">Buy Now</button>
                </div>
            `;
            
            track.insertAdjacentHTML('beforeend', cardHTML);
            
            // Create dot
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Navigation
        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Auto-play
        this.startAutoPlay();

        // Pause on hover        track.addEventListener('mouseenter', () => this.stopAutoPlay());
        track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    /**
     * Navigate to specific slide
     */
    goToSlide(index) {
        const track = document.getElementById('carouselTrack');
        const cards = track.querySelectorAll('.template-card');
        const dots = document.querySelectorAll('.dot');
        
        if (index >= cards.length) index = 0;
        if (index < 0) index = cards.length - 1;
        
        this.currentSlide = index;
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // Match your CSS gap
        const scrollPosition = index * (cardWidth + gap);
        
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    /**
     * Previous slide
     */
    prevSlide() {
        const track = document.getElementById('carouselTrack');
        const cards = track.querySelectorAll('.template-card');
        this.goToSlide(this.currentSlide - 1);
    }

    /**
     * Next slide
     */
    nextSlide() {
        const track = document.getElementById('carouselTrack');
        const cards = track.querySelectorAll('.template-card');
        this.goToSlide(this.currentSlide + 1);
    }

    /**
     * Auto-play functionality
     */
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }

    /**
     * Stop auto-play
     */
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.templateSlider = new TemplateSlider();
});
