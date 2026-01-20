/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

// for the glittery cursor (scoped to masthead only)
document.addEventListener('DOMContentLoaded', () => {
    const colors = [
        '#ff4d4d', '#f9cb28', '#4dff4d', '#4da6ff', '#ff4dff', '#ff9a4d',
        '#ff6b6b', '#6bff6b', '#6b6bff', '#ff6bff', '#6bffff', '#ffff6b'
    ];

    let lastTime = 0;
    const trailInterval = 50; // Lower number = more sparkles
    const sparkleCount = 2; // Number of sparkles created at once

    // Select the masthead element (background image area)
    const masthead = document.querySelector('.masthead');
    if (!masthead) return;

    // Ensure the masthead can contain absolutely-positioned sparkles
    masthead.style.position = masthead.style.position || 'relative';
    masthead.style.overflow = masthead.style.overflow || 'hidden';

    // Mousemove handler limited to the masthead region
    const onMove = (e) => {
        const now = Date.now();
        if (now - lastTime < trailInterval) return;
        lastTime = now;

        const rect = masthead.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        // Create multiple sparkles at slightly different positions
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                createSparkle(
                    localX + (Math.random() * 20 - 10),
                    localY + (Math.random() * 20 - 10)
                );
            }, i * 30);
        }
    };

    // Attach only to masthead so sparkles appear only over the image
    masthead.addEventListener('mousemove', onMove);

    // Stop any further activity when leaving the masthead
    masthead.addEventListener('mouseleave', () => {
        lastTime = 0;
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-trail';

        // Random properties
        const size = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 0.8 + 0.7;
        const blur = Math.random() * 5 + 5;

        // Position relative to masthead
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.background = color;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.boxShadow = `0 0 ${blur}px ${blur / 3}px ${color}`;

        // Append to masthead so sparkles are clipped to the image area
        masthead.appendChild(sparkle);

        // Remove after animation completes
        setTimeout(() => sparkle.remove(), duration * 1000);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".hover-swap").forEach(img => {
      img.addEventListener("mouseenter", () => {
        img.src = img.dataset.hover;
      });

      img.addEventListener("mouseleave", () => {
        img.src = img.dataset.default;
      });
    });
  
});

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('productOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDescription = document.getElementById('overlayDescription');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imgCounter = document.getElementById('imgCounter');

    let currentImages = [];
    let currentIndex = 0;

    function updateOverlayImage() {
        if (!overlayImage || !currentImages.length) return;
        overlayImage.src = currentImages[currentIndex];
        overlayImage.alt = (overlayTitle.textContent || '') + ' image ' + (currentIndex + 1);
        if (imgCounter) imgCounter.textContent = `${currentIndex + 1}/${currentImages.length}`;

        if (prevBtn && nextBtn) {
            if (currentImages.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                if (imgCounter) imgCounter.style.display = 'none';
            } else {
                prevBtn.style.display = '';
                nextBtn.style.display = '';
                if (imgCounter) imgCounter.style.display = '';
            }
        }
    }

    document.querySelectorAll('.product-image').forEach(img => {
        img.addEventListener('click', () => {
            const images = [];
            if (img.dataset.images) {
                images.push(...img.dataset.images.split(',').map(s => s.trim()));
            }
            if (img.dataset.image) images.push(img.dataset.image);
            if (img.dataset.hover && !images.includes(img.dataset.hover)) images.push(img.dataset.hover);
            if (!images.length && img.src) images.push(img.src);

            currentImages = images;
            currentIndex = 0;
            overlayTitle.textContent = img.dataset.name || '';
            overlayDescription.textContent = img.dataset.description || '';
            updateOverlayImage();
            overlay.classList.remove('hidden');
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateOverlayImage();
    });

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateOverlayImage();
    });

    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay || overlay.classList.contains('hidden')) return;
        if (e.key === 'Escape') {
            overlay.classList.add('hidden');
        } else if (e.key === 'ArrowLeft') {
            if (currentImages.length > 1) {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                updateOverlayImage();
            }
        } else if (e.key === 'ArrowRight') {
            if (currentImages.length > 1) {
                currentIndex = (currentIndex + 1) % currentImages.length;
                updateOverlayImage();
            }
        }
    });
});


