import { team_registration_forms } from '../data/sample.js';

class RegistrationTeamManagement {
    constructor() {
        this.registrationForms = team_registration_forms;
        this.currentForm = null;
        console.log('RegistrationTeamManagement initialized');
        console.log('Registration forms:', this.registrationForms);
        this.init();
    }

    init() {
        console.log('Initializing registration team management');
        this.renderRegistrationForm();
        this.setupEventListeners();
    }

    renderRegistrationForm() {
        const container = document.querySelector('.registration-forms-container');
        if (!container) {
            console.error('Registration forms container not found');
            return;
        }

        container.innerHTML = '';
        
        // Sort forms: Pending -> Approved -> Rejected
        const sortedForms = this.getSortedForms();
        
        sortedForms.forEach(form => {
            const formElement = this.createFormElement(form);
            container.appendChild(formElement);
        });
        
        // Update statistics
        this.updateStatistics();
    }

    getSortedForms() {
        const statusOrder = { 'Pending': 1, 'Approved': 2, 'Rejected': 3 };
        return [...this.registrationForms].sort((a, b) => {
            return statusOrder[a.status] - statusOrder[b.status];
        });
    }

    createFormElement(form) {
        const formDiv = document.createElement('div');
        formDiv.className = 'form-approve-container box';
        formDiv.setAttribute('data-form-id', form.id);
        
        const membersHtml = form.members.map(member => `
            <div class="details-container">
                <div class="details-title">${member.name}</div>
                <div class="details-name">${member.handle}</div>
            </div>
        `).join('');

        const isActionable = form.status === 'Pending';

        formDiv.innerHTML = `
            <div class="form-header-container">
                <div class="form-header-left">
                    <div class="form-header-name"><h1>${form.team_name}</h1></div>
                    <div class="form-header-tag-name">${form.tag}</div>
                    <div class="form-header-status status-${form.status_class}">${form.status}</div>
                </div>
                <div class="form-header-right">
                    ${isActionable ? `
                        <button class="approve-btn" data-form-id="${form.id}">Approve</button>
                        <button class="reject-btn" data-form-id="${form.id}">Reject</button>
                    ` : ''}
                </div>
            </div>
            <div class="form-body-container">
                <div class="participate-details">
                    <div class="details-container">
                        <div class="details-title">Game</div>
                        <div class="details-name">${form.game}</div>
                    </div>
                    <div class="details-container">
                        <div class="details-title">Tournament</div>
                        <div class="details-name">${form.tournament}</div>
                    </div>
                </div>
                <div class="manager-details">
                    <div class="manager-info-container">
                        <div class="manager-info"><span>Manager:</span> ${form.manager.name}</div>
                        <div class="manager-info"><span>Submitted:</span> ${form.submitted}</div>
                    </div>
                    <div class="manager-info-container">
                        <div class="manager-info"><span>Email:</span> ${form.manager.email}</div>
                        <div class="manager-info"><span>Phone:</span> ${form.manager.phone}</div>
                    </div>
                </div>

                <div class="border-bottom box" style="margin: 40px;"></div>

                <div class="player-details">
                    <div class="player-statistic">
                        <span>Team Members (${form.members.length}):</span>
                    </div>
                    <div class="player-list">
                        ${membersHtml}
                    </div>
                </div>
            </div>
        `;

        return formDiv;
    }


    setupEventListeners() {
        // Use event delegation for dynamically created buttons
        document.addEventListener('click', (e) => {
            // Ignore clicks on disabled approve/reject buttons
            if ((e.target.classList && (e.target.classList.contains('approve-btn') || e.target.classList.contains('reject-btn'))) && e.target.disabled) {
                e.preventDefault();
                return;
            }
            if (e.target.classList.contains('approve-btn')) {
                const formId = e.target.getAttribute('data-form-id');
                this.handleApprove(formId);
            } else if (e.target.classList.contains('reject-btn')) {
                const formId = e.target.getAttribute('data-form-id');
                this.handleReject(formId);
            }
        });
    }

    handleApprove(formId) {
        const form = this.registrationForms.find(f => f.id === formId);
        if (form) {
            if (form.status !== 'Pending') {
                return;
            }
            console.log(`Approving team: ${form.team_name}`);
            form.status = 'Approved';
            form.status_class = 'approved';
            // Re-render all forms to maintain proper sorting
            this.renderRegistrationForm();
        }
    }

    handleReject(formId) {
        const form = this.registrationForms.find(f => f.id === formId);
        if (form) {
            if (form.status !== 'Pending') {
                return;
            }
            console.log(`Rejecting team: ${form.team_name}`);
            form.status = 'Rejected';
            form.status_class = 'rejected';
            // Re-render all forms to maintain proper sorting
            this.renderRegistrationForm();
        }
    }

    updateStatistics() {
        const pending = this.registrationForms.filter(f => f.status === 'Pending').length;
        const approved = this.registrationForms.filter(f => f.status === 'Approved').length;
        const rejected = this.registrationForms.filter(f => f.status === 'Rejected').length;
        const total = this.registrationForms.length;

        // Update statistics in the header
        const statElements = document.querySelectorAll('.stat-registration-container div');
        if (statElements.length >= 4) {
            statElements[0].innerHTML = `<span>Total: <strong style="color: white;">${total}</strong></span>`;
            statElements[1].innerHTML = `<span>Pending: <strong style="color: #F59E0B;">${pending}</strong></span>`;
            statElements[2].innerHTML = `<span>Approved: <strong style="color: #10B981;">${approved}</strong></span>`;
            statElements[3].innerHTML = `<span>Rejected: <strong style="color: #EF4444;">${rejected}</strong></span>`;
        }
    }

    // Method to get all forms
    getAllForms() {
        return this.registrationForms;
    }

    // Method to get forms by status
    getFormsByStatus(status) {
        return this.registrationForms.filter(form => form.status === status);
    }

    // Method to search forms
    searchForms(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.registrationForms.filter(form => 
            form.team_name.toLowerCase().includes(lowercaseQuery) ||
            form.tag.toLowerCase().includes(lowercaseQuery) ||
            form.game.toLowerCase().includes(lowercaseQuery) ||
            form.tournament.toLowerCase().includes(lowercaseQuery) ||
            form.manager.name.toLowerCase().includes(lowercaseQuery)
        );
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationTeamManagement();
});

export default RegistrationTeamManagement;
