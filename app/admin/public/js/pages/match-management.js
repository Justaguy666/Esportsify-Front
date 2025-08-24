function getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
}

// Export function to render player table
export function renderPlayerMatchTableRows(playersPageItems) {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.classList.remove('animate');
    tbody.innerHTML = '';
    // Render player rows
    playersPageItems.forEach(match => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${match.id}</td>
            <td>
                <div class="versus-container">
                    <div class="avatar">
                        <div class="avatar-circle">${getInitials(match.players[0].name)}</div>
                    </div>
                    <div class="versus"><span>vs</span></div>
                    <div class="avatar">
                        <div class="avatar-circle">${getInitials(match.players[1].name)}</div>
                    </div>
                </div>
            </td>
            <td>${match.date}</td>
            <td><div class="score-table-container">${match.players[0].score} - ${match.players[1].score}</div></td>
            <td>${match.viewers.toLocaleString()}</td>
            <td>
                <span class="status-badge status-${match.status.toLowerCase()}">${match.status}</span>
            </td>
            <td>
                <div class="actions">
                    <button class="edit-btn" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
                    </svg>
                    </button>
                    <button class="lock-btn" title="Lock">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/>
                    </svg>
                    </button>
                    <button class="delete-btn" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17 9h4q.425 0 .713.288T22 10t-.288.713T21 11h-4q-.425 0-.712-.288T16 10t.288-.712T17 9m-8 3q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18"/>
                    </svg>
                    </button>
                    <button class="more-btn" title="More">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m12 15.4-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/>
                    </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);

        const detailsRow = document.createElement('tr');
        detailsRow.classList.add('match-details-row', 'hidden');
        detailsRow.innerHTML = `
            <td colspan="7">
            <div class="match-details">
                <div class="game-details-container">
                    <div class="game-details-title"><span class="title">Game</span></div>
                    <div class="game-details-info"><span class="info">${match.game}</span></div>
                </div>
                <div class="tournament-details-container">
                    <div class="tournament-details-title"><span class="title">Tournament</span></div>
                    <div class="tournament-details-info"><span class="info">${match.tournament}</span></div>
                </div>
                <div class="format-details-container">
                    <div class="format-details-title"><span class="title">Format</span></div>
                    <div class="format-details-info"><span class="info">${match.format}</span></div>
                </div>
            </div>
            </td>
        `;
        tbody.appendChild(detailsRow);
    });
    
    requestAnimationFrame(() => tbody.classList.add('animate'));
}

export function renderTeamMatchTableRows(teamsPageItems) {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.classList.remove('animate');
    tbody.innerHTML = '';
    // Render player rows
    teamsPageItems.forEach(match => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${match.id}</td>
            <td>
                <div class="versus-container">
                    <div class="avatar">
                        <div class="avatar-circle">${getInitials(match.players[0].name)}</div>
                    </div>
                    <div class="versus"><span>vs</span></div>
                    <div class="avatar">
                        <div class="avatar-circle">${getInitials(match.players[1].name)}</div>
                    </div>
                </div>
            </td>
            <td>${match.date}</td>
            <td><div class="score-table-container">${match.players[0].score} - ${match.players[1].score}</div></td>
            <td>${match.viewers.toLocaleString()}</td>
            <td>
                <span class="status-badge status-${match.status.toLowerCase()}">${match.status}</span>
            </td>
            <td>
                <div class="actions">
                    <button class="edit-btn" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
                    </svg>
                    </button>
                    <button class="lock-btn" title="Lock">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/>
                    </svg>
                    </button>
                    <button class="delete-btn" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17 9h4q.425 0 .713.288T22 10t-.288.713T21 11h-4q-.425 0-.712-.288T16 10t.288-.712T17 9m-8 3q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18"/>
                    </svg>
                    </button>
                    <button class="more-btn" title="More">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m12 15.4-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/>
                    </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);

        const detailsRow = document.createElement('tr');
        detailsRow.classList.add('match-details-row', 'hidden');
        detailsRow.innerHTML = `
            <td colspan="7">
            <div class="match-details">
                <div class="game-details-container">
                    <div class="game-details-title"><span class="title">Game</span></div>
                    <div class="game-details-info"><span class="info">${match.game}</span></div>
                </div>
                <div class="tournament-details-container">
                    <div class="tournament-details-title"><span class="title">Tournament</span></div>
                    <div class="tournament-details-info"><span class="info">${match.tournament}</span></div>
                </div>
                <div class="format-details-container">
                    <div class="format-details-title"><span class="title">Format</span></div>
                    <div class="format-details-info"><span class="info">${match.format}</span></div>
                </div>
            </div>
            </td>
        `;
        tbody.appendChild(detailsRow);
    });
    
    requestAnimationFrame(() => tbody.classList.add('animate'));
}