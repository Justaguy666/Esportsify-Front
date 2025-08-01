// Authentication Popup Controller
class AuthPopup {
    constructor() {
        this.popup = null;
        this.overlay = null;
        this.isInitialized = false;
        this.currentTab = 'login';
        
        // Mock database for demonstration
        this.mockUsers = [
            { email: 'admin@esportsify.com', username: 'admin', password: 'admin123' },
            { email: 'user@test.com', username: 'testuser', password: 'password123' },
            { email: 'demo@demo.com', username: 'demouser', password: 'demo2024' }
        ];
        
        // Store for verification codes (in real app, this would be server-side)
        this.verificationCodes = {};
        
        // Bind methods
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);
        this.switchToRegister = this.switchToRegister.bind(this);
        this.switchToForgotPassword = this.switchToForgotPassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleSendCode = this.handleSendCode.bind(this);
        this.handleVerifyCode = this.handleVerifyCode.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🔄 Initializing auth popup...');
            
            // Get references to existing elements (now embedded in index.html)
            this.popup = document.getElementById('auth-popup');
            this.overlay = document.getElementById('overlay');
            
            if (!this.popup) {
                console.error('❌ Auth popup not found in DOM');
                return;
            }
            
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ AuthPopup initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize AuthPopup:', error);
        }
    }

    setupEventListeners() {
        // Close button
        const closeBtn = document.getElementById('close-auth-popup');
        if (closeBtn) {
            closeBtn.addEventListener('click', this.hide);
        }

        // Tab switching
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const forgotTab = document.getElementById('forgot-tab');
        const forgotPasswordLink = document.getElementById('forgot-password-link');

        if (loginTab) {
            loginTab.addEventListener('click', this.switchToLogin);
        }
        if (registerTab) {
            registerTab.addEventListener('click', this.switchToRegister);
        }
        if (forgotTab) {
            forgotTab.addEventListener('click', this.switchToForgotPassword);
        }
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToForgotPassword();
            });
        }

        // Form submissions
        const signInBtn = document.getElementById('sign-in-btn');
        const createAccountBtn = document.getElementById('create-account-btn');
        const sendCodeBtn = document.getElementById('send-code-btn');
        const verifyCodeBtn = document.getElementById('verify-code-btn');
        const resendCodeBtn = document.getElementById('resend-code-btn');
        const backToLoginBtn = document.getElementById('back-to-login-btn');
        const backToLoginFromEmailBtn = document.getElementById('back-to-login-from-email');
        const backToLoginFromVerificationBtn = document.getElementById('back-to-login-from-verification');
        const copyPasswordBtn = document.getElementById('copy-password-btn');
        
        if (signInBtn) {
            signInBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSignIn();
            });
        }
        if (createAccountBtn) {
            createAccountBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCreateAccount();
            });
        }
        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSendCode();
            });
        }
        if (verifyCodeBtn) {
            verifyCodeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleVerifyCode();
            });
        }
        if (resendCodeBtn) {
            resendCodeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSendCode();
            });
        }
        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToLogin();
            });
        }
        if (backToLoginFromEmailBtn) {
            backToLoginFromEmailBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToLogin();
            });
        }
        if (backToLoginFromVerificationBtn) {
            backToLoginFromVerificationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToLogin();
            });
        }
        if (copyPasswordBtn) {
            copyPasswordBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyPassword();
            });
        }

        // Password toggle
        const togglePassword = document.getElementById('toggle-password');
        const toggleRegisterPassword = document.getElementById('toggle-register-password');
        const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
        
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                this.togglePasswordVisibility('login-password', togglePassword);
            });
        }
        if (toggleRegisterPassword) {
            toggleRegisterPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('register-password', toggleRegisterPassword);
            });
        }
        if (toggleConfirmPassword) {
            toggleConfirmPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('confirm-password', toggleConfirmPassword);
            });
        }

        // Real-time validation
        const registerPasswordInput = document.getElementById('register-password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const registerEmailInput = document.getElementById('register-email');
        const registerUsernameInput = document.getElementById('register-username');
        const loginEmailInput = document.getElementById('login-email');
        const verificationCodeInput = document.getElementById('verification-code');
        
        if (registerPasswordInput && confirmPasswordInput) {
            const validatePasswords = () => this.validatePasswordMatch();
            registerPasswordInput.addEventListener('input', validatePasswords);
            confirmPasswordInput.addEventListener('input', validatePasswords);
        }

        if (registerEmailInput) {
            registerEmailInput.addEventListener('blur', () => this.validateEmail('register-email'));
        }

        if (registerUsernameInput) {
            registerUsernameInput.addEventListener('blur', () => this.validateUsername());
        }

        if (loginEmailInput) {
            loginEmailInput.addEventListener('blur', () => this.validateEmail('login-email'));
        }

        if (verificationCodeInput) {
            verificationCodeInput.addEventListener('input', () => this.validateVerificationCode());
        }

        // Overlay click to close
        if (this.popup) {
            this.popup.addEventListener('click', (e) => {
                if (e.target === this.popup) {
                    this.hide();
                }
            });
        }
    }

    show(tab = 'login') {
        if (!this.isInitialized) {
            console.error('❌ AuthPopup not initialized');
            return;
        }

        this.currentTab = tab;
        
        if (this.overlay) {
            this.overlay.style.display = 'block';
        }
        
        if (this.popup) {
            this.popup.style.display = 'flex';
            
            // Animate in
            setTimeout(() => {
                this.popup.style.opacity = '1';
                const content = document.getElementById('auth-popup-content');
                if (content) {
                    content.style.transform = 'scale(1)';
                }
            }, 10);
        }

        // Switch to the correct tab
        if (tab === 'register') {
            this.switchToRegister();
        } else if (tab === 'forgot-password') {
            this.switchToForgotPassword();
        } else {
            this.switchToLogin();
        }

        // Clear any existing errors
        this.clearErrors();

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log(`✅ Auth popup shown (${tab} tab)`);
    }

    hide() {
        if (!this.popup) return;

        // Animate out
        this.popup.style.opacity = '0';
        const content = document.getElementById('auth-popup-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
        }

        setTimeout(() => {
            if (this.popup) {
                this.popup.style.display = 'none';
            }
            if (this.overlay) {
                this.overlay.style.display = 'none';
            }
        }, 300);

        // Clear forms and errors
        this.clearForms();
        this.clearErrors();

        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('✅ Auth popup hidden');
    }

    switchToLogin() {
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const forgotTab = document.getElementById('forgot-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const forgotForm = document.getElementById('forgot-password-form');
        const tabUnderline = document.getElementById('tab-underline');

        if (loginTab && registerTab && loginForm && registerForm && tabUnderline) {
            // Update tab styles
            loginTab.style.color = '#5b5ff7';
            registerTab.style.color = '#9CA3AF';
            if (forgotTab) forgotTab.style.color = '#9CA3AF';

            // Show/hide tabs
            loginTab.style.display = 'block';
            registerTab.style.display = 'block';
            if (forgotTab) forgotTab.style.display = 'none';

            // Move underline to login tab
            tabUnderline.style.left = '0';
            tabUnderline.style.width = '50%';

            // Show/hide forms
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            if (forgotForm) forgotForm.style.display = 'none';

            this.currentTab = 'login';
            this.clearErrors();
            console.log('Switched to login tab');
        }
    }

    switchToRegister() {
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const forgotTab = document.getElementById('forgot-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const forgotForm = document.getElementById('forgot-password-form');
        const tabUnderline = document.getElementById('tab-underline');

        if (loginTab && registerTab && loginForm && registerForm && tabUnderline) {
            // Update tab styles
            loginTab.style.color = '#9CA3AF';
            registerTab.style.color = '#5b5ff7';
            if (forgotTab) forgotTab.style.color = '#9CA3AF';

            // Show/hide tabs
            loginTab.style.display = 'block';
            registerTab.style.display = 'block';
            if (forgotTab) forgotTab.style.display = 'none';

            // Move underline to register tab
            tabUnderline.style.left = '50%';
            tabUnderline.style.width = '50%';

            // Show/hide forms
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            if (forgotForm) forgotForm.style.display = 'none';

            this.currentTab = 'register';
            this.clearErrors();
            console.log('Switched to register tab');
        }
    }

    switchToForgotPassword() {
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const forgotTab = document.getElementById('forgot-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const forgotForm = document.getElementById('forgot-password-form');
        const tabUnderline = document.getElementById('tab-underline');

        if (forgotTab && forgotForm && tabUnderline) {
            // Update tab styles
            if (loginTab) loginTab.style.color = '#9CA3AF';
            if (registerTab) registerTab.style.color = '#9CA3AF';
            forgotTab.style.color = '#5b5ff7';

            // Show forgot tab, hide others
            if (loginTab) loginTab.style.display = 'none';
            if (registerTab) registerTab.style.display = 'none';
            forgotTab.style.display = 'block';

            // Full width underline for forgot password
            tabUnderline.style.left = '0';
            tabUnderline.style.width = '100%';

            // Show/hide forms
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'none';
            forgotForm.style.display = 'block';

            // Reset forgot password form to step 1
            this.resetForgotPasswordForm();

            this.currentTab = 'forgot-password';
            this.clearErrors();
        }
    }

    handleSignIn() {
        const email = document.getElementById('login-email')?.value.trim();
        const password = document.getElementById('login-password')?.value;

        console.log('🔐 Sign in attempt:', { email, password: '***' });

        // Clear previous errors
        this.clearError('login-error');

        // Validation
        if (!email || !password) {
            this.showError('login-error', 'Please fill in all fields!');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('login-error', 'Please enter a valid email address!');
            return;
        }

        // Check credentials against mock database
        const user = this.mockUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            this.showError('login-error', 'Invalid email or password. Please try again.');
            return;
        }

        // Successful login
        localStorage.setItem('userToken', 'demo-token-' + Date.now());
        localStorage.setItem('isGuest', 'false');
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            username: user.username
        }));
        
        // Hide popup and update UI
        this.hide();
        
        // Trigger UI update if function exists
        if (typeof updateUIForUserState === 'function') {
            updateUIForUserState(true);
        }
        
        alert(`Welcome back, ${user.username}!`);
        console.log('✅ Login successful');
    }

    handleCreateAccount() {
        const email = document.getElementById('register-email')?.value.trim();
        const username = document.getElementById('register-username')?.value.trim();
        const password = document.getElementById('register-password')?.value;
        const confirmPassword = document.getElementById('confirm-password')?.value;

        console.log('👤 Register attempt:', { email, username, password: '***' });

        // Clear previous errors
        this.clearError('register-error');

        // Validation
        if (!email || !username || !password || !confirmPassword) {
            this.showError('register-error', 'Please fill in all fields!');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('register-error', 'Please enter a valid email address!');
            return;
        }

        if (username.length < 3) {
            this.showError('register-error', 'Username must be at least 3 characters long!');
            return;
        }

        if (password.length < 6) {
            this.showError('register-error', 'Password must be at least 6 characters long!');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('register-error', 'Passwords do not match!');
            return;
        }

        // Check if email already exists
        const existingUser = this.mockUsers.find(u => u.email === email);
        if (existingUser) {
            this.showError('register-error', 'An account with this email already exists!');
            return;
        }

        // Check if username already exists
        const existingUsername = this.mockUsers.find(u => u.username === username);
        if (existingUsername) {
            this.showError('register-error', 'This username is already taken!');
            return;
        }

        // Add new user to mock database
        this.mockUsers.push({ email, username, password });

        // Successful registration
        localStorage.setItem('userToken', 'demo-token-' + Date.now());
        localStorage.setItem('isGuest', 'false');
        localStorage.setItem('currentUser', JSON.stringify({ email, username }));
        
        // Hide popup and update UI
        this.hide();
        
        // Trigger UI update if function exists
        if (typeof updateUIForUserState === 'function') {
            updateUIForUserState(true);
        }
        
        alert(`Account created successfully! Welcome, ${username}!`);
        console.log('✅ Registration successful');
    }

    handleSendCode() {
        const email = document.getElementById('forgot-email')?.value.trim();

        console.log('📧 Sending verification code to:', email);

        // Clear previous errors
        this.clearError('forgot-error');
        this.clearError('forgot-success');

        // Validation
        if (!email) {
            this.showError('forgot-error', 'Please enter your email address!');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('forgot-error', 'Please enter a valid email address!');
            return;
        }

        // Check if email exists in database
        const user = this.mockUsers.find(u => u.email === email);
        if (!user) {
            this.showError('forgot-error', 'No account found with this email address!');
            return;
        }

        // Generate verification code (6 digits)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        this.verificationCodes[email] = {
            code: verificationCode,
            password: user.password,
            timestamp: Date.now()
        };

        // Show success and move to verification step
        this.showSuccess('forgot-success', `Verification code sent to ${email}! (Code: ${verificationCode})`);
        
        setTimeout(() => {
            this.showVerificationStep();
        }, 2000);

        console.log('✅ Verification code generated:', verificationCode);
    }

    handleVerifyCode() {
        const email = document.getElementById('forgot-email')?.value.trim();
        const enteredCode = document.getElementById('verification-code')?.value.trim();

        console.log('🔍 Verifying code:', { email, code: enteredCode });

        // Clear previous errors
        this.clearError('forgot-error');

        // Validation
        if (!enteredCode) {
            this.showError('forgot-error', 'Please enter the verification code!');
            return;
        }

        if (enteredCode.length !== 6) {
            this.showError('forgot-error', 'Verification code must be 6 digits!');
            return;
        }

        // Check verification code
        const storedData = this.verificationCodes[email];
        if (!storedData) {
            this.showError('forgot-error', 'Verification session expired. Please request a new code.');
            return;
        }

        // Check if code expired (5 minutes)
        if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
            this.showError('forgot-error', 'Verification code expired. Please request a new one.');
            delete this.verificationCodes[email];
            return;
        }

        if (enteredCode !== storedData.code) {
            this.showError('forgot-error', 'Invalid verification code. Please try again.');
            return;
        }

        // Code is correct - show password
        this.showPasswordRevealStep(storedData.password);
        delete this.verificationCodes[email]; // Clean up

        console.log('✅ Verification successful');
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
        const password = document.getElementById('register-password')?.value;
        const confirmPassword = document.getElementById('confirm-password')?.value;
        const errorElement = document.getElementById('password-match-error');

        if (errorElement && password && confirmPassword) {
            if (password !== confirmPassword) {
                errorElement.style.display = 'block';
                errorElement.textContent = 'Passwords do not match';
                return false;
            } else {
                errorElement.style.display = 'none';
                return true;
            }
        }
        return true;
    }

    validateEmail(inputId) {
        const email = document.getElementById(inputId)?.value.trim();
        return this.isValidEmail(email);
    }

    validateUsername() {
        const username = document.getElementById('register-username')?.value.trim();
        return username && username.length >= 3;
    }

    validateVerificationCode() {
        const code = document.getElementById('verification-code')?.value.trim();
        return code && code.length === 6 && /^\d{6}$/.test(code);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    showSuccess(elementId, message) {
        const successElement = document.getElementById(elementId);
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
    }

    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }

    clearErrors() {
        const errorIds = ['login-error', 'register-error', 'forgot-error', 'forgot-success', 'password-match-error'];
        errorIds.forEach(id => this.clearError(id));
    }

    clearForms() {
        // Clear login form
        const loginEmail = document.getElementById('login-email');
        const loginPassword = document.getElementById('login-password');
        if (loginEmail) loginEmail.value = '';
        if (loginPassword) loginPassword.value = '';

        // Clear register form
        const registerEmail = document.getElementById('register-email');
        const registerUsername = document.getElementById('register-username');
        const registerPassword = document.getElementById('register-password');
        const confirmPassword = document.getElementById('confirm-password');
        if (registerEmail) registerEmail.value = '';
        if (registerUsername) registerUsername.value = '';
        if (registerPassword) registerPassword.value = '';
        if (confirmPassword) confirmPassword.value = '';

        // Clear forgot password form
        const forgotEmail = document.getElementById('forgot-email');
        const verificationCode = document.getElementById('verification-code');
        const revealedPassword = document.getElementById('revealed-password');
        if (forgotEmail) forgotEmail.value = '';
        if (verificationCode) verificationCode.value = '';
        if (revealedPassword) revealedPassword.value = '';
    }

    resetForgotPasswordForm() {
        // Show email step, hide others
        const emailStep = document.getElementById('email-step');
        const verificationStep = document.getElementById('verification-step');
        const passwordRevealedStep = document.getElementById('password-revealed-step');

        if (emailStep) emailStep.style.display = 'block';
        if (verificationStep) verificationStep.style.display = 'none';
        if (passwordRevealedStep) passwordRevealedStep.style.display = 'none';

        // Clear form fields
        const forgotEmail = document.getElementById('forgot-email');
        const verificationCode = document.getElementById('verification-code');
        const revealedPassword = document.getElementById('revealed-password');
        if (forgotEmail) forgotEmail.value = '';
        if (verificationCode) verificationCode.value = '';
        if (revealedPassword) revealedPassword.value = '';
    }

    showVerificationStep() {
        const emailStep = document.getElementById('email-step');
        const verificationStep = document.getElementById('verification-step');

        if (emailStep) emailStep.style.display = 'none';
        if (verificationStep) verificationStep.style.display = 'block';

        // Focus on verification code input
        const verificationCodeInput = document.getElementById('verification-code');
        if (verificationCodeInput) {
            verificationCodeInput.focus();
        }
    }

    showPasswordRevealStep(password) {
        const verificationStep = document.getElementById('verification-step');
        const passwordRevealedStep = document.getElementById('password-revealed-step');
        const revealedPasswordInput = document.getElementById('revealed-password');

        if (verificationStep) verificationStep.style.display = 'none';
        if (passwordRevealedStep) passwordRevealedStep.style.display = 'block';
        if (revealedPasswordInput) revealedPasswordInput.value = password;
    }

    copyPassword() {
        const revealedPasswordInput = document.getElementById('revealed-password');
        if (revealedPasswordInput) {
            revealedPasswordInput.select();
            revealedPasswordInput.setSelectionRange(0, 99999); // For mobile devices

            try {
                document.execCommand('copy');
                alert('Password copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy password:', err);
                alert('Failed to copy password. Please copy manually.');
            }
        }
    }
}

// Create and export global instance
const authPopup = new AuthPopup();
window.authPopup = authPopup;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthPopup;
}
