/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, max-len */
import metadataParser from './parsers/metadata.js';
import tableNoHeader1Parser from './parsers/tableNoHeader1.js';
import columns3Parser from './parsers/columns3.js';
import embed5Parser from './parsers/embed5.js';
import columns8Parser from './parsers/columns8.js';
import columns9Parser from './parsers/columns9.js';
import accordion11Parser from './parsers/accordion11.js';
import cardsNoImages13Parser from './parsers/cardsNoImages13.js';
import accordion14Parser from './parsers/accordion14.js';
import columns15Parser from './parsers/columns15.js';
import columns16Parser from './parsers/columns16.js';
import columns17Parser from './parsers/columns17.js';
import search20Parser from './parsers/search20.js';
import columns21Parser from './parsers/columns21.js';
import search22Parser from './parsers/search22.js';
import tabs23Parser from './parsers/tabs23.js';
import cards24Parser from './parsers/cards24.js';
import carousel30Parser from './parsers/carousel30.js';
import columns31Parser from './parsers/columns31.js';
import columns32Parser from './parsers/columns32.js';
import columns37Parser from './parsers/columns37.js';
import columns41Parser from './parsers/columns41.js';
import columns42Parser from './parsers/columns42.js';
import cards43Parser from './parsers/cards43.js';
import hero45Parser from './parsers/hero45.js';
import cardsNoImages46Parser from './parsers/cardsNoImages46.js';
import quote48Parser from './parsers/quote48.js';
import columns49Parser from './parsers/columns49.js';
import columns50Parser from './parsers/columns50.js';
import columns51Parser from './parsers/columns51.js';
import cards52Parser from './parsers/cards52.js';
import headerParser from './parsers/header.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';
import importRules from './import-rules.js';

const parsers = {
  metadata: metadataParser,
  tableNoHeader1: tableNoHeader1Parser,
  columns3: columns3Parser,
  embed5: embed5Parser,
  columns8: columns8Parser,
  columns9: columns9Parser,
  accordion11: accordion11Parser,
  cardsNoImages13: cardsNoImages13Parser,
  accordion14: accordion14Parser,
  columns15: columns15Parser,
  columns16: columns16Parser,
  columns17: columns17Parser,
  search20: search20Parser,
  columns21: columns21Parser,
  search22: search22Parser,
  tabs23: tabs23Parser,
  cards24: cards24Parser,
  carousel30: carousel30Parser,
  columns31: columns31Parser,
  columns32: columns32Parser,
  columns37: columns37Parser,
  columns41: columns41Parser,
  columns42: columns42Parser,
  cards43: cards43Parser,
  hero45: hero45Parser,
  cardsNoImages46: cardsNoImages46Parser,
  quote48: quote48Parser,
  columns49: columns49Parser,
  columns50: columns50Parser,
  columns51: columns51Parser,
  cards52: cards52Parser,
};

const transformers = {

};

WebImporter.Import = {
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
  findBlockRule: (rules, block) => (
    rules.blocks.find(({ params: { name, cluster } }) => (
      block.name === name && block.cluster === cluster
    ))
  ),
  getBlockParser: ({ type, params: { id } = {} } = {}) => {
    const parserName = id || type;
    return parsers[parserName];
  },
};

/**
 * Page transformation function
 */
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;
  const {
    cleanup: {
      start: removeStart = [],
      end: removeEnd = [],
    },
    blocks = [],
  } = importRules;

  WebImporter.DOMUtils.remove(main, removeStart);

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // transform all blocks using parsers
  blocks.forEach((blockCfg) => {
    const {
      type, selectors = [], params = {},
    } = blockCfg;
    const parserFn = WebImporter.Import.getBlockParser(blockCfg);
    if (!parserFn) return;
    const { instances = [] } = inventoryBlocks.find(({ name, cluster }) => (
      name === params.name && cluster === params.cluster
    )) || {};
    const instancesForUrl = instances.filter((instance) => instance.url === originalURL);
    let elements = params.block ? [] : [main];
    if (instancesForUrl.length > 0) {
      elements = instancesForUrl.map(({ xpath }) => WebImporter.Import.getElementByXPath(document, xpath));
    } else if (selectors.length > 0) {
      elements = selectors.reduce((acc, selector) => [...acc, ...main.querySelectorAll(selector)], []);
    }
    elements = elements.filter((el) => el);
    // process every element on the page for this block
    elements.forEach((element) => {
      // parse the element
      try {
        parserFn.call(this, element, { ...source });
      } catch (e) {
        console.warn(`Failed to parse block: ${type}`, e);
      }
    });
  });

  // perform any additional transformations
  Object.entries(transformers).forEach(([, transformerFn]) => transformerFn.call(this, main, source));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    element.remove();
  });

  WebImporter.DOMUtils.remove(main, removeEnd);
}

/**
 * Fragment transformation function
 */
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;
  const { instances: fragmentInstances = [] } = fragment;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragmentInstances.length / fragmentInstances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragmentInstances[i] || {};
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const { blocks = [] } = inventory || {};
    fragmentInstances
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = blocks.find(
          ({ instances }) => instances
            .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
        );

        if (!fragmentBlock) return;
        const blockRule = WebImporter.Import.findBlockRule(importRules, fragmentBlock);
        const parserFn = WebImporter.Import.getBlockParser(blockRule);
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${blockRule.type} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};

    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory?.fragments?.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
