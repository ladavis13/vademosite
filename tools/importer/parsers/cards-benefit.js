/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-benefit
 * Base block: cards
 * Source: https://www.va.gov/
 * Description: Benefit category grid with colored icons and descriptions.
 *   Each card has a colored circle icon, linked heading, and description paragraph.
 *   Source structure: .homepage-benefits-row containers with .usa-width-one-third items.
 *   Target: 2-column table - col1 = icon, col2 = heading link + description text.
 * Generated: 2026-05-29
 */
export default function parse(element, { document }) {
  // Each .homepage-benefits-row contains multiple .usa-width-one-third card items
  // The element may be one row or a wrapper containing multiple rows
  const cardItems = Array.from(element.querySelectorAll('.usa-width-one-third'));

  const cells = [];

  cardItems.forEach((card) => {
    // Column 1: Icon element (va-icon with colored background)
    const icon = card.querySelector('va-icon');

    // Column 2: Text content - heading link + description
    const vaLink = card.querySelector('va-link');
    const description = card.querySelector('p');

    const textContent = [];

    // Build the linked heading - va-link has href attribute and text attribute
    if (vaLink) {
      const href = vaLink.getAttribute('href') || '';
      // va-link may store visible text in a 'text' attribute or as textContent
      let linkText = vaLink.getAttribute('text') || vaLink.textContent.trim();
      if (!linkText) {
        // Fallback: derive readable text from href path segment
        try {
          const urlObj = new URL(href, 'https://www.va.gov');
          const path = urlObj.pathname.replace(/^\//, '').replace(/\/$/, '');
          linkText = path ? path.replace(/-/g, ' ') : urlObj.hostname;
        } catch (e) {
          linkText = href.replace(/^https?:\/\//, '').replace(/\/$/, '');
        }
      }
      const link = document.createElement('a');
      link.href = href;
      link.textContent = linkText;
      const heading = document.createElement('h3');
      heading.appendChild(link);
      textContent.push(heading);
    }

    if (description) {
      textContent.push(description);
    }

    // Build the row: [icon cell, text content cell]
    const iconCell = icon ? [icon] : [''];
    cells.push([iconCell, textContent]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-benefit', cells });
  element.replaceWith(block);
}
