module.exports = {
  defaultModules: ['banner', 'reset', 'base', 'colors', 'spacing', 'borders', 'typography', 'lists', 'helper-classes'],

  // Please note, these variables will be turned into dash-case before passing
  // them along to Sass.
  variables: {
    classPrefix: 'n',

    // Modules
    useReset: true,
    useBase: true,
    useBorders: true,
    useColors: true,
    useHelperClasses: true,
    useLists: true,
    useSpacing: true,
    useTypography: true,

    colors: {
      'accent':     '#009CDA',
      'background': '#FFFFFF',
      'black':      '#262626'
    },

    typeBoldWeight: '!bolder', // prefix with ! to not quote this value in sass
    bodyLineHeight: 1.4,
    fontBaseSizes: {
      'normal':   18,
      'small':    15,
      'smallest': 12.5,
    },

    // TODO: Maybe make this a modular scale?
    headerLineHeight: 1.2,
    headerBaseSizes: [31, 26, 21.5], // h1, h2, h3, etc…

    spacingValues: {
      'smallest': 5,
      'small':    20,
      'medium':   40,
      'large':    70
    },

    spacingDirections: ['top', 'bottom'],

    // https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
    fontVariants: ['common-ligatures', 'ordinal', 'oldstyle-nums', 'contextual'],
    fancyLigaturesInHeadings: false,

    // Generate border support classes for these colors
    borderColors:  ['accent', 'black'],
    borderProperties:  ['border', 'border-bottom'],

    // Breakpoints
    breakpointHideOnMobile: '400px',
    breakpointMobile:       '400px',
    breakpointTablet:       '700px',
    breakpointWidescreen:   '1200px'
  }
};
