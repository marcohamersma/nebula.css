# Javascript API
## Basic usage:
    var nebula = require('nebula.css');

    nebula.build(<entry file>, <options>);

`nebula.build` returns a Promise, which will be passed the contents of the Sass file when done. If the `outFile` option is set, it will return the path to the file generated.

### Entry File `optional`.
This is the file that contains the styles for your application. This has to be sass/scss file. It will be included by Nebula's Sass pipeline, and therefore will give you access to all Sass's features (including importing), plus Nebula's helper mixins and functions.

You can leave this blank, and no file will be included.

### Options `optional`
You can pass an options object to Nebula to determine which modules to include, and where the output will go.

#### `modules:Array`
An array of modules to be used. This will default to `nebula.defaultModules.concat([entryFile])`. If you're looking to disable a few modules, you might not want to use this. See below for the `useX` options.

#### `outFile:String`
If this is defined, Nebula will generate a CSS file in the specified location, with a source map if `useSourceMap` isn't set to `false`. In addition, `nebula.build`'s promise will not return the contents of the css file, but `outFile` itself.

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

### `colors:Object`
Object with a list of colors. The `key` here refers to the colors name, and the value it's value. For example:
```js
{
  accent: '#B5200F'
}
```
will generate:
```css
 .n-color-accent { color: #B5200F; }
 .n-background-accent { background: #B5200F; }
```

### `typeBoldWeight:Number`
Sets the weight of bold text and headings. Defaults to `bolder`, which takes the next available heavier font weight.

### `bodyLineHeight:Number`
Line height for body text.

### `fontBaseSizes:Object`
Object with a list of font-sizes. The `key` here refers to the size name, and the value the size at 1x scale.

### `headerLineHeight:Object`
Line height for headings text.

### `headerBaseSizes:Object`


### `spacingValues:Object`


### `fontVariants:Object`


### `fancyLigaturesInHeadings:Object`


### `bordersForColor:Object`


### `borderProperties:Object`


### `spacingDirections:Object`

