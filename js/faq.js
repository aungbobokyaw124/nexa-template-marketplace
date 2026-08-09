/**
 * neXa Template Marketplace - FAQ Accordion System
 * Handles expandable FAQ items with smooth animations
 */

class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.generateFAQs();
        this.setupEventListeners();
    }

    /**
     * Generate FAQ items
     */
    generateFAQs() {
        const faqList = document.getElementById('faqList');
        
        // Clear existing FAQ items
        faqList.innerHTML = '';

        // FAQ data - can be expanded or loaded from API
        const faqs = [
            {
                question: 'What files are included with each template?',
                answer: 'Each template includes all HTML, CSS, and JavaScript source files, along with documentation and any required assets like images and fonts. You get the complete, unminified source code ready for customization.'
            },
            {
                question: 'Can I customize the templates for my projects?',
                answer: 'Absolutely! All neXa templates are built with clean, well-commented code specifically designed for easy customization. You can modify colors, layouts, content, and functionality to match your brand and requirements.'
            },
            {
                question: 'Do the templates work on mobile devices?',
                answer: 'Yes, every neXa template is fully responsive and tested across all modern devices and browsers. Templates are built mobile-first, ensuring they look and perform perfectly on phones, tablets, and desktops.'
            },
            {
                question: 'Do I get updates after purchasing a template?',
                answer: 'Yes, all template purchases include lifetime updates. When we improve a template or add new features, you will receive free updates to ensure your project stays current with modern web standards.'
            },
            {
                question: 'What technologies are used in neXa templates?',
                answer: 'Our templates are built with modern HTML5, CSS3, and vanilla JavaScript - no heavy frameworks required. This ensures maximum performance, easy customization, and compatibility with any hosting environment.'
            },
            {
                question: 'Is there technical support available?',
                answer: 'Yes, we provide comprehensive documentation with every template. Professional and Premium plan subscribers also receive priority email support from our development team to help with any questions or customization needs.'
            }
        ];

        // Generate FAQ items
        faqs.forEach((faq, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.setAttribute('data-faq-index', index);
            
            faqItem.innerHTML = `
                <button class="faq-question" aria-expanded="false">
                    <span>${faq.question}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-content">
                        ${faq.answer}
                    </div>
                </div>
            `;
            
            faqList.appendChild(faqItem);
        });
    }

    /**
     * Setup event listeners for FAQ interactions
     */
    setupEventListeners() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all FAQ items
                this.closeAllFAQs();

                // If the clicked FAQ wasn't active, open it
                if (!isActive) {
                    this.openFAQ(faqItem);
                }
            });
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllFAQs();
            }
        });

        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.generateFAQs();
            this.setupEventListeners();
        });
    }

    /**
     * Open a specific FAQ item
     */
    openFAQ(faqItem) {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        // Set active state
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        
        // Set max-height for smooth animation
        answer.style.maxHeight = answer.scrollHeight + 'px';
        
        // Scroll to FAQ if not fully visible
        setTimeout(() => {
            const rect = faqItem.getBoundingClientRect();
            if (rect.bottom > window.innerHeight) {
                faqItem.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 300);
    }

    /**
     * Close a specific FAQ item
     */
    closeFAQ(faqItem) {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        // Remove active state
        faqItem.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        
        // Reset max-height
        answer.style.maxHeight = '0';
    }

    /**
     * Close all FAQ items
     */
    closeAllFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => this.closeFAQ(item));
    }

    /**
     * Toggle a specific FAQ item
     */
    toggleFAQ(index) {
        const faqItem = document.querySelector(`[data-faq-index="${index}"]`);
        if (faqItem) {
            if (faqItem.classList.contains('active')) {
                this.closeFAQ(faqItem);
            } else {
                this.closeAllFAQs();
                this.openFAQ(faqItem);
            }
        }
    }

    /**
     * Open FAQ by index
     */
    openFAQByIndex(index) {
        const faqItem = document.querySelector(`[data-faq-index="${index}"]`);
        if (faqItem) {
            this.closeAllFAQs();
            this.openFAQ(faqItem);
        }
    }
}

// Initialize FAQ manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.faqManager = new FAQManager();
});
