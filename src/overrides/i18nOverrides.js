// Override module to inject i18n text into auth pages and status badges via CSS custom properties
import i18n from '../i18n';

// Function to update CSS custom properties based on current language
export const updateI18nStyles = () => {
  const root = document.documentElement;
  
  // Set sign-in heading text
  const signInHeading = i18n.t('auth.signInHeading', "Let's Sign In");
  root.style.setProperty('--auth-sign-in-heading', `"${signInHeading}"`);
  
  // Set reset password heading text
  const resetPasswordHeading = i18n.t('auth.resetPasswordHeading', 'Reset password');
  root.style.setProperty('--auth-reset-password-heading', `"${resetPasswordHeading}"`);
  
  // Set status badge texts
  const enabledText = i18n.t('global.status.enabled', 'Enabled');
  root.style.setProperty('--status-enabled-text', `"${enabledText}"`);
  
  const disabledText = i18n.t('global.status.disabled', 'Disabled');
  root.style.setProperty('--status-disabled-text', `"${disabledText}"`);
};

// Initialize on load
updateI18nStyles();

// Update when language changes
i18n.on('languageChanged', updateI18nStyles);