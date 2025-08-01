// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchPopular = document.getElementById('search-popular');
    const searchNoResults = document.getElementById('search-no-results');

    if (!searchInput || !searchDropdown) return;

    let isDropdownOpen = false;

    // Show dropdown on focus
    searchInput.addEventListener('focus', () => {
        showSearchDropdown();
    });

    // Handle search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 0) {
            performSearch(query);
        } else {
            showPopularSearches();
        }
    });

    // Handle search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
                console.log('Searching for:', query);
            }
        });
    }

    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
                hideSearchDropdown();
                console.log('Searching for:', query);
            }
        } else if (e.key === 'Escape') {
            hideSearchDropdown();
        }
    });

    // Handle popular search suggestions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('search-suggestion')) {
            const query = e.target.dataset.query;
            searchInput.value = query;
            performSearch(query);
            hideSearchDropdown();
            console.log('Selected suggestion:', query);
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-component')) {
            hideSearchDropdown();
        }
    });

    function showSearchDropdown() {
        searchDropdown.classList.remove('hidden');
        isDropdownOpen = true;
        showPopularSearches();
    }

    function hideSearchDropdown() {
        searchDropdown.classList.add('hidden');
        isDropdownOpen = false;
    }

    function showPopularSearches() {
        searchPopular.classList.remove('hidden');
        searchNoResults.classList.add('hidden');
        clearSearchResults();
    }

    function performSearch(query) {
        // Simulate search results
        const games = ['League of Legends', 'Counter-Strike 2', 'Valorant', 'Dota 2', 'Overwatch 2'];
        const tournaments = ['World Championship', 'Major Tournament', 'Regional Cup'];
        const teams = ['Team Liquid', 'Fnatic', 'G2 Esports', 'T1'];

        const gameResults = games.filter(game => 
            game.toLowerCase().includes(query.toLowerCase())
        );
        const tournamentResults = tournaments.filter(tournament => 
            tournament.toLowerCase().includes(query.toLowerCase())
        );
        const teamResults = teams.filter(team => 
            team.toLowerCase().includes(query.toLowerCase())
        );

        displaySearchResults(gameResults, tournamentResults, teamResults);
        
        if (gameResults.length === 0 && tournamentResults.length === 0 && teamResults.length === 0) {
            showNoResults();
        }
    }

    function displaySearchResults(games, tournaments, teams) {
        searchPopular.classList.add('hidden');
        searchNoResults.classList.add('hidden');

        // Display games
        const gamesContainer = document.getElementById('search-games');
        gamesContainer.innerHTML = games.map(game => `
            <button class="w-full text-left px-2 py-1.5 text-sm text-[#A5B4FC] hover:text-white hover:bg-[rgba(91,70,229,0.1)] rounded transition-colors duration-200">
                🎮 ${game}
            </button>
        `).join('');

        // Display tournaments
        const tournamentsContainer = document.getElementById('search-tournaments');
        tournamentsContainer.innerHTML = tournaments.map(tournament => `
            <button class="w-full text-left px-2 py-1.5 text-sm text-[#A5B4FC] hover:text-white hover:bg-[rgba(91,70,229,0.1)] rounded transition-colors duration-200">
                🏆 ${tournament}
            </button>
        `).join('');

        // Display teams
        const teamsContainer = document.getElementById('search-teams');
        teamsContainer.innerHTML = teams.map(team => `
            <button class="w-full text-left px-2 py-1.5 text-sm text-[#A5B4FC] hover:text-white hover:bg-[rgba(91,70,229,0.1)] rounded transition-colors duration-200">
                👥 ${team}
            </button>
        `).join('');
    }

    function clearSearchResults() {
        document.getElementById('search-games').innerHTML = '';
        document.getElementById('search-tournaments').innerHTML = '';
        document.getElementById('search-teams').innerHTML = '';
    }

    function showNoResults() {
        searchPopular.classList.add('hidden');
        searchNoResults.classList.remove('hidden');
        clearSearchResults();
    }
}

// Notifications functionality
function initializeNotifications() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const markAllReadBtn = document.getElementById('mark-all-read');
    const notificationBadge = document.getElementById('notification-badge');

    if (!notificationBtn || !notificationsDropdown) return;

    let isDropdownOpen = false;

    // Toggle notifications dropdown
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNotificationsDropdown();
    });

    // Mark all as read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            markAllNotificationsAsRead();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#notifications-component')) {
            hideNotificationsDropdown();
        }
    });

    // Handle individual notification clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.notification-item')) {
            const notificationItem = e.target.closest('.notification-item');
            markNotificationAsRead(notificationItem);
        }
    });

    function toggleNotificationsDropdown() {
        if (isDropdownOpen) {
            hideNotificationsDropdown();
        } else {
            showNotificationsDropdown();
        }
    }

    function showNotificationsDropdown() {
        notificationsDropdown.classList.remove('hidden');
        isDropdownOpen = true;
        updateNotificationBadge();
    }

    function hideNotificationsDropdown() {
        notificationsDropdown.classList.add('hidden');
        isDropdownOpen = false;
    }

    function markAllNotificationsAsRead() {
        const unreadNotifications = document.querySelectorAll('.notification-item[data-read="false"]');
        unreadNotifications.forEach(notification => {
            markNotificationAsRead(notification);
        });
        updateNotificationBadge();
        console.log('All notifications marked as read');
    }

    function markNotificationAsRead(notificationItem) {
        notificationItem.setAttribute('data-read', 'true');
        const dot = notificationItem.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'none';
        }
        // Fade the notification
        notificationItem.style.opacity = '0.6';
    }

    function updateNotificationBadge() {
        const unreadCount = document.querySelectorAll('.notification-item[data-read="false"]').length;
        if (unreadCount > 0) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.classList.remove('hidden');
            notificationBadge.classList.add('flex');
        } else {
            notificationBadge.classList.add('hidden');
            notificationBadge.classList.remove('flex');
        }
    }

    // Initialize badge on load
    updateNotificationBadge();
}

// Export functions for use in main.js
window.initializeSearch = initializeSearch;
window.initializeNotifications = initializeNotifications;
