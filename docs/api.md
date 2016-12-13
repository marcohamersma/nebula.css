---
title: Nebula.css - JavaScript API & CLI
---

# JavaScript API
## Basic usage:
Install the npm package using `npm install nebula.css --save` and require it in your project.

```js
var nebula = require('nebula.css');

nebula.build(<entry file>, <options>).then(…);
```

`nebula.build` returns a Promise, which will be passed the contents of the Sass file when done. If the `outFile` option is set, it will return the path to the file generated.

_Most of the configuration variables are camelCase variations of the variables found in Sass_ (they are converted to dash-case before being passed along), for a more detailed (and maybe current) documentation of these variables, check out [SassDoc](http://marcohamersma.github.io/nebula.css/sassdoc), or the [list of default options](https://github.com/marcohamersma/nebula.css/blob/master/lib/base-config.js).

By default, Nebula will look for an optional JSON file called `.nebularc` in the current working directory. This file can contain the usual configuration for nebula.css: colors, spacing, and font sizes. It will be merged with the options below and the [default settings](https://github.com/marcohamersma/nebula.css/blob/master/lib/base-config.js#L4-L100).

### Entry File `optional`.
This is the file that contains the styles for your application. This has to be sass/scss file. It will be included by Nebula's Sass pipeline, and therefore will give you access to all Sass's features (including importing), plus Nebula's helper mixins and functions.

You can leave this blank, and no file will be included.

### Options `optional`
You can pass an options object to Nebula to determine which modules to include, and where the output will go.

### `config:String`
If you rather keep your configuration somewhere else, you can use the `config` option to supply a path to a JSON file that contains the configuration for Nebula. This will replace the `.nebularc` file mentioned above.

### `colors:Object`
Object with a list of colors. The `key` here refers to the colors name, and the value it's value. For example:
```js
colors: {
  accent: '#B5200F'
}
```
will generate:
```css
 .n-color-accent { color: #B5200F; }
 .n-background-accent { background: #B5200F; }
```

### `fontBaseSizes:Object`
Object with a list of font-sizes. The `key` here refers to the size name, and the value the size at 1x scale.

```js
fontBaseSizes: {
  normal:   18,
  small:    15,
  smallest: 12,
}
```
will generate:
```css
.n-type-normal   { font-size: 18px; }
.n-type-small    { font-size: 15px; }
.n-type-smallest { font-size: 12px; }
```

### `spacingValues:Object`
Object with a list of spacing sizes. The `key` here refers to the size name, and the value the size at 1x scale.

```js
spacingValues: {
  smallest: 5,
  small:    20,
  medium:   40,
  large:    70
}
```

#### `modules:Array`
An array of modules to be used. This will default to `nebula.defaultModules.concat([entryFile])`. If you're looking to disable a few modules, you might not want to use this. See below for the `useX` options.

#### `outFile:String`
If this is defined, Nebula will generate a CSS file in the specified location, with a source map if `useSourceMap` isn't set to `false`. In addition, `nebula.build`'s promise will not return the contents of the css file, but `outFile` itself.

#### `extraScss:String`
Add this string of text to Nebula's file. This works as an alternative to the entry file.

#### `useSourceMap:Boolean`
Determines if Sass should generate a sourceMap alongside the `outFile`. This defaults to `true`, but won't generate anything if `outFile` is not defined.

### `use<ModuleName>:Boolean`
You can turn off specific modules in Nebula if you don't need them. This can be done by adding `useReset: false` to the options, for example. This is essentially the same as when you use only the Sass files in Nebula (not the JS module), except that the configuration variables are camelCased to be in line with JavaScript convention.

```js
{
  useReset: true,
  useBase: true,
  useBorders: true,
  useColors: true,
  useHelperClasses: true,
  useLists: true,
  useSpacing: true,
  useTypography: true,
}
```

### `minify:Boolean`
Compresses the CSS output using [`CleanCSS`](https://github.com/jakubpawlowicz/clean-css).

### `classPrefix:String`
Determines what is prefixed to all the classes that Nebula generates. Defaults to `n`, and will output classes like `.n-spacing-smallest`.

### `typeBoldWeight:Number`
Sets the weight of bold text and headings. Defaults to `bolder`, which takes the next available heavier font weight.

### `bodyLineHeight:Number`
Line height for body text.

### `headerLineHeight:Object`
Line height for headings text.

### `headerBaseSizes:Array`
Array of font sizes to use for header sizes, first item is H1, second H2, etc…

### `fontVariants:Object`
Array of `font-variants` to use for body text, see [this MDN documentation] (https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) for a list of supported values.

### `fancyLigaturesInHeadings:Object`
Use discretionary(fancier) ligatures for headings, this might be a bit too much for certain fonts, and is therefore off by default.

### `borderColors:Object`
an array of color names that should get border classes. Nebula will then look up that color in the $colors map and use that.

### `borderSize:Number`
Default size in pixels for borders when they are generated.

### `borderProperties:Object`
List of properties that should be generated. For example, assuming the existence of an 'accent' color:

```js
borderProperties: ['border', 'border-bottom']
```

Will output:

```css
.n-border-accent {…}
.n-border-bottom-accent {…}
```

### `spacingDirections:Object`
Determines which extra “directions” to generate spacing classes for (besides “all”, vertical, and horizontal)

```js
spacingDirections: ['top', 'bottom']
```

# Command Line Interface
Install the npm package using `npm install -g nebula.css`, or install it as a dependency for your project with the `--save` flag. Then you can use nebula.css as a build tool by itself, by using the CLI:

`$ nebula.css <entry point> <options>`

Combined with NPM and a package like [watch](https://www.npmjs.com/package/watch#cli), it's really easy to set up a basic CSS pipeline:

```json
// package.json
"scripts": {
  "start": "watch 'nebula.css css/styles.scss -o public/styles.css' css"
}
```

Running `npm start` will automatically build your css through Nebula, and watch for changes to your css folder.

## Configuration File
If you rather keep your configuration somewhere else, you can use the `-c` or `--config` option to supply a path to a JSON file that contains the configuration for Nebula. This will replace the `.nebularc` file mentioned above.

`$ nebula.css <entry point> -c config/nebula.json`

## CLI options
The most important features of the JavaScript API are present in the CLI. For a quick reminder, type `nebula.css -h`.

### Output
By default, the CLI outputs to stdout, so you can do:

`$ nebula.css > public/styles.css`

You can also pass an `-o` or `--output` option:

`$ nebula.css <entry point> -o public/styles.css`

### Modularity
Individual modules can be disabled by adding a `--noX` flag, where `x` is the module name, for example `--noBase`.

You can also supply a comma-separated list of modules:

`$ nebula.css <entry point> --modules reset,base,spacing,typography`

### `--minify`
Compresses the CSS output using [`CleanCSS`](https://github.com/jakubpawlowicz/clean-css).

### `--noBanner`
Hide the “Powered by nebula.css…” banner from output css
