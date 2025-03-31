/**
 * The import rules object defines elements that can be removed (cleanup) from the source
 * document and elements that should be transformed into blocks.
 */
/* eslint-disable comma-dangle */
const importRules = {
  cleanup: {
    start: [],
    end: [
      'style',
      'source',
      'script',
      'noscript',
      'iframe',
      'link'
    ]
  },
  blocks: [
    {
      type: 'metadata',
      selectors: [],
      variants: []
    },
    {
      type: 'Table (no header)1',
      params: {
        name: 'Table (no header)',
        cluster: 1,
        block: 'Table (no header)',
        id: 'tableNoHeader1'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns3',
      params: {
        name: 'Columns',
        cluster: 3,
        block: 'Columns',
        id: 'columns3'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed5',
      params: {
        name: 'Embed (video)',
        cluster: 5,
        block: 'Embed',
        id: 'embed5'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns8',
      params: {
        name: 'Columns',
        cluster: 8,
        block: 'Columns',
        id: 'columns8'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns9',
      params: {
        name: 'Columns',
        cluster: 9,
        block: 'Columns',
        id: 'columns9'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Accordion11',
      params: {
        name: 'Accordion',
        cluster: 11,
        block: 'Accordion',
        id: 'accordion11'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards (no images)13',
      params: {
        name: 'Cards (no images)',
        cluster: 13,
        block: 'Cards (no images)',
        id: 'cardsNoImages13'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Accordion14',
      params: {
        name: 'Accordion',
        cluster: 14,
        block: 'Accordion',
        id: 'accordion14'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns15',
      params: {
        name: 'Columns (three columns)',
        cluster: 15,
        block: 'Columns',
        id: 'columns15'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns16',
      params: {
        name: 'Columns (three columns)',
        cluster: 16,
        block: 'Columns',
        id: 'columns16'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns17',
      params: {
        name: 'Columns (three columns)',
        cluster: 17,
        block: 'Columns',
        id: 'columns17'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Search20',
      params: {
        name: 'Search',
        cluster: 20,
        block: 'Search',
        id: 'search20'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns21',
      params: {
        name: 'Columns (three columns)',
        cluster: 21,
        block: 'Columns',
        id: 'columns21'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Search22',
      params: {
        name: 'Search',
        cluster: 22,
        block: 'Search',
        id: 'search22'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Tabs23',
      params: {
        name: 'Tabs',
        cluster: 23,
        block: 'Tabs',
        id: 'tabs23'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards24',
      params: {
        name: 'Cards',
        cluster: 24,
        block: 'Cards',
        id: 'cards24'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Carousel30',
      params: {
        name: 'Carousel',
        cluster: 30,
        block: 'Carousel',
        id: 'carousel30'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns31',
      params: {
        name: 'Columns (three columns)',
        cluster: 31,
        block: 'Columns',
        id: 'columns31'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns32',
      params: {
        name: 'Columns',
        cluster: 32,
        block: 'Columns',
        id: 'columns32'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns37',
      params: {
        name: 'Columns (three columns)',
        cluster: 37,
        block: 'Columns',
        id: 'columns37'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns41',
      params: {
        name: 'Columns',
        cluster: 41,
        block: 'Columns',
        id: 'columns41'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns42',
      params: {
        name: 'Columns',
        cluster: 42,
        block: 'Columns',
        id: 'columns42'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards43',
      params: {
        name: 'Cards',
        cluster: 43,
        block: 'Cards',
        id: 'cards43'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero45',
      params: {
        name: 'Hero',
        cluster: 45,
        block: 'Hero',
        id: 'hero45'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards (no images)46',
      params: {
        name: 'Cards (no images)',
        cluster: 46,
        block: 'Cards (no images)',
        id: 'cardsNoImages46'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Quote48',
      params: {
        name: 'Quote (with attribution)',
        cluster: 48,
        block: 'Quote',
        id: 'quote48'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns49',
      params: {
        name: 'Columns',
        cluster: 49,
        block: 'Columns',
        id: 'columns49'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns50',
      params: {
        name: 'Columns',
        cluster: 50,
        block: 'Columns',
        id: 'columns50'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns51',
      params: {
        name: 'Columns',
        cluster: 51,
        block: 'Columns',
        id: 'columns51'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards52',
      params: {
        name: 'Cards',
        cluster: 52,
        block: 'Cards',
        id: 'cards52'
      },
      selectors: [],
      variants: []
    }
  ],
  transformers: []
};

export default importRules;