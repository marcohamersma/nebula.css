module.exports = {
  defaultModules: ['banner', 'reset', 'base', 'colors', 'spacing', 'borders', 'typography', 'lists', 'helper-classes'],

  variables: {
    'class-prefix': 'n',

    // Modules
    'use-reset': true,
    'use-base': true,
    'use-borders': true,
    'use-colors': true,
    'use-helper-classes': true,
    'use-lists': true,
    'use-spacing': true,
    'use-typography': true,

    colors: {
      'accent':     '#009CDA',
      'background': '#FFFFFF',
      'black':      '#262626'
    },

    'type-bold-weight': '!bolder', // prefix with ! to not quote this value in sass
    'body-line-height': 1.4,
    'font-base-sizes': {
      'normal':   18,
      'small':    15,
      'smallest': 12.5,
    },

    // TODO: Maybe make this a modular scale?
    'header-line-height': 1.2,
    'header-base-sizes': [31, 26, 21.5], // h1, h2, h3, etc…

    'spacing-values': {
      'smallest': 5,
      'small':    20,
      'medium':   40,
      'large':    70
    },

    'spacing-directions': ['top', 'bottom'],

    // https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
    'font-variants': ['common-ligatures', 'ordinal', 'oldstyle-nums', 'contextual'],
    'fancy-ligatures-in-headings': false,

    // Generate border support classes for these colors
    'border-colors':  ['accent', 'black'],
    'border-properties':  ['border', 'border-bottom'],

    // Breakpoints
    'breakpoint-hide-on-mobile': '400px',
    'breakpoint-mobile':         '400px',
    'breakpoint-tablet':         '700px',
    'breakpoint-widescreen':     '1200px'
  }
};
