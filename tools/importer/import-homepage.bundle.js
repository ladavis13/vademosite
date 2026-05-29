/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    var _a, _b, _c;
    const welcomeHeading = element.querySelector("h1.homepage-hero__welcome-headline, h1");
    const mainHeading = element.querySelector("h2#let-us-help-you-get-started");
    const mainHeadingFallback = !mainHeading ? element.querySelector(".vads-l-col--12:not(.homepage-hero__container) h2") : null;
    const heading = mainHeading || mainHeadingFallback;
    const description = element.querySelector("p#myva-login--hero, p.vads-u-color--white");
    const ctaLink = element.querySelector("va-link-action");
    const leftContainer = document.createElement("div");
    if (welcomeHeading) leftContainer.append(welcomeHeading);
    if (heading) leftContainer.append(heading);
    if (description) leftContainer.append(description);
    if (ctaLink) {
      const href = ctaLink.getAttribute("href");
      if (href) {
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = ((_a = ctaLink.textContent) == null ? void 0 : _a.trim()) || "Get started";
        leftContainer.append(link);
      } else {
        leftContainer.append(ctaLink);
      }
    }
    const cardContainer = element.querySelector(".homepage-hero__create-account");
    const rightContainer = document.createElement("div");
    if (cardContainer) {
      const cardText = cardContainer.querySelector("h2");
      if (cardText) rightContainer.append(cardText);
      const cardButton = cardContainer.querySelector("va-button");
      if (cardButton) {
        const buttonText = ((_b = cardButton.textContent) == null ? void 0 : _b.trim()) || "Create account";
        const strong = document.createElement("strong");
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        link.textContent = buttonText;
        strong.append(link);
        rightContainer.append(strong);
      }
      const cardLinkEl = cardContainer.querySelector("va-link");
      if (cardLinkEl) {
        const href = cardLinkEl.getAttribute("href");
        const linkP = document.createElement("p");
        const link = document.createElement("a");
        link.setAttribute("href", href || "/resources/creating-an-account-for-vagov");
        link.textContent = ((_c = cardLinkEl.textContent) == null ? void 0 : _c.trim()) || "Learn about creating an account";
        linkP.append(link);
        rightContainer.append(linkP);
      }
    }
    const cells = [
      [leftContainer, rightContainer]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-search.js
  function parse2(element, { document }) {
    const leftColContainer = element.querySelector(".vads-l-col--12.medium-screen\\:vads-l-col--6.vads-u-background-color--white, .vads-l-row > div:first-child");
    const leftContent = [];
    const searchHeading = element.querySelector("#search-tools-header, h2:first-of-type");
    if (searchHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = searchHeading.textContent.trim();
      leftContent.push(h2);
    }
    const searchInput = element.querySelector("va-search-input");
    if (searchInput) {
      const searchPlaceholder = document.createElement("p");
      searchPlaceholder.textContent = "[Search VA.gov]";
      leftContent.push(searchPlaceholder);
    }
    const otherSearchHeading = element.querySelector("#other-search-tools, h3");
    if (otherSearchHeading) {
      const h3 = document.createElement("h3");
      h3.textContent = otherSearchHeading.textContent.trim();
      leftContent.push(h3);
    }
    const searchToolsList = element.querySelector(".homepage-common-tasks__search-tools ul, .homepage-common-tasks__search-tools");
    if (searchToolsList) {
      const actionLinks = searchToolsList.querySelectorAll("va-link-action");
      const ul = document.createElement("ul");
      actionLinks.forEach((vaLink) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = vaLink.getAttribute("href") || "";
        a.textContent = vaLink.getAttribute("text") || vaLink.textContent.trim() || a.href;
        li.appendChild(a);
        ul.appendChild(li);
      });
      if (ul.children.length > 0) {
        leftContent.push(ul);
      }
    }
    const rightContent = [];
    const topPagesHeading = element.querySelector("#top-pages, .vads-l-row > div:last-child h2");
    if (topPagesHeading) {
      const h2 = document.createElement("h2");
      h2.textContent = topPagesHeading.textContent.trim();
      rightContent.push(h2);
    }
    const topPagesList = element.querySelector(".homepage-common-tasks__list");
    if (topPagesList) {
      const pageLinks = topPagesList.querySelectorAll("va-link");
      const ul = document.createElement("ul");
      pageLinks.forEach((vaLink) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = vaLink.getAttribute("href") || "";
        a.textContent = vaLink.getAttribute("text") || vaLink.textContent.trim() || a.href;
        li.appendChild(a);
        ul.appendChild(li);
      });
      if (ul.children.length > 0) {
        rightContent.push(ul);
      }
    }
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-search", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse3(element, { document }) {
    const image = element.querySelector(".homepage-blog__image img, .vads-l-col--12 img");
    const textContainer = element.querySelector(".medium-screen\\:vads-l-col--8, .vads-l-col--12.medium-screen\\:vads-l-col--8");
    const eyebrow = element.querySelector("h2");
    const heading = element.querySelector("h3");
    const description = element.querySelector("p.vads-u-padding-right--0, p.vads-u-margin-bottom--3");
    const vaLinks = Array.from(element.querySelectorAll("va-link[href]"));
    const leftCell = [];
    if (image) {
      leftCell.push(image);
    }
    const rightCell = [];
    if (eyebrow) {
      rightCell.push(eyebrow);
    }
    if (heading) {
      rightCell.push(heading);
    }
    if (description) {
      const inlineVaLinks = description.querySelectorAll("va-link[href]");
      inlineVaLinks.forEach((vaLink) => {
        const anchor = document.createElement("a");
        anchor.href = vaLink.getAttribute("href");
        anchor.textContent = vaLink.textContent.trim() || vaLink.getAttribute("text") || "Read more";
        vaLink.replaceWith(anchor);
      });
      rightCell.push(description);
    }
    const secondaryLinkContainer = element.querySelector(".vads-u-color--white > div");
    if (secondaryLinkContainer) {
      const secondaryVaLinks = secondaryLinkContainer.querySelectorAll("va-link[href]");
      secondaryVaLinks.forEach((vaLink) => {
        const anchor = document.createElement("a");
        anchor.href = vaLink.getAttribute("href");
        anchor.textContent = vaLink.textContent.trim() || vaLink.getAttribute("text") || "Visit VA News";
        rightCell.push(anchor);
      });
    }
    const cells = [
      [leftCell, rightCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-benefit.js
  function parse4(element, { document }) {
    const cardItems = Array.from(element.querySelectorAll(".usa-width-one-third"));
    const cells = [];
    cardItems.forEach((card) => {
      const icon = card.querySelector("va-icon");
      const vaLink = card.querySelector("va-link");
      const description = card.querySelector("p");
      const textContent = [];
      if (vaLink) {
        const href = vaLink.getAttribute("href") || "";
        let linkText = vaLink.getAttribute("text") || vaLink.textContent.trim();
        if (!linkText) {
          try {
            const urlObj = new URL(href, "https://www.va.gov");
            const path = urlObj.pathname.replace(/^\//, "").replace(/\/$/, "");
            linkText = path ? path.replace(/-/g, " ") : urlObj.hostname;
          } catch (e) {
            linkText = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
          }
        }
        const link = document.createElement("a");
        link.href = href;
        link.textContent = linkText;
        const heading = document.createElement("h3");
        heading.appendChild(link);
        textContent.push(heading);
      }
      if (description) {
        textContent.push(description);
      }
      const iconCell = icon ? [icon] : [""];
      cells.push([iconCell, textContent]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-benefit", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/vagov-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#announcement-root",
        "#modal-crisisline",
        ".va-crisis-line-container",
        "va-maintenance-banner"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header#header-default",
        "footer.footer",
        ".show-on-focus",
        "#logout-modal-root",
        "#login-modal-root",
        "#onboarding-modal-root",
        ".above-footer-elements-container",
        "noscript",
        "link",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/vagov-sections.js
  var H2 = { after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadata);
          }
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "columns-search": parse2,
    "columns-promo": parse3,
    "cards-benefit": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "VA.gov homepage with hero banner, benefit hubs, news, and resources",
    urls: ["https://www.va.gov/"],
    blocks: [
      {
        name: "hero-homepage",
        instances: [".homepage-hero__wrapper"]
      },
      {
        name: "columns-search",
        instances: [".homepage-common-tasks"]
      },
      {
        name: "columns-promo",
        instances: [".homepage-blog"]
      },
      {
        name: "cards-benefit",
        instances: [".homepage-benefits-row"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".homepage-hero__wrapper",
        style: null,
        blocks: ["hero-homepage"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Search and Top Pages",
        selector: ".homepage-common-tasks",
        style: null,
        blocks: ["columns-search"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "VA News / Blog Promo",
        selector: ".vads-u-background-color--primary-dark",
        style: "dark",
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Explore VA Benefits",
        selector: ["section.vads-u-padding--2p5", ".homepage-benefits-row"],
        style: null,
        blocks: ["cards-benefit"],
        defaultContent: ["h2#explore-va-benefits-and-health"]
      },
      {
        id: "section-5",
        name: "Email Signup and Veterans Banner",
        selector: ".homepage-email-update-wrapper",
        style: "light-blue",
        blocks: [],
        defaultContent: ["#email-signup-form", "#vets-banner-1"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
