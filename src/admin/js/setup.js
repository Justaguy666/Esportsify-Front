function setupNavigationButton(selector, targetUrl) {
    const button = document.querySelector(selector);
    if (button) {
        button.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    }
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
            btn.innerHTML = isHidden ? closeButton : displayButton;
        });
    });

    setupNavigationButton('.add-new-entry-btn', 'tournament-addiction.html');
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
    
    setupNavigationButton('.add-player-btn', 'participant-player-management.html');
    setupNavigationButton('.add-team-btn', 'participant-team-management.html');
    setupConditionalNavigation('.add-new-entry-btn', '.add-player-btn', 'participant-player-addiction.html', '.add-team-btn', 'participant-team-addiction.html');
}

function setupParticipantPlayerAddiction()
{
    setupNavigationButton('.cancel-btn', 'participant-player-management.html');
    setupPopupToggle('.history-add-btn', '.add-history-table', 'show');
    setupPopupToggle('.add-close-btn', '.add-history-table', 'hide');
    setupPopupToggle('.add-popup-btn-container', '.add-history-table', 'hide');
    setupNavigationButton('.save-btn', 'participant-player-management.html');

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
    setupNavigationButton('.cancel-btn', 'participant-team-management.html');
    setupPopupToggle('.history-add-btn', '.add-history-table', 'show');
    setupPopupToggle('.add-close-btn', '.add-history-table', 'hide');
    setupPopupToggle('.add-popup-btn-container', '.add-history-table', 'hide');
    setupNavigationButton('.save-btn', 'participant-team-management.html');
}

function setupTournamentAddiction()
{
    setupNavigationButton('.cancel-btn', 'tournament-management.html');
    setupSelectorButtons('.add-player-btn', '.add-team-btn');
    setupPopupToggle('.add-player-table .add-close-btn', '.add-player-table', 'hide');
    setupPopupToggle('.add-team-table .add-close-btn', '.add-team-table', 'hide');
    setupNavigationButton('.save-btn', 'tournament-management.html');

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
    setupNavigationButton('.add-new-entry-btn', 'game-addiction.html');
}

function setupGameAddiction()
{
    setupNavigationButton('.cancel-btn', 'game-management.html');
    setupNavigationButton('.save-btn', 'game-management.html');
}

function setupNewsManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'news-addiction.html');
}

function setupNewsAddiction()
{
    setupNavigationButton('.cancel-btn', 'news-management.html');
    setupNavigationButton('.save-btn', 'news-management.html');
}

function setupHighlightManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'highlight-addiction.html');
}

function setupHighlightAddiction()
{
    setupNavigationButton('.cancel-btn', 'highlight-management.html');
    setupNavigationButton('.save-btn', 'highlight-management.html');
}

function setupRuleManagement()
{
    setupNavigationButton('.add-new-entry-btn', 'rule-addiction.html');
}

function setupRuleAddiction()
{
    setupNavigationButton('.cancel-btn', 'rule-management.html');
    setupNavigationButton('.save-btn', 'rule-management.html');
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
            btn.innerHTML = isHidden ? closeButton : displayButton;
        });
    });

    setupNavigationButton('.add-player-btn', 'match-players-management.html');
    setupNavigationButton('.add-team-btn', 'match-teams-management.html');
    setupConditionalNavigation('.add-new-entry-btn', '.add-player-btn', 'match-players-addiction.html', '.add-team-btn', 'match-teams-addiction.html');
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

    setupNavigationButton('.cancel-btn', 'match-players-management.html');
    setupNavigationButton('.save-btn', 'match-players-management.html');
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

    setupNavigationButton('.cancel-btn', 'match-teams-management.html');
    setupNavigationButton('.save-btn', 'match-teams-management.html');
}

function setupRegistrationManagement()
{
    setupNavigationButton('.add-player-btn', 'registration-players-management.html');
    setupNavigationButton('.add-team-btn', 'registration-teams-management.html');
}

export function setupListener()
{
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  const mappingPage = {
    "index.html": null,
    "participant-player-management.html": setupParticipantManagement,
    "participant-team-management.html": setupParticipantManagement,
    "tournament-management.html": setupTournamentManagement,
    "tournament-addiction.html": setupTournamentAddiction,
    "participant-player-addiction.html": setupParticipantPlayerAddiction,
    "participant-team-addiction.html": setupParticipantTeamAddiction,
    "game-management.html": setupGameManagement,
    "game-addiction.html": setupGameAddiction,
    "news-management.html": setupNewsManagement,
    "news-addiction.html": setupNewsAddiction,
    "highlight-management.html": setupHighlightManagement,
    "highlight-addiction.html": setupHighlightAddiction,
    "rule-management.html": setupRuleManagement,
    "rule-addiction.html": setupRuleAddiction,
    "match-players-management.html": setupMatchManagement,
    "match-teams-management.html": setupMatchManagement,
    "match-players-addiction.html": setupMatchPlayerAddiction,
    "match-teams-addiction.html": setupMatchTeamAddiction,
    "registration-players-management.html": setupRegistrationManagement,
    "registration-teams-management.html": setupRegistrationManagement,
  };
  if (mappingPage[fileName])
    return mappingPage[fileName]()
}