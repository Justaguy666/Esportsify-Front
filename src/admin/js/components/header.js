function loadHeader() {
  const headerHTML = `
  <div id="header">
      <div class="header-left">
          <a href="/src/admin/index.html" style="display: flex; align-items: center; background: rgba(91,70,229,0.2); padding: 12px 12px; border-radius: 16px; text-decoration: none;">
              <img src="/src/assets/images/logo.png" alt="Esportsify Logo" style="width: 24px; height: 16px; margin-right: 8px; object-fit: contain;" />
              <span style="font-weight: bold; font-size: 20px; letter-spacing: 0.05em; color: white;">
                <span style="color: #5B46E5;">E</span>SPORT<span style="color: #5B46E5;">SIFY</span>
              </span>
          </a>       
      </div>
      <div class="header-right">
          <div class="link">
              <a href="/src/admin/index.html" class="home nav-link">Home</a>
              <div class="manage">
                  <span class="manage-text nav-link">Manage</span>
                  <div class="dropdown box">
                      <a href="/src/admin/user-management.html" class="item">
                          <div class="user-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"/>
                              </svg>
                          </div>
                          <span>User</span>
                      </a>

                      <a href="#" class="item">
                          <div class="game-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M7.97 16L5 19c-.33.3-.77.5-1.25.5A1.75 1.75 0 0 1 2 17.75v-.25l1-7.38A4.524 4.524 0 0 1 7.5 6h9c2.36 0 4.29 1.81 4.5 4.12l1 7.38v.25a1.75 1.75 0 0 1-1.75 1.75c-.48 0-.92-.2-1.25-.5l-2.97-3zM7 8v2H5v1h2v2h1v-2h2v-1H8V8zm9.5 0a.75.75 0 0 0-.75.75a.75.75 0 0 0 .75.75a.75.75 0 0 0 .75-.75a.75.75 0 0 0-.75-.75m-1.75 1.75a.75.75 0 0 0-.75.75a.75.75 0 0 0 .75.75a.75.75 0 0 0 .75-.75a.75.75 0 0 0-.75-.75m3.5 0a.75.75 0 0 0-.75.75a.75.75 0 0 0 .75.75a.75.75 0 0 0 .75-.75a.75.75 0 0 0-.75-.75M16.5 11.5a.75.75 0 0 0-.75.75a.75.75 0 0 0 .75.75a.75.75 0 0 0 .75-.75a.75.75 0 0 0-.75-.75"/>
                              </svg>
                          </div>
                          <span>Game</span>
                      </a>
                      
                      <a href="/src/admin/participant/participant-management.html" class="item">
                          <div class="participant-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"/>
                              </svg>
                          </div>
                          <span>Participant</span>
                      </a>
                      
                      <a href="/src/admin/tournament/tournament-management.html" class="item">
                          <div class="tournament-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162"/><path fill="currentColor" fill-rule="evenodd" d="M16.377 2.347A26.4 26.4 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874" clip-rule="evenodd"/>
                              </svg>
                          </div>
                          <span>Tournament</span>
                      </a>

                      <a href="#" class="item">
                          <div class="match-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="m2 20l6-8l-6-8h13q.475 0 .9.213t.7.587L22 12l-.125.175Q21 11.6 20.025 11.3T18 11q-2.925 0-4.962 2.038T11 17.975q0 .5.075 1.013T11.3 20zm16 3q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m-.725-2.75l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075z"/>
                              </svg>
                          </div>
                          <span>Match</span>
                      </a>
                      
                      <a href="#" class="item">
                          <div class="registration-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"/>
                              </svg>
                          </div>
                          <span>Registration</span>
                      </a>
                      
                      <a href="#" class="item">
                          <div class="rule-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                  <path fill="none" d="M9 16h14v2H9zm0-6h14v2H9z"/><path fill="currentColor" d="M26 2H6a2 2 0 0 0-2 2v13a10.98 10.98 0 0 0 5.824 9.707L16 30l6.176-3.293A10.98 10.98 0 0 0 28 17V4a2 2 0 0 0-2-2m-3 16H9v-2h14Zm0-6H9v-2h14Z"/>
                              </svg>
                          </div>
                          <span>Rule</span>
                      </a>
                  </div>
              </div>
              <div class="media">
                <span class="media-text nav-link">Media</span>
                <div class="dropdown box">
                      <a href="#" class="item">
                          <div class="news-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm2-4h10v-2H7zm0-4h10v-2H7zm8-4h4l-4-4zM7 9h5V7H7z"/>
                              </svg>
                          </div>
                          <span>News</span>
                      </a>

                      <a href="#" class="item">
                          <div class="highlight-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none">
                                  <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"/></g>
                              </svg>
                          </div>
                          <span>Highlight</span>
                      </a>
                      
                      <a href="#" class="item">
                          <div class="live-icon icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                                  <path fill="currentColor" d="M5.453 4.167a.726.726 0 0 0-1.027-.01A8.23 8.23 0 0 0 2 10a8.23 8.23 0 0 0 2.604 6.015a.725.725 0 0 0 1.01-.025c.316-.316.277-.819-.027-1.11A6.73 6.73 0 0 1 3.5 10c0-1.846.741-3.52 1.943-4.738c.29-.295.32-.785.01-1.095M7.214 5.93a.714.714 0 0 0-1.008-.016A5.73 5.73 0 0 0 4.5 10c0 1.692.73 3.213 1.893 4.265a.713.713 0 0 0 .983-.038c.328-.328.267-.844-.041-1.134A4.24 4.24 0 0 1 6 10c0-1.15.457-2.194 1.2-2.96c.286-.294.333-.793.014-1.111m5.572 0a.714.714 0 0 1 1.008-.016A5.73 5.73 0 0 1 15.5 10c0 1.692-.73 3.213-1.893 4.265a.713.713 0 0 1-.983-.038c-.328-.328-.267-.844.041-1.134A4.24 4.24 0 0 0 14 10c0-1.15-.457-2.194-1.2-2.96c-.286-.294-.333-.793-.014-1.111m1.761-1.762a.726.726 0 0 1 1.027-.01A8.23 8.23 0 0 1 18 10a8.23 8.23 0 0 1-2.604 6.015a.725.725 0 0 1-1.01-.025c-.316-.316-.277-.819.028-1.11A6.73 6.73 0 0 0 16.5 10c0-1.846-.741-3.52-1.943-4.738c-.29-.295-.32-.785-.01-1.095M10 8.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/>
                              </svg>
                          </div>
                          <span>Live</span>
                      </a>
                  </div>
              </div>
          </div>
          <div class="position"><span class="position-text">Admin</span></div>
      </div>
  </div>
  `;
  
  document.getElementById('header-container').innerHTML = headerHTML;
}

function createLineOfCurrentPage() {
    const mappingPage = {
        "index.html": "home",
        "user-management.html": "manage-text",
        "game-management.html": "manage-text",
        "participant-management.html": "manage-text",
        "tournament-management.html": "manage-text",
        "tournament-addiction.html": "manage-text",
        "media.html": "media"
    };

    const fullPath = window.location.pathname;
    const fileName = fullPath.split("/").pop();
    const currentClass = mappingPage[fileName];

    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.classList.contains(currentClass)) {
            if (currentClass === "home") {
                link.classList.add("active-home");
            } else if (currentClass === "manage-text") {
                link.classList.add("active-manage");
            }
        }
    });
}

export async function initHeader()
{
    await loadHeader();
    createLineOfCurrentPage();
}