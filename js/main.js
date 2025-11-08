// ===================================
// Smooth Scroll for Internal Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Scroll Animations - Intersection Observer
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const observeElements = () => {
    const elementsToObserve = [
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.skill-category'),
        document.querySelector('.about-content'),
        document.querySelector('.section-subtitle')
    ].filter(el => el !== null);
    
    elementsToObserve.forEach(el => {
        fadeInObserver.observe(el);
    });
};

// Initialize observers when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ===================================
// Project Cards Stagger Animation
// ===================================
const staggerProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
};

// Call on load
window.addEventListener('load', staggerProjectCards);

// ===================================
// Skill Tags Hover Effect Enhancement
// ===================================
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ===================================
// Add Active State to Buttons on Click
// ===================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===================================
// Performance: Reduce Motion for Users Who Prefer It
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ===================================
// Console Easter Egg
// ===================================
console.log(
    '%c👋 Hi there! ',
    'font-size: 20px; font-weight: bold; color: #3B82F6;'
);
console.log(
    '%cInterested in how this was built? Check out the code on GitHub!',
    'font-size: 14px; color: #6B7280;'
);
console.log(
    '%c🚀 Built with vanilla HTML, CSS, and JavaScript',
    'font-size: 12px; color: #9CA3AF;'
);

// ===================================
// Lazy Load Images (if needed in future)
// ===================================
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyLoadImages();
}

// ===================================
// Add Scroll Progress Indicator (Optional)
// ===================================
const addScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3B82F6, #8B5CF6);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Uncomment to enable scroll progress indicator
// addScrollProgress();

// ===================================
// Analytics Event Tracking (Placeholder)
// ===================================
const trackEvent = (category, action, label) => {
    // Placeholder for analytics tracking
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
};

// Track CV downloads
const cvLink = document.querySelector('a[download]');
if (cvLink) {
    cvLink.addEventListener('click', () => {
        trackEvent('Engagement', 'Download', 'CV');
    });
}

// Track project link clicks
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const projectName = e.target.closest('.project-card').querySelector('.project-title').textContent;
        trackEvent('Engagement', 'Project Click', projectName);
    });
});

// Track social link clicks
const socialLinks = document.querySelectorAll('.footer-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = e.currentTarget.getAttribute('aria-label') || 'Social';
        trackEvent('Engagement', 'Social Click', platform);
    });
});

// ===================================
// Keyboard Navigation Enhancement
// ===================================
document.addEventListener('keydown', (e) => {
    // Add keyboard shortcuts if needed
    // Example: Press 'H' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===================================
// Print Styles Enhancement
// ===================================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});
