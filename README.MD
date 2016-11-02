# Nebula CSS Framework
[![npm version](https://badge.fury.io/js/nebula.css.svg)](http://badge.fury.io/js/nebula.css)

**pre-release**

Nebula.css is a CSS toolkit based on SASS that generates utility classes for font sizes, colors, background colors and spacing, while having responsiveness in mind. By default, it also includes a reset stylesheet and a number of basic typographic styles.

[Demo & Documentation](http://marcohamersma.github.io/nebula.css/) | [SassDoc](http://marcohamersma.github.io/nebula.css/sassdoc)

## Where does it work well
- Quick assembly of simple websites.
- Your design system specifies colors, font sizes, and spacing amounts, and you want to quickly start building something.
- You want to use consistent amounts of spacing between elements, that can change on different breakpoints.
- You want to have a couple of predefined font sizes, that can scale on different breakpoints

## What does it do
You define a base set of colors, font sizes, and spacing amounts, from which Nebula creates a set of CSS classes that you can use for building your website. You might want to increase things like font size or spacing when the viewport size allows it, so by applying one of Nebula's mixins at certain breakpoints _you can scale up/down font sizes and spacing amounts_ for this breakpoint.

A basic Nebula installation generates classes like this:

```scss
// For every color you define in your website
.n-color-accent { color: #009CDA; }
.n-background-accent { background-color: #009CDA; }

// If you want, border classes can be generated for colors as well
.n-border-accent { border: 1px solid #009CDA; }

// You define a set of body and heading sizes
.n-type-h1, h1  { font-size: 31px; }
.n-type-normal  { font-size: 18px; }
.n-type-large   { font-size: 22px; }

// You can define a number of spacing values, it generates margin and padding classes
.n-spacing-medium  { margin: 40px 40px; }
.n-vspacing-medium { margin-top: 40px; margin-bottom: 40px; }
.n-hspacing-medium { margin-left: 40px; margin-right: 40px; }

.n-padding-medium  { padding: 40px 40px; }
.n-vpadding-medium { padding-top: 40px; padding-bottom: 40px; }
.n-hpadding-medium { padding-left: 40px; padding-right: 40px; }
```

Using a mixin then scales these items, for example with font-sizes:

```scss
@media screen and (min-width: $breakpoint-widescreen) {
  @include scale-type($bodyTextScale: 1.2);
}

// Outputs:
@media screen and (min-width: 1280px) {
  body { font-size: 21.6px; }
  .n-type-h1, h1 { font-size: 37.2px; }
  .n-type-normal { font-size: 21.6px; }
  .n-type-large  { font-size: 26.4px; }
}
```

Nebula is very modular, so you can disable certain modules if you don't want to have them in your output.

## How to add Nebula to your project
Nebula.css can be used in a variety of ways, first as a simple css file, inside a traditional SASS setup, or as a build process by itself (as a CLI or NPM module).

### Usage with SASS pipeline
Download the SCSS folder and place it somewhere in your project. overwrite any configuration variable you want, and then import nebula.css

```scss
$colors: (
  'black' : #262626,
  'white' : #FFFFFF
);

// Disable/enable individual modules through configuration variables
$use-reset: false;

@import 'nebula.css/nebula';
```

You can also import individual nebula modules, like
```scss
@import 'nebula.css/config';
@import 'nebula.css/colors';
```

For more information on how to use Nebula in a Sass pipeline, check out the [Sassdoc](http://marcohamersma.github.io/nebula.css/sassdoc).

### Usage with basic/vanilla css file
The compiled version of Nebula can be found in `dist/nebula.css`. A minified version is also available there. You can include this into your HTML file and add your own styles in other files, make modifications, etc.

### Usage as CLI
Install the npm package using `npm install -g nebula.css`, or install it as a dependency for your project with the `--save` flag. Then use the CLI like this:

`$ nebula.css <entry point> <options>`

For a list of options, go to the [JavaScript API documentation](docs/api.md#command-line).

### Usage as an npm module.
Install the npm package using `npm install nebula.css --save` and require it in your project.

```js
var nebula = require('nebula.css');

nebula.build('mystyles.css', options).then(…);
```

`nebula.build` returns a Promise, which will be passed the contents of the Sass file when done, or a file path if `outFile` option is set.

For information about configuration options, check the [JavaScript API documentation](docs/api.md).

## License
Licensed under the MIT License.
