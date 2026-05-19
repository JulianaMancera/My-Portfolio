// PARTICLE BACKGROUND 
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

//  CUSTOM CURSOR 
const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .achievement-card');

// Direct cursor positioning for accuracy
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

//  LOADING SCREEN 
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2500);
});

//  SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// NAVIGATION ACTIVE STATE 
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

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>SENDING...</span>';
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            submitBtn.innerHTML = '<span>MESSAGE SENT! ✓</span>';
            form.reset();
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Server error');
        }
    } catch {
        submitBtn.innerHTML = '<span>FAILED. TRY AGAIN.</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #c1436d, #8338ec)';
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = [...entry.target.parentElement.children];
            const idx = siblings.indexOf(entry.target);
            const delay = idx * 0.08;
            entry.target.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
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

// PARALLAX EFFECT 
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

// SKILL CARD REVEAL ANIMATION 
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.setProperty('--index', index);
});

// PROJECT CARD TILT EFFECT 
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

// SCROLL TO TOP ON PAGE LOAD
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// PREVENT SCROLL DURING LOADING
document.body.style.overflow = 'hidden';

//  GLITCH EFFECT ON HOVER 
const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch-skew 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitch-skew 1s infinite';
    });
});

// DEBOUNCE FUNCTION
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

// PERFORMANCE OPTIMIZATION
const debouncedScroll = debounce(() => {
    // Additional scroll logic here if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);

// FADE IN ON LOAD 
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// DYNAMIC YEAR FOR FOOTER
const currentYear = new Date().getFullYear();
const footerCopyright = document.querySelector('.footer-copyright');
if (footerCopyright) {
    footerCopyright.textContent = `© ${currentYear} Juliana R. Mancera. All rights reserved.`;
}

// SKILL LEVEL ANIMATION
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

//FORM VALIDATION
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

// ACHIEVEMENT CARD COUNTER
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

// MOBILE MENU TOGGLE
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
});

navLinks.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// CONSOLE MESSAGE
console.log('%c🚀 Portfolio by Juliana R. Mancera', 'font-size: 20px; font-weight: bold; color: #00F5FF;');
console.log('%cBuilding the future, one line of code at a time.', 'font-size: 14px; color: #8B8B8B;');

// EASTER EGG: Konami Code
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

// ===== INTERACTIVE EFFECTS =====

// TEXT SCRAMBLE
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&';

function scrambleText(el, finalText, duration = 900) {
    const steps = 28;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
        const progress = step / steps;
        el.textContent = finalText
            .split('')
            .map((char, i) => {
                if (char === ' ') return ' ';
                if (i / finalText.length < progress) return char;
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join('');
        if (++step > steps) {
            el.textContent = finalText;
            clearInterval(timer);
        }
    }, stepTime);
}

const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.dataset.originalText || el.textContent.trim();
            el.dataset.originalText = text;
            scrambleText(el, text);
            scrambleObserver.unobserve(el);
        }
    });
}, { threshold: 0.8 });

document.querySelectorAll('.section-title').forEach(el => scrambleObserver.observe(el));

window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.title-line');
        if (heroTitle) scrambleText(heroTitle, heroTitle.textContent.trim(), 1400);
    }, 2700);
});

// SIDE PROGRESS DOTS
const progressDots = document.querySelectorAll('.progress-dot');

const sectionProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressDots.forEach(dot => {
                dot.classList.toggle('active', dot.dataset.target === entry.target.id);
            });
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.section').forEach(s => sectionProgressObserver.observe(s));

progressDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// CURSOR TRAIL
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 40) return;
    lastTrailTime = now;
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
});

// MAGNETIC BUTTONS
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        btn.style.transform = '';
    });
});

// MOUSE-REACTIVE BACKGROUND
const bgEl = document.querySelector('.bg-animation');
let bgTick = false;
document.addEventListener('mousemove', (e) => {
    if (!bgTick) {
        requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            bgEl.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(131, 56, 236, 0.13) 0%, transparent 60%)`;
            bgTick = false;
        });
        bgTick = true;
    }
});

// PROFILE IMAGE 3D PARALLAX
const profileWrapper = document.querySelector('.image-wrapper');
if (profileWrapper) {
    const aboutSection = document.getElementById('about');
    document.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const x = (e.clientX / window.innerWidth - 0.5) * 18;
            const y = (e.clientY / window.innerHeight - 0.5) * 18;
            profileWrapper.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
    profileWrapper.addEventListener('mouseleave', () => {
        profileWrapper.style.transition = 'transform 0.6s ease';
        profileWrapper.style.transform = '';
    });
    profileWrapper.addEventListener('mouseenter', () => {
        profileWrapper.style.transition = 'transform 0.1s ease';
    });
}