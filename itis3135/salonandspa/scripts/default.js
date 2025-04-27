// Main initialization function
function initializeAll() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        document.body.appendChild(mobileMenuOverlay);
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });

        console.log('Mobile menu initialized successfully');
    } else {
        console.warn('Mobile menu elements not found');
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonials-slider .testimonial');
    const dots = document.querySelectorAll('.slider-controls .dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentTestimonial = 0;
        let testimonialInterval;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }

        function startSlider() {
            testimonialInterval = setInterval(() => {
                let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(nextTestimonial);
            }, 5000);
        }

        showTestimonial(0);
        startSlider();

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(testimonialInterval);
                showTestimonial(index);
                startSlider();
            });
        });

        const sliderContainer = document.querySelector('.testimonials-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });

            sliderContainer.addEventListener('mouseleave', startSlider);
        }
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// Handle initialization based on whether HTMLInclude is used
if (typeof HTMLInclude !== 'undefined') {
    // Wait for HTMLInclude to complete
    HTMLInclude.addEventListener('complete', function() {
        // Small delay to ensure all elements are in the DOM
        setTimeout(initializeAll, 50);
    });
} else {
    // Standard DOMContentLoaded if no HTMLInclude
    document.addEventListener('DOMContentLoaded', initializeAll);
}