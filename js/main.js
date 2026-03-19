// main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Load Header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                initializeNavigation();
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                initializeFooter();
            }
        })
        .catch(error => console.error('Error loading footer:', error));


    function initializeNavigation() {
        // Mobile Navigation Toggle
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileNavToggle && navMenu) {
            mobileNavToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Toggle icon between bars and close
                const icon = mobileNavToggle.querySelector('i');
                if(navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Active Link State based on Current Page URL
        const navLinks = document.querySelectorAll('.nav-link');
        const windowPathname = window.location.pathname;
        
        // Helper to normalize paths for comparison
        const normalizePath = (path) => {
            // Remove trailing slashes and common extensions for comparison
            let normalized = path.replace(/\/$/, '').replace('.html', '');
            // If path is empty, it refers to the root/index
            return normalized || '/index';
        };

        const currentNormalizedPath = normalizePath(windowPathname);

        navLinks.forEach(link => {
            const linkPathname = new URL(link.href, window.location.href).pathname;
            const linkNormalizedPath = normalizePath(linkPathname);
            
            if (currentNormalizedPath === linkNormalizedPath || 
               (currentNormalizedPath === '/index' && linkNormalizedPath === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function initializeFooter() {
        // Set current year in footer
        const yearSpan = document.getElementById('current-year');
        if(yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
});
