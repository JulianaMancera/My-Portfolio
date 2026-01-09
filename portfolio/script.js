const bgAnimation = document.getElementById('bgAnimation');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    bgAnimation.appendChild(particle);
}

// cursor effect
const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('a, button, input, textarea');

// Move cursor with mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect on interactive elements
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// si loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// scroll scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

//nav active state on scroll
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update active navigation item
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
});

// call 911
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Demo alert 
    alert('Message sent! (wala pang BE)');
    
    // Reset form
    e.target.reset();
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.skill-card, .project-card, .contact-item, .achievement-card').forEach(el => {
    observer.observe(el);
});


function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.parentElement.querySelector('.stat-label').textContent.includes('Satisfaction') ? '%' : '+');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + (element.parentElement.querySelector('.stat-label').textContent.includes('Satisfaction') ? '%' : '+');
        }
    }, 16);
}

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// ========================================
// PARALLAX EFFECT ON SCROLL (Optional)
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// ADD TYPING EFFECT TO HERO TEXT (Optional)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-content h1');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 100);
// });

// ========================================
// DYNAMIC YEAR FOR COPYRIGHT (Optional)
// ========================================
// Add this to your footer if you have one
// document.getElementById('year').textContent = new Date().getFullYear();

// ========================================
// THEME TOGGLE (Optional - Dark/Light Mode)
// ========================================
// Uncomment if you want to add a theme toggle button
// const themeToggle = document.getElementById('themeToggle');
// if (themeToggle) {
//     themeToggle.addEventListener('click', () => {
//         document.body.classList.toggle('light-theme');
//     });
// }

// ========================================
// PREVENT SCROLL JANK ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Remove any initial scroll position
    window.scrollTo(0, 0);
});

// ========================================
// MOBILE MENU TOGGLE (If needed)
// ========================================
// Uncomment if you add a mobile hamburger menu
// const mobileMenuBtn = document.getElementById('mobileMenuBtn');
// const nav = document.querySelector('.nav');
// 
// if (mobileMenuBtn) {
//     mobileMenuBtn.addEventListener('click', () => {
//         nav.classList.toggle('active');
//     });
// }

// ========================================
// ADD SMOOTH FADE-IN ON PAGE LOAD
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// PERFORMANCE OPTIMIZATION
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
const debouncedScroll = debounce(() => {
    // Your scroll logic here if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);