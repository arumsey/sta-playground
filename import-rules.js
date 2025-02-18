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

/* eslint-disable comma-dangle */

/**
 * The import rules object defines elements that can be removed (cleanup) from the source
 * document and elements that should be transformed into blocks.
 */
const importRules = {
  root: 'main#site-content',
  cleanup: {
    start: [
      'style',
      'source',
      'script',
      'noscript',
      'iframe',
      'link'
    ],
    end: []
  },
  blocks: [
    {
      type: 'metadata',
      insertMode: 'append'
    },
    {
      type: 'aidefaultContent',
      selectors: [
        'footer > div.container-fluid',
        'footer > div.row.terms',
        'main > article > .HeaderBox',
        'main > article > .container.post-inner',
        'main > article > .container.post-inner .fl-builder-content',
        'main > article > .container.post-inner .fl-builder-content .fl-col-group',
        'main > article > .container.post-inner .fl-builder-content .fl-col-group .fl-col'
      ]
    },
    {
      type: 'aiheader',
      selectors: [
        'header > nav.navbar'
      ]
    },
    {
      type: 'aicolumns',
      selectors: [
        'main > article > .container.post-inner .fl-builder-content'
      ]
    }
  ],
  transformers: []
};

export default importRules;
