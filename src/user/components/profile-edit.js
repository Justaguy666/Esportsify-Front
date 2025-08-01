// Profile Edit Modal Controller
class ProfileEdit {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.isInitialized = false;
        
        // Bind methods
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🔄 Initializing profile edit modal...');
            
            // Get references to modal elements
            this.modal = document.getElementById('profile-edit-modal');
            
            if (!this.modal) {
                console.error('❌ Profile edit modal not found in DOM');
                return;
            }
            
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ ProfileEdit initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize ProfileEdit:', error);
        }
    }

    setupEventListeners() {
        // Close buttons
        const closeBtn = document.getElementById('close-profile-edit');
        const cancelBtn = document.getElementById('cancel-profile-edit');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', this.hide);
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', this.hide);
        }

        // Save button
        const saveBtn = document.getElementById('save-profile-changes');
        if (saveBtn) {
            saveBtn.addEventListener('click', this.handleSaveChanges);
        }

        // Edit profile button in sidebar
        const editProfileBtn = document.getElementById('edit-profile-btn');
        console.log('🔍 Edit profile button found:', !!editProfileBtn);
        
        if (editProfileBtn) {
            console.log('✅ Adding click listener to edit profile button');
            editProfileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🖱️ Edit profile button clicked!');
                this.show();
            });
        } else {
            console.error('❌ Edit profile button not found in DOM');
        }

        // Profile picture upload
        const changePictureBtn = document.getElementById('change-profile-picture-btn');
        const pictureUpload = document.getElementById('profile-picture-upload');
        
        if (changePictureBtn && pictureUpload) {
            changePictureBtn.addEventListener('click', () => {
                pictureUpload.click();
            });
            
            pictureUpload.addEventListener('change', (e) => {
                this.handleProfilePictureUpload(e);
            });
        }

        // Password toggle buttons
        const toggleCurrentPassword = document.getElementById('toggle-current-password');
        const toggleNewPassword = document.getElementById('toggle-new-password');
        const toggleEditConfirmPassword = document.getElementById('toggle-edit-confirm-password');
        
        if (toggleCurrentPassword) {
            toggleCurrentPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('edit-current-password', toggleCurrentPassword);
            });
        }
        if (toggleNewPassword) {
            toggleNewPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('edit-new-password', toggleNewPassword);
            });
        }
        if (toggleEditConfirmPassword) {
            toggleEditConfirmPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('edit-confirm-password', toggleEditConfirmPassword);
            });
        }

        // Real-time validation
        const newPasswordInput = document.getElementById('edit-new-password');
        const confirmPasswordInput = document.getElementById('edit-confirm-password');
        
        if (newPasswordInput && confirmPasswordInput) {
            const validatePasswords = () => this.validatePasswordMatch();
            newPasswordInput.addEventListener('input', validatePasswords);
            confirmPasswordInput.addEventListener('input', validatePasswords);
        }

        // Modal click to close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hide();
                }
            });
        }
    }

    show() {
        console.log('🔄 ProfileEdit.show() called');
        console.log('🔍 Modal state:', {
            isInitialized: this.isInitialized,
            modalExists: !!this.modal,
            modalDisplay: this.modal?.style.display
        });
        
        if (!this.isInitialized) {
            console.error('❌ ProfileEdit not initialized');
            return;
        }

        if (!this.modal) {
            console.error('❌ Modal element not found');
            return;
        }

        // Load current user data
        this.loadCurrentUserData();
        
        console.log('✅ Setting modal display to flex');
        this.modal.style.display = 'flex';
        
        // Animate in
        setTimeout(() => {
            console.log('✅ Animating modal in');
            this.modal.style.opacity = '1';
            const content = document.getElementById('profile-edit-content');
            if (content) {
                content.style.transform = 'scale(1)';
            }
        }, 10);

        // Clear any existing errors
        this.clearMessages();

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('✅ Profile edit modal shown');
    }

    hide() {
        if (!this.modal) return;

        // Animate out
        this.modal.style.opacity = '0';
        const content = document.getElementById('profile-edit-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
        }

        setTimeout(() => {
            if (this.modal) {
                this.modal.style.display = 'none';
            }
        }, 300);

        // Clear forms and errors
        this.clearMessages();

        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('✅ Profile edit modal hidden');
    }

    loadCurrentUserData() {
        // Get current user data from localStorage or use defaults
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
            username: 'john_doe',
            email: 'johndoe324@gmail.com',
            profilePicture: null
        };

        console.log('📋 Loading current user data:', currentUser);

        // Populate form fields
        const usernameInput = document.getElementById('edit-username');
        const emailInput = document.getElementById('edit-email');
        
        if (usernameInput) usernameInput.value = currentUser.username || 'john_doe';
        if (emailInput) emailInput.value = currentUser.email || 'johndoe324@gmail.com';
        
        // Load profile picture if exists (from localStorage or user data)
        const savedPicture = localStorage.getItem('userProfilePicture') || currentUser.profilePicture;
        if (savedPicture) {
            this.updateProfilePicturePreview(savedPicture);
        }
        
        // Update profile picture initial based on username
        const initial = document.getElementById('profile-picture-initial');
        if (initial) {
            const username = currentUser.username || 'john_doe';
            initial.textContent = username.charAt(0).toUpperCase();
        }
        
        // Clear password fields
        const currentPasswordInput = document.getElementById('edit-current-password');
        const newPasswordInput = document.getElementById('edit-new-password');
        const confirmPasswordInput = document.getElementById('edit-confirm-password');
        
        if (currentPasswordInput) currentPasswordInput.value = '';
        if (newPasswordInput) newPasswordInput.value = '';
        if (confirmPasswordInput) confirmPasswordInput.value = '';
    }

    handleProfilePictureUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please select a valid image file!');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('Image size must be less than 5MB!');
            return;
        }

        console.log('📸 Processing profile picture upload:', file.name);

        // Create FileReader to read the file
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            
            // Update all profile picture locations immediately
            this.updateAllProfilePictures(imageDataUrl);
            
            // Save to localStorage for persistence
            localStorage.setItem('userProfilePicture', imageDataUrl);
            
            console.log('✅ Profile picture updated and saved to all locations');
            this.showSuccess('Profile picture updated successfully!');
        };
        
        reader.onerror = () => {
            this.showError('Failed to process image file!');
        };
        
        reader.readAsDataURL(file);
    }

    updateAllProfilePictures(imageDataUrl = null) {
        const savedPicture = imageDataUrl || localStorage.getItem('userProfilePicture');
        
        // Update modal profile picture preview
        this.updateProfilePicturePreview(savedPicture);
        
        // Update sidebar profile picture
        this.updateSidebarProfilePicture(savedPicture);
        
        // Update header profile picture
        this.updateHeaderProfilePicture(savedPicture);
        
        console.log('🔄 All profile pictures synchronized');
    }

    updateProfilePicturePreview(imageDataUrl) {
        const container = document.getElementById('profile-picture-container');
        const preview = document.getElementById('profile-picture-preview');
        const initial = document.getElementById('profile-picture-initial');
        
        if (preview && initial) {
            if (imageDataUrl) {
                preview.src = imageDataUrl;
                preview.style.display = 'block';
                initial.style.display = 'none';
            } else {
                preview.style.display = 'none';
                initial.style.display = 'flex';
            }
        }
    }

    loadProfilePicture() {
        const savedPicture = localStorage.getItem('userProfilePicture');
        if (savedPicture) {
            this.updateProfilePicturePreview(savedPicture);
        }
    }

    handleSaveChanges() {
        const username = document.getElementById('edit-username')?.value.trim();
        const email = document.getElementById('edit-email')?.value.trim();
        const currentPassword = document.getElementById('edit-current-password')?.value;
        const newPassword = document.getElementById('edit-new-password')?.value;
        const confirmPassword = document.getElementById('edit-confirm-password')?.value;

        console.log('💾 Saving profile changes:', { username, email });

        // Clear previous messages
        this.clearMessages();

        // Validation
        if (!username) {
            this.showError('Please fill in username!');
            return;
        }

        if (username.length < 3) {
            this.showError('Username must be at least 3 characters long!');
            return;
        }

        // Password change validation
        if (newPassword || confirmPassword || currentPassword) {
            if (!currentPassword) {
                this.showError('Please enter your current password to change it!');
                return;
            }

            if (!newPassword) {
                this.showError('Please enter a new password!');
                return;
            }

            if (newPassword.length < 6) {
                this.showError('New password must be at least 6 characters long!');
                return;
            }

            if (newPassword !== confirmPassword) {
                this.showError('New passwords do not match!');
                return;
            }

            // Verify current password (in real app, this would be server-side)
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const storedPassword = this.getStoredPassword(currentUser.email);
            
            if (currentPassword !== storedPassword) {
                this.showError('Current password is incorrect!');
                return;
            }
        }

        // Update user data (email stays the same, profile picture is already saved)
        const updatedUser = {
            username: username,
            email: email,
            profilePicture: localStorage.getItem('userProfilePicture') || null
        };

        // Update localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Update password if changed
        if (newPassword) {
            this.updateStoredPassword(email, newPassword);
        }

        // Update UI elements including profile picture
        this.updateSidebarProfile(updatedUser);

        // Show success message
        this.showSuccess('Profile updated successfully!');
        
        // Close modal after delay
        setTimeout(() => {
            this.hide();
        }, 1500);

        console.log('✅ Profile updated successfully with complete data:', updatedUser);
    }

    getStoredPassword(email) {
        // In a real app, this would be handled server-side
        // For demo, we'll use the auth popup's mock users
        if (window.authPopup && window.authPopup.mockUsers) {
            const user = window.authPopup.mockUsers.find(u => u.email === email);
            return user ? user.password : 'demo123'; // fallback
        }
        return 'demo123'; // fallback for demo
    }

    updateStoredPassword(email, newPassword) {
        // Update password in auth popup's mock users if available
        if (window.authPopup && window.authPopup.mockUsers) {
            const userIndex = window.authPopup.mockUsers.findIndex(u => u.email === email);
            if (userIndex !== -1) {
                window.authPopup.mockUsers[userIndex].password = newPassword;
            }
        }
    }

    updateSidebarProfile(userData) {
        // Update sidebar profile text
        const nameElements = document.querySelectorAll('#sidebar p');
        nameElements.forEach(p => {
            if (p.textContent.includes('@')) {
                // This is the username paragraph
                p.textContent = `@${userData.username}`;
            } else if (p.style.color === 'white') {
                // This is likely the display name
                const displayName = userData.username.charAt(0).toUpperCase() + userData.username.slice(1).replace(/_/g, ' ');
                p.textContent = displayName;
            }
        });

        // Update all profile pictures (sidebar, header, modal)
        this.updateAllProfilePictures();
        
        console.log('✅ Sidebar profile updated with:', userData);
    }

    updateAllProfilePictures() {
        const savedPicture = localStorage.getItem('userProfilePicture');
        
        // Update sidebar profile picture
        this.updateSidebarProfilePicture(savedPicture);
        
        // Update header profile picture
        this.updateHeaderProfilePicture(savedPicture);
        
        // Update modal profile picture preview
        this.updateProfilePicturePreview(savedPicture);
    }

    updateSidebarProfilePicture(imageDataUrl) {
        const sidebarProfileImage = document.querySelector('#sidebar img[alt="User Avatar"]'); // Profile image in sidebar
        
        if (sidebarProfileImage && imageDataUrl) {
            sidebarProfileImage.src = imageDataUrl;
            sidebarProfileImage.style.display = 'block';
            
            // Hide the fallback text
            const fallbackSpan = sidebarProfileImage.nextElementSibling;
            if (fallbackSpan) {
                fallbackSpan.style.display = 'none';
            }
        } else if (sidebarProfileImage) {
            // Reset to default if no image
            sidebarProfileImage.src = '../assets/images/user.png';
        }
    }

    updateHeaderProfilePicture(imageDataUrl) {
        const headerProfileImage = document.getElementById('header-avatar-img');
        
        if (headerProfileImage && imageDataUrl) {
            headerProfileImage.src = imageDataUrl;
            headerProfileImage.style.display = 'block';
            
            // Hide the fallback text
            const fallbackSpan = headerProfileImage.nextElementSibling;
            if (fallbackSpan) {
                fallbackSpan.style.display = 'none';
            }
        } else if (headerProfileImage) {
            // Reset to default if no image
            headerProfileImage.src = '../assets/images/user.png';
        }
    }

    togglePasswordVisibility(inputId, button) {
        const input = document.getElementById(inputId);
        if (!input || !button) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        // Update icon
        const svg = button.querySelector('svg');
        if (svg) {
            if (isPassword) {
                // Show "eye-off" icon when password is visible
                svg.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.343 6.343m7.535 7.535l3.536 3.536"></path>
                `;
            } else {
                // Show "eye" icon when password is hidden
                svg.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                `;
            }
        }
    }

    validatePasswordMatch() {
        const newPassword = document.getElementById('edit-new-password')?.value;
        const confirmPassword = document.getElementById('edit-confirm-password')?.value;

        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                this.showError('New passwords do not match');
                return false;
            } else {
                this.clearMessages();
                return true;
            }
        }
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        const errorElement = document.getElementById('profile-edit-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Hide success message
        const successElement = document.getElementById('profile-edit-success');
        if (successElement) {
            successElement.style.display = 'none';
        }
    }

    showSuccess(message) {
        const successElement = document.getElementById('profile-edit-success');
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
        
        // Hide error message
        const errorElement = document.getElementById('profile-edit-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    clearMessages() {
        const errorElement = document.getElementById('profile-edit-error');
        const successElement = document.getElementById('profile-edit-success');
        
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
        if (successElement) {
            successElement.style.display = 'none';
            successElement.textContent = '';
        }
    }
}

// Create and export global instance
const profileEdit = new ProfileEdit();
window.profileEdit = profileEdit;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing profile system...');
    
    // Load saved user data including profile picture
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const savedPicture = localStorage.getItem('userProfilePicture') || currentUser.profilePicture;
    
    if (savedPicture) {
        console.log('🖼️ Loading saved profile picture on page load');
        
        // Update header avatar
        const headerAvatar = document.getElementById('header-avatar-img');
        if (headerAvatar) {
            headerAvatar.src = savedPicture;
            headerAvatar.style.display = 'block';
            const fallbackSpan = headerAvatar.nextElementSibling;
            if (fallbackSpan) fallbackSpan.style.display = 'none';
        }
        
        // Update sidebar avatar
        const sidebarAvatar = document.querySelector('#sidebar img[alt="User Avatar"]');
        if (sidebarAvatar) {
            sidebarAvatar.src = savedPicture;
            sidebarAvatar.style.display = 'block';
            const fallbackSpan = sidebarAvatar.nextElementSibling;
            if (fallbackSpan) fallbackSpan.style.display = 'none';
        }
        
        console.log('✅ Profile pictures loaded in header and sidebar');
    }
    
    // Update username display if available
    if (currentUser.username) {
        const displayName = currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1).replace(/_/g, ' ');
        
        // Update sidebar name
        const nameElements = document.querySelectorAll('#sidebar p');
        nameElements.forEach(p => {
            if (p.textContent.includes('@')) {
                p.textContent = `@${currentUser.username}`;
            } else if (p.style.color === 'white') {
                p.textContent = displayName;
            }
        });
        
        console.log('✅ User info synchronized:', currentUser.username);
    }
});

// Add debug function for testing
window.testProfileEdit = function() {
    console.log('🧪 Testing profile edit...');
    console.log('🔍 ProfileEdit state:', {
        exists: !!window.profileEdit,
        initialized: window.profileEdit?.isInitialized,
        modal: !!document.getElementById('profile-edit-modal'),
        editBtn: !!document.getElementById('edit-profile-btn')
    });
    
    if (window.profileEdit) {
        window.profileEdit.show();
    } else {
        console.error('❌ ProfileEdit not available');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileEdit;
}
