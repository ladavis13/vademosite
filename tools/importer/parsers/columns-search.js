/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-search
 * Base block: columns
 * Source: https://www.va.gov/
 * Selector: .homepage-common-tasks
 * Description: Two-column layout with search tools on left, top pages links on right
 * Generated: 2026-05-29
 */
export default function parse(element, { document }) {
  // --- Left Column: Search + Other search tools ---
  const leftColContainer = element.querySelector('.vads-l-col--12.medium-screen\\:vads-l-col--6.vads-u-background-color--white, .vads-l-row > div:first-child');
  const leftContent = [];

  // Search heading
  const searchHeading = element.querySelector('#search-tools-header, h2:first-of-type');
  if (searchHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = searchHeading.textContent.trim();
    leftContent.push(h2);
  }

  // Search input - represent as a placeholder paragraph since va-search-input is a web component
  const searchInput = element.querySelector('va-search-input');
  if (searchInput) {
    const searchPlaceholder = document.createElement('p');
    searchPlaceholder.textContent = '[Search VA.gov]';
    leftContent.push(searchPlaceholder);
  }

  // "Other search tools" subheading
  const otherSearchHeading = element.querySelector('#other-search-tools, h3');
  if (otherSearchHeading) {
    const h3 = document.createElement('h3');
    h3.textContent = otherSearchHeading.textContent.trim();
    leftContent.push(h3);
  }

  // Action links from the search tools list
  const searchToolsList = element.querySelector('.homepage-common-tasks__search-tools ul, .homepage-common-tasks__search-tools');
  if (searchToolsList) {
    const actionLinks = searchToolsList.querySelectorAll('va-link-action');
    const ul = document.createElement('ul');
    actionLinks.forEach((vaLink) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = vaLink.getAttribute('href') || '';
      // Try to get text from the component or its text attribute
      a.textContent = vaLink.getAttribute('text') || vaLink.textContent.trim() || a.href;
      li.appendChild(a);
      ul.appendChild(li);
    });
    if (ul.children.length > 0) {
      leftContent.push(ul);
    }
  }

  // --- Right Column: Top pages ---
  const rightContent = [];

  // Top pages heading
  const topPagesHeading = element.querySelector('#top-pages, .vads-l-row > div:last-child h2');
  if (topPagesHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = topPagesHeading.textContent.trim();
    rightContent.push(h2);
  }

  // Top pages link list
  const topPagesList = element.querySelector('.homepage-common-tasks__list');
  if (topPagesList) {
    const pageLinks = topPagesList.querySelectorAll('va-link');
    const ul = document.createElement('ul');
    pageLinks.forEach((vaLink) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = vaLink.getAttribute('href') || '';
      a.textContent = vaLink.getAttribute('text') || vaLink.textContent.trim() || a.href;
      li.appendChild(a);
      ul.appendChild(li);
    });
    if (ul.children.length > 0) {
      rightContent.push(ul);
    }
  }

  // Build cells: one row with two columns
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-search', cells });
  element.replaceWith(block);
}
