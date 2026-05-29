/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-promo
 * Base block: columns
 * Source: https://www.va.gov/
 * Description: Promotional two-column layout with image on left and text content
 *   (eyebrow, heading, description, CTA links) on right. Used in dark-styled section.
 * Generated: 2026-05-29
 */
export default function parse(element, { document }) {
  // === LEFT COLUMN: Image ===
  // Selector validated: div.homepage-blog__image > img
  const image = element.querySelector('.homepage-blog__image img, .vads-l-col--12 img');

  // === RIGHT COLUMN: Text content ===
  // Selector validated: second vads-l-col contains text content
  const textContainer = element.querySelector('.medium-screen\\:vads-l-col--8, .vads-l-col--12.medium-screen\\:vads-l-col--8');

  // Eyebrow / label heading (h2 "VA NEWS")
  const eyebrow = element.querySelector('h2');

  // Main heading (h3)
  const heading = element.querySelector('h3');

  // Description paragraph
  const description = element.querySelector('p.vads-u-padding-right--0, p.vads-u-margin-bottom--3');

  // Links - va-link custom elements with href attributes
  const vaLinks = Array.from(element.querySelectorAll('va-link[href]'));

  // Build left column cell (image)
  const leftCell = [];
  if (image) {
    leftCell.push(image);
  }

  // Build right column cell (text + links)
  const rightCell = [];
  if (eyebrow) {
    rightCell.push(eyebrow);
  }
  if (heading) {
    rightCell.push(heading);
  }

  // For the description, handle the inline va-link by converting to an anchor
  if (description) {
    // Convert any va-link inside the paragraph to a standard anchor before adding
    const inlineVaLinks = description.querySelectorAll('va-link[href]');
    inlineVaLinks.forEach((vaLink) => {
      const anchor = document.createElement('a');
      anchor.href = vaLink.getAttribute('href');
      anchor.textContent = vaLink.textContent.trim() || vaLink.getAttribute('text') || 'Read more';
      vaLink.replaceWith(anchor);
    });
    rightCell.push(description);
  }

  // Secondary/standalone links (outside the description paragraph)
  const secondaryLinkContainer = element.querySelector('.vads-u-color--white > div');
  if (secondaryLinkContainer) {
    const secondaryVaLinks = secondaryLinkContainer.querySelectorAll('va-link[href]');
    secondaryVaLinks.forEach((vaLink) => {
      const anchor = document.createElement('a');
      anchor.href = vaLink.getAttribute('href');
      anchor.textContent = vaLink.textContent.trim() || vaLink.getAttribute('text') || 'Visit VA News';
      rightCell.push(anchor);
    });
  }

  // Build cells array: single row with two columns (image | text content)
  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
