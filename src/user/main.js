// Main.js - Sidebar and UI functionality
function initializeSidebar() {
    console.log('Initializing sidebar...'); // Debug log
    
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarClose = document.getElementById('sidebar-close');

    console.log('Elements found:', {
        hamburgerBtn: !!hamburgerBtn,
        sidebar: !!sidebar,
        overlay: !!overlay,
        sidebarClose: !!sidebarClose
    }); // Debug log

    function openSidebar() {
        console.log('Opening sidebar'); // Debug log
        if (sidebar && overlay) {
            // Use inline styles instead of Tailwind classes
            sidebar.style.left = '0px';
            overlay.style.display = 'block';
            
            // Also push content if main-wrapper exists
            const mainWrapper = document.getElementById('main-wrapper');
            if (mainWrapper) {
                mainWrapper.style.marginLeft = '280px';
            }
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            console.log('✅ Sidebar opened with inline styles');
        } else {
            console.error('❌ Sidebar or overlay not found');
        }
    }

    function closeSidebar() {
        console.log('Closing sidebar'); // Debug log
        if (sidebar && overlay) {
            // Use inline styles instead of Tailwind classes
            sidebar.style.left = '-280px';
            overlay.style.display = 'none';
            
            // Also restore content position
            const mainWrapper = document.getElementById('main-wrapper');
            if (mainWrapper) {
                mainWrapper.style.marginLeft = '0px';
            }
            
            document.body.style.overflow = ''; // Restore scrolling
            console.log('✅ Sidebar closed with inline styles');
        } else {
            console.error('❌ Sidebar or overlay not found');
        }
    }

    // Add event listeners with error handling
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Hamburger clicked');
            openSidebar();
        });
        console.log('✅ Hamburger event listener attached');
    } else {
        console.error('❌ Hamburger button not found');
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Close button clicked');
            closeSidebar();
        });
        console.log('✅ Sidebar close event listener attached');
    } else {
        console.error('❌ Sidebar close button not found');
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Overlay clicked');
            closeSidebar();
        });
        console.log('✅ Overlay event listener attached');
    } else {
        console.error('❌ Overlay not found');
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && !sidebar.classList.contains('-translate-x-full')) {
            closeSidebar();
        }
    });
}

function initializeAvatars() {
    console.log('🔍 Initializing avatars...');
    
    // Handle header avatar
    const headerAvatar = document.querySelector('#avatar-btn');
    const headerImg = document.querySelector('#header-avatar-img');
    const headerFallback = document.querySelector('#avatar-fallback');
    
    console.log('🔍 Avatar elements found:', {
        headerAvatar: !!headerAvatar,
        headerImg: !!headerImg, 
        headerFallback: !!headerFallback
    });
    
    if (!headerAvatar) {
        console.error('❌ Header avatar container not found!');
        return;
    }
    
    if (!headerFallback) {
        console.error('❌ Header avatar fallback not found!');
        return;
    }
    
    if (headerImg && headerFallback) {
        headerImg.onload = function() {
            console.log('✅ Header avatar loaded successfully');
            this.style.display = 'block';
            headerFallback.style.display = 'none';
        };
        
        headerImg.onerror = function() {
            console.log('❌ Header avatar failed to load');
            this.style.display = 'none';
            headerFallback.style.display = 'block';
        };
        
        // Try to load the image
        headerImg.src = headerImg.src;
    } else {
        console.log('🔍 Using fallback only');
        headerFallback.style.display = 'block';
    }
}

function initializeGameCards() {
    // Game card click handlers
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('click', function () {
            const gameName = this.querySelector('h3')?.textContent || 'Unknown';
            console.log(`Loading ${gameName} tournaments...`);
        });
    });

    // Game universe cards hover effects
    document.querySelectorAll('#game-grid > div').forEach(card => {
        card.addEventListener('click', function () {
            const gameName = this.querySelector('.text-xs')?.textContent || 'Unknown';
            console.log(`Selected game: ${gameName}`);
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeSidebar();
        initializeAvatars();
        initializeGameCards();
        
        // Initialize header components with delay to ensure components are loaded
        setTimeout(() => {
            if (window.initializeSearch) {
                window.initializeSearch();
                console.log('✅ Search component initialized');
            }
            if (window.initializeNotifications) {
                window.initializeNotifications();
                console.log('✅ Notifications component initialized');
            }
        }, 500);
    });
} else {
    // DOM already loaded
    initializeSidebar();
    initializeAvatars();
    initializeGameCards();
    
    // Initialize header components with delay
    setTimeout(() => {
        if (window.initializeSearch) {
            window.initializeSearch();
            console.log('✅ Search component initialized');
        }
        if (window.initializeNotifications) {
            window.initializeNotifications();
            console.log('✅ Notifications component initialized');
        }
    }, 500);
}

// Make functions globally available for debugging
window.initializeSidebar = initializeSidebar;
window.initializeAvatars = initializeAvatars;
window.initializeGameCards = initializeGameCards;
