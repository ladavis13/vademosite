/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-homepage
 * Base block: hero
 * Source: https://www.va.gov/
 * Selector: .homepage-hero__wrapper
 * Generated: 2026-05-29
 *
 * Two-column hero layout:
 *   Left: welcome heading (h1), main heading (h2), description (p), CTA link
 *   Right: white account creation card with text, button, and help link
 *
 * Output structure (two-column table):
 *   Row 1: [left column content] | [right column content]
 */
export default function parse(element, { document }) {
  // --- Left column: text content ---

  // Welcome headline (h1)
  const welcomeHeading = element.querySelector('h1.homepage-hero__welcome-headline, h1');

  // Main heading (h2 in the left column, not in the card)
  const mainHeading = element.querySelector('h2#let-us-help-you-get-started');
  // Fallback: first h2 not inside the card
  const mainHeadingFallback = !mainHeading
    ? element.querySelector('.vads-l-col--12:not(.homepage-hero__container) h2')
    : null;
  const heading = mainHeading || mainHeadingFallback;

  // Description paragraph
  const description = element.querySelector('p#myva-login--hero, p.vads-u-color--white');

  // CTA link action
  const ctaLink = element.querySelector('va-link-action');

  // Build left column content into a container div
  const leftContainer = document.createElement('div');
  if (welcomeHeading) leftContainer.append(welcomeHeading);
  if (heading) leftContainer.append(heading);
  if (description) leftContainer.append(description);
  if (ctaLink) {
    // Convert va-link-action to a standard anchor for import
    const href = ctaLink.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = ctaLink.textContent?.trim() || 'Get started';
      leftContainer.append(link);
    } else {
      leftContainer.append(ctaLink);
    }
  }

  // --- Right column: account card ---
  const cardContainer = element.querySelector('.homepage-hero__create-account');

  const rightContainer = document.createElement('div');

  if (cardContainer) {
    // Card heading/text
    const cardText = cardContainer.querySelector('h2');
    if (cardText) rightContainer.append(cardText);

    // Card button
    const cardButton = cardContainer.querySelector('va-button');
    if (cardButton) {
      // Convert va-button to a standard anchor/strong for import
      const buttonText = cardButton.textContent?.trim() || 'Create account';
      const strong = document.createElement('strong');
      const link = document.createElement('a');
      link.setAttribute('href', '#');
      link.textContent = buttonText;
      strong.append(link);
      rightContainer.append(strong);
    }

    // Card link
    const cardLinkEl = cardContainer.querySelector('va-link');
    if (cardLinkEl) {
      const href = cardLinkEl.getAttribute('href');
      const linkP = document.createElement('p');
      const link = document.createElement('a');
      link.setAttribute('href', href || '/resources/creating-an-account-for-vagov');
      link.textContent = cardLinkEl.textContent?.trim() || 'Learn about creating an account';
      linkP.append(link);
      rightContainer.append(linkP);
    }
  }

  // Build cells: single row with two columns [left | right]
  const cells = [
    [leftContainer, rightContainer],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
