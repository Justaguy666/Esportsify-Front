function getInitials(name) 
{
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
}
  
function renderUserTablePage(users, rowsPerPage, page, role) 
{
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.classList.remove('animate');
    tbody.innerHTML = '';

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageUsers = users.slice(start, end);

    pageUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.id}</td>
        <td>
            <div class="avatar">
                <div class="avatar-circle">${getInitials(user.name)}</div>
                <span>${user.name}</span>
            </div>
        </td>
        <td>${user.email}</td>
        <td>${user.registered}</td>
        <td>${user.lastLogin}</td>
        <td>
            <div class="actions">
                <button class="edit-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
                    </svg>
                </button>
                <button class="lock-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/>
                    </svg>
                </button>
                <button class="delete-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17 9h4q.425 0 .713.288T22 10t-.288.713T21 11h-4q-.425 0-.712-.288T16 10t.288-.712T17 9m-8 3q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18"/>
                    </svg>
                </button>
            </div>
        </td>
        `;
        tbody.appendChild(row);
    });

    requestAnimationFrame(() => {
        tbody.classList.add('animate');
    });
    renderPagination(users, rowsPerPage, page, role);
}

function renderTournamentTablePage(tournaments, rowsPerPage, page, role)
{
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.classList.remove('animate');
    tbody.innerHTML = '';

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageTournaments = tournaments.slice(start, end);

    pageTournaments.forEach(tournament => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${tournament.id}</td>
        <td>${tournament.game_name}</td>
        <td>${tournament.organizer}</td>
        <td>${tournament.last_modified}</td>
        <td>${tournament.views}</td>
        <td>
            <div class="actions">
                <button class="edit-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
                    </svg>
                </button>
                <button class="lock-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/>
                    </svg>
                </button>
                <button class="delete-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17 9h4q.425 0 .713.288T22 10t-.288.713T21 11h-4q-.425 0-.712-.288T16 10t.288-.712T17 9m-8 3q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18"/>
                    </svg>
                </button>
                <button class="more-btn">
                    <!-- icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/>
                    </svg>
                </button>
            </div>
        </td>
        `;
        tbody.appendChild(row);
    
        const detailsRow = document.createElement('tr');
        detailsRow.classList.add('tournament-details-row', 'hidden');
        detailsRow.innerHTML = `
        <td colspan="6">
            <div class="tournament-details">
                <h3>Tournaments Details</h3>
                <p><strong>Participants:</strong> ${tournament.participants}</p>
                <p><strong>Format:</strong> ${tournament.format}</p>
                <p><strong>Prize Pool:</strong> ${tournament.prize_pool}</p>
                <p><strong>Registration:</strong> ${tournament.registration}</p>
                <p><strong>Duration:</strong> ${tournament.start_end}</p>
            </div>
        </td>
        `;
        tbody.appendChild(detailsRow);
    });

    requestAnimationFrame(() => {
        tbody.classList.add('animate');
    });
    renderPagination(tournaments, rowsPerPage, page, role);
}
  
function renderPagination(data, rowsPerPage, currentPage, role) 
{
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginationInfo = document.getElementById('pagination-info');
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';
  
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, data.length);
  
    paginationInfo.textContent = `Showing ${start} to ${end} of ${data.length} ${role}`;
  
    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15 7a1 1 0 0 0-1.707-.707l-5 5a1 1 0 0 0 0 1.414l5 5A1 1 0 0 0 15 17z" clip-rule="evenodd"/></svg>';
    prevBtn.className = 'pagination-btn';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        mappingRenderTable(data, rowsPerPage, currentPage, role);
      }
    };
    paginationControls.appendChild(prevBtn);
  
    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = 'pagination-btn';
      if (i === currentPage) btn.classList.add('active');
      btn.onclick = () => {
        currentPage = i;                                                                                                                                                                                 
        mappingRenderTable(data, rowsPerPage, currentPage, role);
      };
      paginationControls.appendChild(btn);
    }                      
  
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9 17a1 1 0 0 0 1.707.707l5-5a1 1 0 0 0 0-1.414l-5-5A1 1 0 0 0 9 7z" clip-rule="evenodd"/></svg>';
    nextBtn.className = 'pagination-btn';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        mappingRenderTable(data, rowsPerPage, currentPage, role);
      }
    };
    paginationControls.appendChild(nextBtn);
}

function mappingRenderTable(data, rowsPerPage, currentPage, role)
{
    const mappingRole = {
        user: () => renderUserTablePage(data, rowsPerPage, currentPage, role),
        tournament: () => renderTournamentTablePage(data, rowsPerPage, currentPage, role)
    };
    return mappingRole[role]();
}

export function renderTable()
{
    const data = [
        {
          id: '#T-2025-001',
          game_name: 'Valorant Summer Cup',
          organizer: 'Riot Games',
          views: '5,302',
          registration: 'Jul 1 – Jul 15, 2025',
          start_end: 'Jul 20 – Jul 25, 2025',
          participants: 16,
          format: 'Group Stage + BO3',
          prize_pool: '$20,000',
          last_modified: 'Aug 1, 2025'
        },
        {
          id: '#T-2025-002',
          game_name: 'CS2 Global Clash',
          organizer: 'Valve Corp',
          views: '1,972',
          registration: 'Jul 5 – Jul 18, 2025',
          start_end: 'Jul 22 – Jul 29, 2025',
          participants: 12,
          format: 'Single Elimination',
          prize_pool: '$15,000',
          last_modified: 'Aug 2, 2025'
        },
        {
          id: '#T-2025-003',
          game_name: 'League of Champions',
          organizer: 'Riot Games',
          views: '9,000',
          registration: 'Jun 25 – Jul 10, 2025',
          start_end: 'Jul 15 – Jul 30, 2025',
          participants: 24,
          format: 'Group + Knockout',
          prize_pool: '$50,000',
          last_modified: 'Aug 3, 2025'
        },
        {
          id: '#T-2025-004',
          game_name: 'Dota 2 Battle Arena',
          organizer: 'Valve Corp',
          views: '3,186',
          registration: 'Jul 10 – Jul 18, 2025',
          start_end: 'Jul 22 – Jul 28, 2025',
          participants: 8,
          format: 'Double Elimination',
          prize_pool: '$10,000',
          last_modified: 'Aug 4, 2025'
        },
        {
          id: '#T-2025-005',
          game_name: 'Overwatch Open',
          organizer: 'Blizzard',
          views: '5,000',
          registration: 'Jul 1 – Jul 14, 2025',
          start_end: 'Jul 19 – Jul 25, 2025',
          participants: 20,
          format: 'Swiss Format',
          prize_pool: '$18,000',
          last_modified: 'Aug 4, 2025'
        }
      ];
      
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const rowsPerPage = 5;
    const currentPage = 1;
    const mappingPage = {
        "index.html": null,
        "user-management.html": ["user", rowsPerPage, currentPage],
        "participant-management.html": ["participant", rowsPerPage, currentPage],
        "tournament-management.html": ["tournament", rowsPerPage, currentPage]
    };
    
    const pageConfig = mappingPage[currentPath];
    if (pageConfig) 
    {
        const [role, rowsPerPage, currentPage] = pageConfig;
        mappingRenderTable(data, rowsPerPage, currentPage, role);
    }
}