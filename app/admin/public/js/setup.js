function setupNavigationButton(selector, targetUrl) {
    const button = document.querySelector(selector);
    if (button) {
        button.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    }
}

const LOCKED_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/>
  </svg>`;
const UNLOCKED_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 1c-2.76 0-5 2.24-5 5v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12c1.11 0 2-.89 2-2V10a2 2 0 0 0-2-2h-1V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2h2V6c0-2.76-2.24-5-5-5m-8 12a2 2 0 0 1 2 2c0 1.11-.89 2-2 2a2 2 0 1 1 0-4"/>
  </svg>`;

let lockToggleInitialized = false;
function setupLockToggle() {
    if (lockToggleInitialized) return;
    document.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('.lock-btn');
        if (!btn) return;
        const isUnlocking = !btn.classList.contains('unlocked');
        btn.classList.toggle('unlocked');
        // swap icon according to state
        btn.inne = isUnlocking ? UNLOCKED_ICON : LOCKED_ICON;
    });
    lockToggleInitialized = true;
}

function setupPopupToggle(triggerSelector, popupSelector, action = 'toggle') {
    const trigger = document.querySelector(triggerSelector);
    const popup = document.querySelector(popupSelector);
    
    if (trigger && popup) {
        trigger.addEventListener('click', () => {
            if (action === 'show') {
                popup.style.display = 'flex';
            } else if (action === 'hide') {
                popup.style.display = 'none';
            } else {
                popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
            }
        });
    }
}

function setupSelectorButtons(button1Selector, button2Selector) {
    const button1 = document.querySelector(button1Selector);
    const button2 = document.querySelector(button2Selector);
    
    if (button1 && button2) {
        button1.addEventListener('click', () => {
            if (!button1.classList.contains('selector')) {
                button1.classList.add('selector');
                button2.classList.remove('selector');
            }
        });
        
        button2.addEventListener('click', () => {
            if (!button2.classList.contains('selector')) {
                button2.classList.add('selector');
                button1.classList.remove('selector');
            }
        });
    }
}

function setupTournamentManagement()
{
    const moreButtons = document.querySelectorAll('.more-btn');
    const displayButton = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>`
    const closeButton = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>`
    moreButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const detailRow = btn.closest('tr').nextElementSibling;
            if (!detailRow) return;

            const isHidden = detailRow.classList.contains('hidden');
            detailRow.classList.toggle('hidden');
            btn.inne = isHidden ? closeButton : displayButton;
        });
    });

    setupNavigationButton('.add-new-entry-btn', 'tournament-addiction');
}

function setupLinkedDates(startId, endId) {
    const startInput = document.getElementById(startId);
    const endInput = document.getElementById(endId);

    if (!startInput || !endInput) return;

    // Hiện lịch nếu trình duyệt hỗ trợ
    startInput.addEventListener('focus', () => {
        if (typeof startInput.showPicker === 'function') startInput.showPicker();
    });

    endInput.addEventListener('focus', () => {
        if (typeof endInput.showPicker === 'function') endInput.showPicker();
    });

    // Giới hạn ngày end phải sau start
    startInput.addEventListener('change', () => {
        const startDate = startInput.value;
        if (startDate) {
            endInput.min = startDate;
            if (endInput.value && endInput.value < startDate) {
                endInput.value = '';
            }
        }
    });
}

function setupConditionalNavigation(buttonSelector, condition1Selector, url1, condition2Selector, url2) {
    const button = document.querySelector(buttonSelector);
    const condition1 = document.querySelector(condition1Selector);
    const condition2 = document.querySelector(condition2Selector);
    
    if (button && condition1 && condition2) {
        button.addEventListener('click', () => {
            if (condition1.classList.contains('selector')) {
                window.location.href = url1;
            } else if (condition2.classList.contains('selector')) {
                window.location.href = url2;
            }
        });
    }
}

function setupParticipantManagement()
{
    const joinButton = document.getElementById('join-date');
    if(!joinButton) console.log('joinButton not found');
    
    setupNavigationButton('.add-player-btn', 'participant-player-management');
    setupNavigationButton('.add-team-btn', 'participant-team-management');
    setupConditionalNavigation('.add-new-entry-btn', '.add-player-btn', 'participant-player-addiction', '.add-team-btn', 'participant-team-addiction');
}

function setupParticipantPlayerAddiction()
{
    setupNavigationButton('.cancel-btn', 'participant-player-management');
    setupPopupToggle('.history-add-btn', '.add-history-table', 'show');
    setupPopupToggle('.add-close-btn', '.add-history-table', 'hide');
    setupPopupToggle('.add-popup-btn-container', '.add-history-table', 'hide');
    setupNavigationButton('.save-btn', 'participant-player-management');

    const joinButton = document.getElementById('join-date');
    if (joinButton) {
        joinButton.addEventListener('focus', () => {
            if (typeof joinButton.showPicker === 'function') joinButton.showPicker();
        });
    }
    
    setupLinkedDates('join-duration-date', 'leave-duration-date');
}

function setupParticipantTeamAddiction()
{
    setupNavigationButton('.cancel-btn', 'participant-team-management');
    setupPopupToggle('.history-add-btn', '.add-history-table', 'show');
    setupPopupToggle('.add-close-btn', '.add-history-table', 'hide');
    setupPopupToggle('.add-popup-btn-container', '.add-history-table', 'hide');
    setupNavigationButton('.save-btn', 'participant-team-management');
}

function setupTournamentAddiction()
{
    setupNavigationButton('.cancel-btn', 'tournament-management');
    setupSelectorButtons('.add-player-btn', '.add-team-btn');
    setupPopupToggle('.add-player-table .add-close-btn', '.add-player-table', 'hide');
    setupPopupToggle('.add-team-table .add-close-btn', '.add-team-table', 'hide');
    setupNavigationButton('.save-btn', 'tournament-management');

    // Special logic for add button based on selector state
    const addButton = document.querySelector('.add-btn');
    const playerButton = document.querySelector('.add-player-btn');
    const teamButton = document.querySelector('.add-team-btn');
    const playerPopup = document.querySelector('.add-player-table');
    const teamPopup = document.querySelector('.add-team-table');

    if (addButton && playerButton && teamButton && playerPopup && teamPopup) {
        addButton.addEventListener('click', () => {
            if (playerButton.classList.contains('selector')) {
                playerPopup.style.display = 'flex';
            } else if (teamButton.classList.contains('selector')) {
                teamPopup.style.display = 'flex';
            }
        });
    }

    setupLinkedDates('registration-start-date', 'registration-end-date');
    setupLinkedDates('tournament-start-date', 'tournament-end-date');
}

function setupGameManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'game-addiction');
}

function setupGameAddiction()
{
    setupNavigationButton('.cancel-btn', 'game-management');
    setupNavigationButton('.save-btn', 'game-management');
}

function setupNewsManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'news-addiction');
}

function setupNewsAddiction()
{
    setupNavigationButton('.cancel-btn', 'news-management');
    setupNavigationButton('.save-btn', 'news-management');
}

function setupHighlightManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'highlight-addiction');
}

function setupHighlightAddiction()
{
    setupNavigationButton('.cancel-btn', 'highlight-management');
    setupNavigationButton('.save-btn', 'highlight-management');
}

function setupRuleManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'rule-addiction');
}

function setupRuleAddiction()
{
    setupNavigationButton('.cancel-btn', 'rule-management');
    setupNavigationButton('.save-btn', 'rule-management');
}

function setupMatchManagement()
{
    const moreButtons = document.querySelectorAll('.more-btn');
    const displayButton = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>`
    const closeButton = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>`
    moreButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const detailRow = btn.closest('tr').nextElementSibling;
            if (!detailRow) return;

            const isHidden = detailRow.classList.contains('hidden');
            detailRow.classList.toggle('hidden');
            btn.inne = isHidden ? closeButton : displayButton;
        });
    });

    setupNavigationButton('.add-player-btn', 'match-players-management');
    setupNavigationButton('.add-team-btn', 'match-teams-management');
    setupConditionalNavigation('.add-new-entry-btn', '.add-player-btn', 'match-players-addiction', '.add-team-btn', 'match-teams-addiction');
}

function setupMatchPlayerAddiction()
{
    // Setup score increment/decrement buttons
    const scorePlusButtons = document.querySelectorAll('.score-plus-btn');
    const scoreMinusButtons = document.querySelectorAll('.score-minus-btn');
    
    scorePlusButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.closest('.score-number-container').querySelector('.score-input');
            const currentValue = parseInt(input.value) || 0;
            input.value = currentValue + 1;
        });
    });
    
    scoreMinusButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.closest('.score-number-container').querySelector('.score-input');
            const currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                input.value = currentValue - 1;
            }
        });
    });

    const matchButton = document.getElementById('match-date');
    if (matchButton) {
        matchButton.addEventListener('focus', () => {
            if (typeof matchButton.showPicker === 'function') matchButton.showPicker();
        });
    }

    setupNavigationButton('.cancel-btn', 'match-players-management');
    setupNavigationButton('.save-btn', 'match-players-management');
}

function setupMatchTeamAddiction()
{
    // Setup score increment/decrement buttons
    const scorePlusButtons = document.querySelectorAll('.score-plus-btn');
    const scoreMinusButtons = document.querySelectorAll('.score-minus-btn');
    
    scorePlusButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.closest('.score-number-container').querySelector('.score-input');
            const currentValue = parseInt(input.value) || 0;
            input.value = currentValue + 1;
        });
    });
    
    scoreMinusButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.closest('.score-number-container').querySelector('.score-input');
            const currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                input.value = currentValue - 1;
            }
        });
    });

    const matchButton = document.getElementById('match-date');
    if (matchButton) {
        matchButton.addEventListener('focus', () => {
            if (typeof matchButton.showPicker === 'function') matchButton.showPicker();
        });
    }

    setupNavigationButton('.cancel-btn', 'match-teams-management');
    setupNavigationButton('.save-btn', 'match-teams-management');
}

function setupRegistrationManagement()
{
    setupNavigationButton('.add-player-btn', 'registration-players-management');
    setupNavigationButton('.add-team-btn', 'registration-teams-management');
}

export function setupListener()
{
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  // Initialize common interactions
  setupLockToggle();
  const mappingPage = {
    "index": null,
    "participant-player-management": setupParticipantManagement,
    "participant-team-management": setupParticipantManagement,
    "tournament-management": setupTournamentManagement,
    "tournament-addiction": setupTournamentAddiction,
    "participant-player-addiction": setupParticipantPlayerAddiction,
    "participant-team-addiction": setupParticipantTeamAddiction,
    "game-management": setupGameManagement,
    "game-addiction": setupGameAddiction,
    "news-management": setupNewsManagement,
    "news-addiction": setupNewsAddiction,
    "highlight-management": setupHighlightManagement,
    "highlight-addiction": setupHighlightAddiction,
    "rule-management": setupRuleManagement,
    "rule-addiction": setupRuleAddiction,
    "match-players-management": setupMatchManagement,
    "match-teams-management": setupMatchManagement,
    "match-players-addiction": setupMatchPlayerAddiction,
    "match-teams-addiction": setupMatchTeamAddiction,
    "registration-players-management": setupRegistrationManagement,
    "registration-teams-management": setupRegistrationManagement,
  };
  if (mappingPage[fileName])
    return mappingPage[fileName]()
}