// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    // Mobile menu toggle
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar-link');
        
        link.addEventListener('click', function(e) {
            // On mobile, prevent default and toggle dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = navbar.contains(event.target);
            
            if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        }
    });

    // Sticky navbar with scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            
            // Remove active class from dropdown items
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Close mobile menu if open
                    if (navbarMenu.classList.contains('active')) {
                        navbarToggle.classList.remove('active');
                        navbarMenu.classList.remove('active');
                    }
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
