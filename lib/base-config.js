module.exports = {
  defaultModules: ['banner', 'mixins', 'reset', 'helpers', 'base', 'typography'],

  variables: {
    'class-prefix': 'n',
    'use-reset':    true,

    colors: {
      'accent':     '#009CDA',
      'background': '#FFFFFF',
      'black':      '#262626',
      'dark':       '#4D4D4D',
      'mid':        '#737373',
      'light':      '#999999',
      'white':      '#FFFFFF'
    },

    'type-bold-weight': 700,
    'body-line-height': 1.4,
    'font-base-sizes': {
      'normal':   18,
      'smallest': 12.5,
      'small':    15
    },

    // TODO: Maybe make this an array? maybe even use modular scales? first item is H1, second H2, etc…
    'header-line-height': 1.2,
    'header-base-sizes': {
      'h1': 31,
      'h2': 26,
      'h3': 21.5
    },

    'spacing-values': {
      'smallest': 5,
      'small':    20,
      'medium':   40,
      'large':    70
    },

    // http://blog.webtype.com/?p=4085
    'font-feature-settings':         ['kern', 'onum', 'liga', 'frac'],
    'font-feature-heading-settings': ['calt', 'dlig', 'clig'],

    // Generate border support classes for these colors
    'borders-for-color':  ['accent', 'mid', 'black', 'white'],
    'border-properties':  ['border', 'border-bottom'],
    'spacing-directions': ['top', 'bottom'],


    // Breakpoints
    'breakpoint-mobile':         '400px',
    'breakpoint-column':         '400px',
    'breakpoint-tablet':         '700px',
    'breakpoint-widescreen':     '1200px',
    'breakpoint-hide-on-mobile': '400px'
  }
};
