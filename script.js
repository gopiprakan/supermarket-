document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const backToTopBtn = document.getElementById('back-to-top');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');

    let cartTotal = 0;

    // Toggle Sidebar
    const openSidebar = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartTotal++;
            cartCount.textContent = cartTotal;
            
            // Animation effect
            this.textContent = 'Added!';
            this.style.backgroundColor = '#f7ca00';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 1000);
        });
    });

    // --- Login Modal Logic ---
    const loginBtn = document.getElementById('login-btn');
    const sidebarLoginBtn = document.getElementById('sidebar-login-btn');
    const loginModal = document.getElementById('login-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const loginForm = document.getElementById('login-form');

    const openModal = () => {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        loginModal.classList.remove('active');
        if (!sidebar.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    };

    if (loginBtn) loginBtn.addEventListener('click', openModal);
    if (sidebarLoginBtn) {
        sidebarLoginBtn.addEventListener('click', () => {
            closeSidebar();
            setTimeout(openModal, 300);
        });
    }
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeModal();
        }
    });

    // Handle form submit without error
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            alert('Login successful! Welcome to FreshCart.');
            closeModal();
            loginForm.reset();
        });
    }

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));
});
