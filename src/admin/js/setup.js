function setupTournamentManagement()
{
    const moreButtons = document.querySelectorAll('.more-btn');
    const displayButton = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>`
    const closeButton = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>`
    const addButton = document.querySelector('.add-btn');
    moreButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const detailRow = btn.closest('tr').nextElementSibling;
            if (!detailRow) return;

            const isHidden = detailRow.classList.contains('hidden');
            detailRow.classList.toggle('hidden');
            btn.innerHTML = isHidden ? closeButton : displayButton;
        });
    });

    if (addButton) 
    {
        addButton.addEventListener('click', () => {
            window.location.href = 'tournament-addiction.html';
        });
    }
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

function setupTournamentAddiction()
{
    const cancelButton = document.querySelector('.cancel-btn');
    const playerButton = document.querySelector('.add-player-btn');
    const teamButton = document.querySelector('.add-team-btn');
    const addButton = document.querySelector('.add-btn');
    const playerPopup = document.querySelector('.add-player-table');
    const teamPopup = document.querySelector('.add-team-table');
    const playerCloseButton = document.querySelector('.add-player-table .add-close-btn');
    const teamCloseButton = document.querySelector('.add-team-table .add-close-btn');

    if(cancelButton)
    {
        cancelButton.addEventListener('click', () => {
            window.location.href = 'tournament-management.html';
        })
    }

    if(playerButton && teamButton)
    {
        playerButton.addEventListener('click', () => {
            if (!playerButton.classList.contains('selector')) {
                playerButton.classList.add('selector');
                teamButton.classList.remove('selector');
            }
        });
        
        teamButton.addEventListener('click', () => {
            if (!teamButton.classList.contains('selector')) {
                teamButton.classList.add('selector');
                playerButton.classList.remove('selector');
            }
        });
    }

    if (addButton) 
    {
        addButton.addEventListener('click', () => {
            if (playerButton.classList.contains('selector')) {
                playerPopup.style.display = 'flex';
            } else if (teamButton.classList.contains('selector')) {
                teamPopup.style.display = 'flex';
            }
        });
    }
    
    if (playerCloseButton) {
        playerCloseButton.addEventListener('click', () => {
            playerPopup.style.display = 'none';
        });
    }

    if (teamCloseButton) {
        teamCloseButton.addEventListener('click', () => {
            teamPopup.style.display = 'none';
        });
    }

    setupLinkedDates('registration-start-date', 'registration-end-date');
    setupLinkedDates('tournament-start-date', 'tournament-end-date');
}

export function setupListener()
{
  const path = window.location.pathname;
  const fileName = path.split("/").pop();
  const mappingPage = {
    "index.html": null,
    "tournament-management.html": setupTournamentManagement,
    "tournament-addiction.html": setupTournamentAddiction
  };
  return mappingPage[fileName]()
}