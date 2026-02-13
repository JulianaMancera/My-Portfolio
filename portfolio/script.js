// ===== PARTICLE BACKGROUND =====
const bgAnimation = document.getElementById('bgAnimation');
// Reduced from 80 to 30 particles for better performance
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    bgAnimation.appendChild(particle);
}

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .achievement-card');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2500);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVIGATION ACTIVE STATE =====
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });

    // Nav scroll effect
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>SENDING...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.innerHTML = '<span>MESSAGE SENT! ✓</span>';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }, 1500);
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

document.querySelectorAll('.skill-card, .project-card, .achievement-card, .certification-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// ===== PARALLAX EFFECT =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / 800);
            }
            
            // Parallax for section numbers
            const sectionNumbers = document.querySelectorAll('.section-number');
            sectionNumbers.forEach(number => {
                const rect = number.getBoundingClientRect();
                const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
                if (scrollProgress > 0 && scrollProgress < 1) {
                    number.style.transform = `translateY(${scrollProgress * 50}px)`;
                }
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== SKILL CARD REVEAL ANIMATION =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.setProperty('--index', index);
});

// ===== PROJECT CARD TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== TYPING EFFECT FOR HERO =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = text;
    element.textContent = '';
    
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== SCROLL TO TOP ON PAGE LOAD =====
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ===== PREVENT SCROLL DURING LOADING =====
document.body.style.overflow = 'hidden';

// ===== GLITCH EFFECT ON HOVER =====
const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch-skew 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitch-skew 1s infinite';
    });
});

// ===== DEBOUNCE FUNCTION =====
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

// ===== PERFORMANCE OPTIMIZATION =====
const debouncedScroll = debounce(() => {
    // Additional scroll logic here if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== FADE IN ON LOAD =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== DYNAMIC YEAR FOR FOOTER =====
const currentYear = new Date().getFullYear();
const footerCopyright = document.querySelector('.footer-copyright');
if (footerCopyright) {
    footerCopyright.textContent = `© ${currentYear} Juliana R. Mancera. All rights reserved.`;
}

// ===== SKILL LEVEL ANIMATION =====
const skillLevels = document.querySelectorAll('.skill-level');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

skillLevels.forEach(level => {
    skillObserver.observe(level);
});

// ===== FORM VALIDATION =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#FF006E';
        } else {
            input.style.borderColor = 'var(--border)';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary)';
    });
});

// ===== ACHIEVEMENT CARD COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetText = element.textContent;
            const hasPlus = targetText.includes('+');
            const target = parseInt(targetText.replace(/\D/g, ''));
            
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + (hasPlus ? '+' : '');
                        clearInterval(counter);
                    } else {
                        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    }
                }, stepTime);
            }
            
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== MOBILE MENU TOGGLE (If needed in future) =====
// Uncomment and customize if you want to add a mobile hamburger menu
/*
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}
*/

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Portfolio by Juliana R. Mancera', 'font-size: 20px; font-weight: bold; color: #00F5FF;');
console.log('%cBuilding the future, one line of code at a time.', 'font-size: 14px; color: #8B8B8B;');

// ===== EASTER EGG: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 3s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'font-size: 30px; font-weight: bold; color: #FF006E;');
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);