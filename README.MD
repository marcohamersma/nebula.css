# Nebula CSS Framework (DEVELOPMENT branch)

This is where I'm very slowly forming the next release of Nebula.css.

The goal is to work towards a version of the framework that is a bit more universal, useful and modular. There is some new functionality ([usage as an npm module](#usage-as-an-npm-module), for example) as well.

For now, though I'm trying out stuff and trying to use Nebula in real life projects, learning from that and applying that in this branch. Some of these ideas might not be considered "good ideas", but they'll vanish in time.

Naturally, it's not advisable at all to use this.

## Usage
There are a few ways of using Nebula:
1. If you don't need any customisation, or want to include the file alongside other stylesheets, just pick out the `nebula.css` file in the root of this repository. Done!
2. If you don't like the default configuration, clone the repository, run `npm install`, and customize the files in the `scss` folder. Running `grunt custom`will then generate a file called `nebula-custom.css` in the root.
3. If you already have a Sass pipeline setup for your project, grab the `scss` folder and stick it's contents in there and include `styles.scss`.
4. Include Nebula as a node module

## Usage as an npm module.
~~Install the package using `npm install nebula.css --save` and require it in your project.~~
As of now, the module is not yet done and published.

### arguments
1. `modules`: An array of modules to render for this build. Defaults to `['banner', 'config', 'mixins', 'reset', 'helpers', 'base']`. This is also exported as `nebula.defaultModules`.
2. `pathName`: The path that the end result needs to be written to. This _can be left blank_, it will cause the callback to return the css itself. Otherwise it returns the pathname.
3. `config`: Allows you to overwrite the configuration variables found in `config.scss`. However, it will cause changes to that file and `styles.scss` to be ignored (since we're basically constructing a new base file). Expects an object, values will be combined with `lib/base-config.js`.
4. `callback`: function to be executed after the output has been generated.

```js
    var nebula = require('nebula.css');


    nebula.build(null, './nebula-custom.css', { 'use-reset': false }, function(fileName) {
        console.log('output at ' + fileName);
    });
```

# About Nebula.css
<p>Nebula.css is a work-in-progress CSS framework with the aim to quickly generate “building-block” classes for font sizes, colors, background colors and spacing. In addition to that, it also offers a nice typographic foundation + basic styles. It's inspired by <a href="https://en.bem.info" class="n-small-caps">BEM</a> and <a href="http://www.stubbornella.org/content/category/general/geek/css/oocss-css-geek-general/" class="n-small-caps">OOCSS</a>. It's a great starting kit for responsive websites, and allows you to easily scale type and spacing at different breakpoints.</p>

<p>The framework is built with <a href="http://sass-lang.com">Sass</a>, and probably requires tweaking before compiling. That said, it can be used outside of a Sass pipeline together with other stylesheets.</p>

### Nebula loves spacing
<p>For most block elements, Nebula provides no margins. This is so that the amount of spacing can be explicitly defined depending on the context and surrounding elements. In my experience, this leads to more consistent spacing across a page, with less chance of padding + margin adding up to inconsistent amounts compared to other elements on the page.</p>

### Nebula generates help classes
<p>The <code>_config.scss</code> file contains a number of variables/maps you can set, which will result in the generation of building-block class names:</p>

### Colors &amp; Background
```scss
$colors: (
  accent: #009CDA,
  …
);

.n-color-accent      { color: #009CDA; }
.n-background-accent { background-color: #009CDA; }
```


### Borders
<p>Border classnames are generated from two variables, first <code class="n-color-accent">$borders-for-color</code> defines what colors to generate borders for, and then <code class="n-color-accent">$border-properties</code> defines what properties are styled:</p>
```scss
$borders-for-color: 'accent', …
$border-properties: 'border', 'border-bottom';

.n-border-accent        { border: 1px solid #009CDA; }
.n-border-bottom-accent { border-bottom: 1px solid #009CDA; }
```


### Font sizes
<p>Similarly, font size classes will be generated for <code class="n-color-accent">$font-base-sizes</code> and <code class="n-color-accent">$header-base-sizes</code>:</p>

```scss
$font-base-sizes: (
  normal: 16,
  …
);
$header-base-sizes: (
  h1: 26,
  …
);

.n-font-normal { font-size: 16px; font-size: 1.6rem; }
h1, .n-font-h1 { font-size: 26px; font-size: 2.6rem; }

```
<p>Since it's a header, we automatically create a <code>h1</code> element, but we also create a class for this in case you want to style an element as a header, but do not want to associate it a header element's tag (for semantic reasons, for example). </p>

### Spacing
<p>For every spacing value you define, the following classes get generated:</p>
```scss
$spacing-value: (
  smallest: 5,
  …
);

.n-spacing-smallest  { margin: 5px;  }
.n-vspacing-smallest { margin-top: 5px;   margin-bottom: 5px;  }
.n-hspacing-smallest { margin-left: 5px;  margin-right: 5px;   }

.n-padding-smallest  { padding: 5px; }
.n-vpadding-smallest { padding-top: 5px;  padding-bottom: 5px; }
.n-hpadding-smallest { padding-left: 5px; padding-right: 5px;  }
```


<p class="n-vspacing-small">As sometimes you might only want to give elements spacing on one side, any direction defined in <code class="n-color-accent">$spacing-directions</code> will generate additional directional classes for every <code class="n-color-accent">$spacing-value</code> defined:</p>

```scss
$spacing-directions: 'top', 'bottom';

.n-spacing-top-smallest    { margin-top: 5px; }
.n-spacing-bottom-smallest { margin-bottom: 5px; }

.n-padding-top-smallest    { padding-top: 5px; }
.n-padding-bottom-smallest { padding-bottom: 5px; }
```

## Responsiveness
<p>At the moment, Nebula does not have any elements which require “reassembly” on certain screen sizes. That said, the framework is built to scale to different sizes easily.</p>
<p>All sizes defined in the framework's configuration are regarded as <em>base sizes</em> that can be scaled for different media queries. Depending on the breakpoints your website requires, you define where you want font sizes or spacing to scale, and then call the media query to generate the rules again:</p>

```scss
@media screen and (min-width: $breakpoint-tablet) {
  // Defining what size multiplier we use for the text and spacing for this breakpoint
  $body-scale: 1.125;
  $header-scale: 1.8;
  $spacing-scale: 2;
  $border-scale: 2;
  @include scaled-spacing-and-type($spacing-scale, $body-scale, $header-scale);
  @include borderRules($border-scale);
}
```

<p class="n-vspacing-small">This then generates the code necessary:</p>
```scss
@media screen and (min-width: 800px) {
  .n-spacing-smallest { margin: 10px; }
  …
  body                { font-size: 18px; font-size: 1.8rem; }
  .n-font-normal      { font-size: 18px; font-size: 1.8rem; }
  h1, .n-font-h1      { font-size: 46.8px; font-size: 4.68rem; }
  …
  .n-border-accent    { border: 2px solid #009CDA; }
}

```
<p>The original values defined in Nebula's configuration have now multiplied by the scaling values defined above. For example, because the <code class="n-color-accent">$spacing-scale</code> was set to 2, <code>.n-spacing-smallest</code> changed from 5 to 10.</p>

## Helpers
<p>As a bonus, Nebula.css also offers a couple of helpers for common behaviour in the form of CSS classes or Sass functions:</p>

### Helper classes:

<ul class="n-ul n-spacing-bottom-medium">
  <li class="><code>.n-small-caps</code><br/> uses small-caps for the text affected by this class.</li>
  <li class="><code>.n-hideOnMobile</code> &amp; <code>.n-showOnMobile</code><br/> Allow you to hide and show components depending on available screen real estate. The breakpoint (“mobile”) for this is 400 by default, but can be changed in the configuration file.</li>
  <li class="><code>.n-text-centered</code><br/> speaks for itself, I'd say…</li>
  <li class="><code>.n-block-centered</code><br/> centers a block, basically sets auto margins on left+right.</li>
  <li class="><code>.n-inline</code><br/> basically <code>display: inline</code>.</li>
  <li class="><code>.n-clear</code><br/>Clears any floats after this element.</li>

</ul>

### Helper functions:

<p>If you're including Nebula in a Sass pipeline, you get access to the <code>font-size()</code>, <code>color()</code>, and <code>space()</code> functions for accessing configured font-sizes, colors, and spacing values.</p>
```scss
// nebula/_config.scss
$colors: (
  accent: #009CDA,
  …
);

// Your site styles
a {
  color: color('accent');
}

```

## Other elements &amp; lists
<p>Besides a nice foundation type-wise, Nebula also has some basis styles for other html elements. You've been able to see the <code>pre</code> and <code>code</code> elements above, but there's lists as well.</p>

### Unordered List (<code>.n-ul</code>)

<ul class="n-ul n-vspacing-smallest">
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ul>

### Ordered list (<code>.n-ol</code>)

<ol class="n-ol n-vspacing-smallest">
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ol>

### Unstyled List

<ol class="n-vspacing-smallest">
  <li>List item</li>
  <li>List item</li>
  <li>You get it…</li>
</ol>

## License
Licensed under the MIT License.
