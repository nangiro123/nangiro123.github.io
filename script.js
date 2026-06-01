// Custom JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Add animation to sections on page load
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // 2. Profile image container hover effect
    const profileImg = document.querySelector('img[alt="Nangiro Apollo"]');
    if (profileImg && profileImg.parentElement) {
        profileImg.parentElement.classList.add('profile-image-container');
    }

    // 3. Add smooth scroll behavior to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Interactive skill tags
    const skillTags = document.querySelectorAll('span.bg-indigo-50');
    skillTags.forEach(tag => {
        tag.classList.add('skill-tag');
        tag.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-600', 'text-white');
            this.classList.toggle('bg-indigo-50', 'text-indigo-700');
        });
    });

    // 5. Scroll to top button functionality
    createScrollToTopButton();

    // 6. Add active section indicator on scroll
    observeSectionsOnScroll();

    // 7. Print functionality
    addPrintButton();

    // 8. Contact information copy to clipboard
    setupClipboardCopy();
});

// Scroll to top button
function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.id = 'scrollToTop';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.6)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.4)';
    });
}

// Observe sections on scroll
function observeSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add print button
function addPrintButton() {
    const footer = document.querySelector('footer');
    if (footer) {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Resume';
        printBtn.className = 'btn-primary';
        printBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
            transition: all 0.3s ease;
        `;

        printBtn.addEventListener('click', function() {
            window.print();
        });

        printBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.6)';
        });

        printBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.4)';
        });

        document.body.insertBefore(printBtn, document.body.firstChild);
    }
}

// Setup clipboard copy for contact info
function setupClipboardCopy() {
    const contactElements = document.querySelectorAll('[data-copy]');
    contactElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
}

// Utility function: Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Utility function: Add dark mode toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}

// Log page load time
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});
