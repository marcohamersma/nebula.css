# Nebula CSS Framework
## Usage
If you don't want to use Nebula in a SASS/SCSS workflow, just grab the `nebula.css` file from the `css` directory, and include that in your website. That's all.

If you want to customise colors, spacing & other things, you need to use SASS to recompile changes made in the `scss/nebula` directory, here's how:

## Demo
You can see the code in action at [marcohamersma.github.io/nebula.css/](http://marcohamersma.github.io/nebula.css/).

### Install Global Dependancies
  * [Node.js](http://nodejs.org)
  * [Ruby](https://www.ruby-lang.org/en/downloads/)
  * [Sass](http://sass-lang.com)
  * [grunt.js](http://grunt.js)

### Install Local Dependancies
  * Download zip or clone the repo
  * cd to project folder
  * run `bundle install` (first time users)
  * run `[sudo] npm install` (first time users)
  * run `grunt` (to watch and compile sass files)

I'm hoping that I can remove the dependency on soon, but for now it's still required for using `grunt-contrib-sass`.

# About Nebula.css
<p>Nebula.css is a work-in-progress CSS framework with the aim to quickly generate “building-block” classes for font sizes, colors, background colors and spacing. In addition to that, it also offers a nice typographic foundation + basic styles. It's inspired by <a href="https://en.bem.info" class="n-small-caps">BEM</a> and <a href="http://www.stubbornella.org/content/category/general/geek/css/oocss-css-geek-general/" class="n-small-caps">OOCSS</a>. It's a great starting kit for responsive websites, and allows you to easily scale type and spacing at different breakpoints.</p>

<p>The framework is built with <a href="http://sass-lang.com" class="n-small-caps">SASS</a>, and probably requires tweaking before compiling. That said, it can be used outside of a <span class="n-small-caps">SASS</span> pipeline together with other stylesheets.</p>

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
<p>Border classnames are generated from two variables, first <code class="n-color-accent">$bordersForColor</code> defines what colors to generate borders for, and then <code class="n-color-accent">$borderProperties</code> defines what properties are styled:</p>
```scss
$bordersForColor: 'accent', …
$borderProperties: 'border', 'border-bottom';

.n-border-accent        { border: 1px solid #009CDA; }
.n-border-bottom-accent { border-bottom: 1px solid #009CDA; }
```


### Font sizes
<p>Similarly, font size classes will be generated for <code class="n-color-accent">$fontBaseSizes</code> and <code class="n-color-accent">$headerBaseSizes</code>:</p>

```scss
$fontBaseSizes: (
  normal: 16,
  …
);
$headerBaseSizes: (
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
$spacingValue: (
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


<p class="n-vspacing-small">As sometimes you might only want to give elements spacing on one side, any direction defined in <code class="n-color-accent">$spacingDirections</code> will generate additional directional classes for every <code class="n-color-accent">$spacingValue</code> defined:</p>

```scss
$spacingDirections: 'top', 'bottom'; 

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
  $bodyScale: 1.125;
  $headerScale: 1.8;
  $spacingScale: 2;
  $borderScale: 2;
  @include scaledSpacingAndType($spacingScale, $bodyScale, $headerScale);
  @include borderRules($borderScale);
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
  .n-border-accent     border: 2px solid #009CDA; 
}

```
<p>The original values defined in Nebula's configuration have now multiplied by the scaling values defined above. For example, because the <code class="n-color-accent">$spacingScale</code> was set to 2, <code>.n-spacing-smallest</code> changed from 5 to 10.</p>

## Helpers
<p>As a bonus, Nebula.css also offers a couple of helpers for common behaviour in the form of CSS classes or SASS functions:</p>

### Helper classes:

<ul class="n-ul n-spacing-bottom-medium">
  <li class="><code>.n-small-caps</code><br/> uses small-caps for the text affected by this class.</li>
  <li class="><code>.n-hideOnMobile</code> &amp; <code>.n-showOnMobile</code><br/> Allow you to hide and show components depending on available screen real estate. The breakpoint (“mobile”) for this is 400 by default, but can be changed in the configuration file.</li>
  <li class="><code>.n-text-centered</code><br/> speaks for itself, I'd say…</li>
  <li class="><code>.n-block-centered</code><br/> centers a block, basically sets auto margins on left+right.</li>
  <li class="><code>.n-inline</code><br/> basically <code>display: inline</code>.</li>
  <li class="><code>.n-clear</code><br/>Clears any floats after this element.</li>

</ul>

### Helper classes:

<p>If you're including Nebula in a SASS pipeline, you get access to the <code>font-size()</code>, <code>color()</code>, and <code>space()</code> functions for accessing configured font-sizes, colors, and spacing values.</p>
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
