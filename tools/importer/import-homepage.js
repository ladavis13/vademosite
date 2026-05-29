/* eslint-disable */
/* global WebImporter */

import heroHomepageParser from './parsers/hero-homepage.js';
import columnsSearchParser from './parsers/columns-search.js';
import columnsPromoParser from './parsers/columns-promo.js';
import cardsBenefitParser from './parsers/cards-benefit.js';

import vagovCleanupTransformer from './transformers/vagov-cleanup.js';
import vagovSectionsTransformer from './transformers/vagov-sections.js';

const parsers = {
  'hero-homepage': heroHomepageParser,
  'columns-search': columnsSearchParser,
  'columns-promo': columnsPromoParser,
  'cards-benefit': cardsBenefitParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'VA.gov homepage with hero banner, benefit hubs, news, and resources',
  urls: ['https://www.va.gov/'],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['.homepage-hero__wrapper'],
    },
    {
      name: 'columns-search',
      instances: ['.homepage-common-tasks'],
    },
    {
      name: 'columns-promo',
      instances: ['.homepage-blog'],
    },
    {
      name: 'cards-benefit',
      instances: ['.homepage-benefits-row'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.homepage-hero__wrapper',
      style: null,
      blocks: ['hero-homepage'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Search and Top Pages',
      selector: '.homepage-common-tasks',
      style: null,
      blocks: ['columns-search'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'VA News / Blog Promo',
      selector: '.vads-u-background-color--primary-dark',
      style: 'dark',
      blocks: ['columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Explore VA Benefits',
      selector: ['section.vads-u-padding--2p5', '.homepage-benefits-row'],
      style: null,
      blocks: ['cards-benefit'],
      defaultContent: ['h2#explore-va-benefits-and-health'],
    },
    {
      id: 'section-5',
      name: 'Email Signup and Veterans Banner',
      selector: '.homepage-email-update-wrapper',
      style: 'light-blue',
      blocks: [],
      defaultContent: ['#email-signup-form', '#vets-banner-1'],
    },
  ],
};

const transformers = [
  vagovCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [vagovSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
