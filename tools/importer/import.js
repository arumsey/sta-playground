/*
 * Copyright 2024 Adobe. All rights reserved.
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
/* eslint-disable no-console */
import hero6Parser from './parsers/hero6.js';
import hero2Parser from './parsers/hero2.js';
import hero4Parser from './parsers/hero4.js';
import accordion11Parser from './parsers/accordion11.js';
import accordion7Parser from './parsers/accordion7.js';
import hero9Parser from './parsers/hero9.js';
import columns5Parser from './parsers/columns5.js';
import cards15Parser from './parsers/cards15.js';
import columns10Parser from './parsers/columns10.js';
import embedVideo1Parser from './parsers/embedVideo1.js';
import columns3Parser from './parsers/columns3.js';
import columns16Parser from './parsers/columns16.js';
import columns19Parser from './parsers/columns19.js';
import embedVideo20Parser from './parsers/embedVideo20.js';
import columns13Parser from './parsers/columns13.js';
import accordion12Parser from './parsers/accordion12.js';
import columns8Parser from './parsers/columns8.js';
import accordion25Parser from './parsers/accordion25.js';
import columns24Parser from './parsers/columns24.js';
import columns23Parser from './parsers/columns23.js';
import accordion21Parser from './parsers/accordion21.js';
import columns28Parser from './parsers/columns28.js';
import columns27Parser from './parsers/columns27.js';
import columns14Parser from './parsers/columns14.js';
import cards22Parser from './parsers/cards22.js';
import accordion33Parser from './parsers/accordion33.js';
import embedVideo31Parser from './parsers/embedVideo31.js';
import columns34Parser from './parsers/columns34.js';
import tabs30Parser from './parsers/tabs30.js';
import columns32Parser from './parsers/columns32.js';
import accordion36Parser from './parsers/accordion36.js';
import accordion40Parser from './parsers/accordion40.js';
import accordion39Parser from './parsers/accordion39.js';
import accordion38Parser from './parsers/accordion38.js';
import quoteWithAttribution41Parser from './parsers/quoteWithAttribution41.js';
import embedVideo35Parser from './parsers/embedVideo35.js';
import columns42Parser from './parsers/columns42.js';
import columns45Parser from './parsers/columns45.js';
import columns46Parser from './parsers/columns46.js';
import accordion44Parser from './parsers/accordion44.js';
import cards48Parser from './parsers/cards48.js';
import columns37Parser from './parsers/columns37.js';
import cards50Parser from './parsers/cards50.js';
import accordion49Parser from './parsers/accordion49.js';
import columns47Parser from './parsers/columns47.js';
import cardsNoImages51Parser from './parsers/cardsNoImages51.js';
import columns53Parser from './parsers/columns53.js';
import columns54Parser from './parsers/columns54.js';
import accordion55Parser from './parsers/accordion55.js';
import cardsNoImages57Parser from './parsers/cardsNoImages57.js';
import columns43Parser from './parsers/columns43.js';
import columns56Parser from './parsers/columns56.js';
import columns58Parser from './parsers/columns58.js';
import cards52Parser from './parsers/cards52.js';
import columns62Parser from './parsers/columns62.js';
import accordion63Parser from './parsers/accordion63.js';
import cards18Parser from './parsers/cards18.js';
import columns64Parser from './parsers/columns64.js';
import embedVideo66Parser from './parsers/embedVideo66.js';
import accordion26Parser from './parsers/accordion26.js';
import tableStripedBordered17Parser from './parsers/tableStripedBordered17.js';
import accordion61Parser from './parsers/accordion61.js';
import tableStripedBordered59Parser from './parsers/tableStripedBordered59.js';
import columns69Parser from './parsers/columns69.js';
import embedVideo68Parser from './parsers/embedVideo68.js';
import columns67Parser from './parsers/columns67.js';
import cards70Parser from './parsers/cards70.js';
import accordion75Parser from './parsers/accordion75.js';
import accordion71Parser from './parsers/accordion71.js';
import hero76Parser from './parsers/hero76.js';
import columns77Parser from './parsers/columns77.js';
import columns79Parser from './parsers/columns79.js';
import accordion82Parser from './parsers/accordion82.js';
import embedSocial74Parser from './parsers/embedSocial74.js';
import columns29Parser from './parsers/columns29.js';
import columns65Parser from './parsers/columns65.js';
import columns80Parser from './parsers/columns80.js';
import accordion83Parser from './parsers/accordion83.js';
import accordion78Parser from './parsers/accordion78.js';
import hero84Parser from './parsers/hero84.js';
import embedVideo85Parser from './parsers/embedVideo85.js';
import columns86Parser from './parsers/columns86.js';
import hero87Parser from './parsers/hero87.js';
import accordion73Parser from './parsers/accordion73.js';
import accordion81Parser from './parsers/accordion81.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero6: hero6Parser,
  hero2: hero2Parser,
  hero4: hero4Parser,
  accordion11: accordion11Parser,
  accordion7: accordion7Parser,
  hero9: hero9Parser,
  columns5: columns5Parser,
  cards15: cards15Parser,
  columns10: columns10Parser,
  embedVideo1: embedVideo1Parser,
  columns3: columns3Parser,
  columns16: columns16Parser,
  columns19: columns19Parser,
  embedVideo20: embedVideo20Parser,
  columns13: columns13Parser,
  accordion12: accordion12Parser,
  columns8: columns8Parser,
  accordion25: accordion25Parser,
  columns24: columns24Parser,
  columns23: columns23Parser,
  accordion21: accordion21Parser,
  columns28: columns28Parser,
  columns27: columns27Parser,
  columns14: columns14Parser,
  cards22: cards22Parser,
  accordion33: accordion33Parser,
  embedVideo31: embedVideo31Parser,
  columns34: columns34Parser,
  tabs30: tabs30Parser,
  columns32: columns32Parser,
  accordion36: accordion36Parser,
  accordion40: accordion40Parser,
  accordion39: accordion39Parser,
  accordion38: accordion38Parser,
  quoteWithAttribution41: quoteWithAttribution41Parser,
  embedVideo35: embedVideo35Parser,
  columns42: columns42Parser,
  columns45: columns45Parser,
  columns46: columns46Parser,
  accordion44: accordion44Parser,
  cards48: cards48Parser,
  columns37: columns37Parser,
  cards50: cards50Parser,
  accordion49: accordion49Parser,
  columns47: columns47Parser,
  cardsNoImages51: cardsNoImages51Parser,
  columns53: columns53Parser,
  columns54: columns54Parser,
  accordion55: accordion55Parser,
  cardsNoImages57: cardsNoImages57Parser,
  columns43: columns43Parser,
  columns56: columns56Parser,
  columns58: columns58Parser,
  cards52: cards52Parser,
  columns62: columns62Parser,
  accordion63: accordion63Parser,
  cards18: cards18Parser,
  columns64: columns64Parser,
  embedVideo66: embedVideo66Parser,
  accordion26: accordion26Parser,
  tableStripedBordered17: tableStripedBordered17Parser,
  accordion61: accordion61Parser,
  tableStripedBordered59: tableStripedBordered59Parser,
  columns69: columns69Parser,
  embedVideo68: embedVideo68Parser,
  columns67: columns67Parser,
  cards70: cards70Parser,
  accordion75: accordion75Parser,
  accordion71: accordion71Parser,
  hero76: hero76Parser,
  columns77: columns77Parser,
  columns79: columns79Parser,
  accordion82: accordion82Parser,
  embedSocial74: embedSocial74Parser,
  columns29: columns29Parser,
  columns65: columns65Parser,
  columns80: columns80Parser,
  accordion83: accordion83Parser,
  accordion78: accordion78Parser,
  hero84: hero84Parser,
  embedVideo85: embedVideo85Parser,
  columns86: columns86Parser,
  hero87: hero87Parser,
  accordion73: accordion73Parser,
  accordion81: accordion81Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
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
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
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
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
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
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
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
