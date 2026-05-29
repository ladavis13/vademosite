/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: VA.gov site-wide cleanup.
 * Removes non-authorable content (header, footer, modals, banners, tracking).
 * All selectors validated against migration-work/cleaned.html.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove overlays, modals, and widgets that may block parsing
    // Found: <div id="announcement-root"> - site announcement container
    // Found: <div id="modal-crisisline" class="va-overlay va-modal va-modal-large"> - crisis modal
    // Found: <div class="va-crisis-line-container ..."> - crisis line button in header
    // Found: <va-maintenance-banner class="hydrated"> - maintenance banner
    WebImporter.DOMUtils.remove(element, [
      '#announcement-root',
      '#modal-crisisline',
      '.va-crisis-line-container',
      'va-maintenance-banner',
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome
    // Found: <header class="header" id="header-default"> - full site header
    // Found: <footer class="footer"> - full site footer
    // Found: <a class="show-on-focus" href="#content"> - skip to content link
    // Found: <div id="logout-modal-root"> - logout modal container
    // Found: <div id="login-modal-root"> - login modal container
    // Found: <div id="onboarding-modal-root"> - onboarding modal container
    // Found: <div class="above-footer-elements-container"> - Medallia feedback button
    WebImporter.DOMUtils.remove(element, [
      'header#header-default',
      'footer.footer',
      '.show-on-focus',
      '#logout-modal-root',
      '#login-modal-root',
      '#onboarding-modal-root',
      '.above-footer-elements-container',
      'noscript',
      'link',
      'iframe',
    ]);
  }
}
