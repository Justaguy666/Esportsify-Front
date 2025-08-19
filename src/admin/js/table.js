import { users, games, participants, tournaments, news, highlights, rules, player_matches, team_matches } from './data/sample.js'
import { renderUserTableRows } from './pages/user-management.js';
import { renderTournamentTableRows } from './pages/tournament-management.js'
import { renderPlayerTableRows, renderTeamTableRows } from './pages/participant-management.js'
import { renderGameTableRows } from './pages/game-management.js'
import { renderNewsTableRows } from './pages/news-management.js'
import { renderHighlightTableRows } from './pages/highlight-management.js'
import { renderRuleTableRows } from './pages/rule-management.js'
import { renderPlayerMatchTableRows } from './pages/match-management.js'  
import { renderTeamMatchTableRows } from './pages/match-management.js'  

function paginate(data, page, rowsPerPage) {
    const total = data.length;
    const totalPages = Math.ceil(total / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, total);
    return {
      page,
      rowsPerPage,
      total,
      totalPages,
      start,
      end,
      items: data.slice(start, end),
    };
}
  
function renderPagination(paging, roleLabel, onChange) {
    const { page, totalPages, start, end, total } = paging;
  
    const paginationInfo = document.getElementById('pagination-info');
    const paginationControls = document.getElementById('pagination-controls');
    if (!paginationInfo || !paginationControls) return;
  
    paginationControls.innerHTML = '';
    paginationInfo.textContent = `Showing ${start + 1} to ${end} of ${total} ${roleLabel}`;
  
    const makeBtn = (html, disabled, nextPage, title = '') => {
      const b = document.createElement('button');
      b.className = 'pagination-btn';
      b.innerHTML = html;
      b.title = title;
      b.disabled = disabled;
      b.onclick = () => onChange(nextPage);
      return b;
    };
  
    // Prev
    paginationControls.appendChild(
      makeBtn(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15 7a1 1 0 0 0-1.707-.707l-5 5a1 1 0 0 0 0 1.414l5 5A1 1 0 0 0 15 17z" clip-rule="evenodd"/></svg>',
        page === 1,
        page - 1,
        'Previous'
      )
    );
  
    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      const num = document.createElement('button');
      num.textContent = i;
      num.className = 'pagination-btn';
      if (i === page) num.classList.add('active');
      num.onclick = () => onChange(i);
      paginationControls.appendChild(num);
    }
  
    // Next
    paginationControls.appendChild(
      makeBtn(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9 17a1 1 0 0 0 1.707.707l5-5a1 1 0 0 0 0-1.414l-5-5A1 1 0 0 0 9 7z" clip-rule="evenodd"/></svg>',
        page === totalPages,
        page + 1,
        'Next'
      )
    );
}

function resolveRendererByRole(role) {
    const map = {
      user: renderUserTableRows,
      tournament: renderTournamentTableRows,
      participant_player: renderPlayerTableRows,
      participant_team: renderTeamTableRows,
      game: renderGameTableRows,
      news: renderNewsTableRows,
      highlight: renderHighlightTableRows,
      rule: renderRuleTableRows,
      player_match: renderPlayerMatchTableRows,
      team_match: renderTeamMatchTableRows,
    };
    return map[role];
}
  
function resolveRoleLabel(role) {
    const map = {
      user: 'users',
      tournament: 'tournaments',
      participant_player: 'players',
      participant_team: 'teams',
      game: 'games',
      news: 'news',
      highlight: 'highlights',
      rule: 'rules',
      player_match: 'player matches',
      team_match: 'team matches',
    };
    return map[role] ?? 'items';
}
  
function mountTableWithPagination({ data, role, rowsPerPage = 5 }) {
  const renderRows = resolveRendererByRole(role);
  if (!renderRows) throw new Error(`Unknown role: ${role}`);

  const roleLabel = resolveRoleLabel(role);
  let state = { page: 1, rowsPerPage };

  function update(newPage = state.page) {
    state.page = newPage;
    const paging = paginate(data, state.page, state.rowsPerPage);
    renderRows(paging.items);
    renderPagination(paging, roleLabel, (goToPage) => {
      if (goToPage >= 1 && goToPage <= paging.totalPages) update(goToPage);
    });
  }

  update(1);
}


export function renderTable() {
  
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const mappingPage = {
      "index.html": null,
      "user-management.html": { role: "user", rowsPerPage: 5 , data: users},
      "participant-player-management.html": { role: "participant_player", rowsPerPage: 5 , data : participants.players},
      "participant-team-management.html": { role: "participant_team", rowsPerPage: 5 , data : participants.teams},
      "tournament-management.html": { role: "tournament", rowsPerPage: 5 , data : tournaments},
      "game-management.html": { role: "game", rowsPerPage: 5 , data : games},
      "news-management.html": { role: "news", rowsPerPage: 5 , data : news},
      "highlight-management.html": { role: "highlight", rowsPerPage: 5 , data : highlights},
      "rule-management.html": { role: "rule", rowsPerPage: 5 , data : rules},
      "match-players-management.html": { role: "player_match", rowsPerPage: 5 , data : player_matches},
      "match-teams-management.html": { role: "team_match", rowsPerPage: 5 , data : team_matches}
    };
  
    const pageConfig = mappingPage[currentPath];
    if (pageConfig) {
      const { role, rowsPerPage, data } = pageConfig;
      mountTableWithPagination({ data, role, rowsPerPage });
    }
}
  