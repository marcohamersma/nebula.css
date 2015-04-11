# Nebula CSS Framework
## Usage
If you don't want to use Nebula in a SASS/SCSS workflow, just grab the `nebula.css` file from the `css` directory, and include that in your website. That's all.

If you want to customise colors, spacing & other things, you need to use SASS to recompile changes made in the `scss/nebula` directory, here's how:

### Install Global Dependancies
  * [Node.js](http://nodejs.org)
  * [Ruby](https://www.ruby-lang.org/en/downloads/)
  * [Sass](http://sass-lang.com)
  * [grunt.js](http://grunt.js); `[sudo] npm install -g grunt-cli`

### Install Local Dependancies
  * Download zip or clone the repo
  * cd to project folder
  * run `bundle install` (first time users)
  * run `[sudo] npm install` (first time users)
  * run `grunt` (to watch and compile sass files)

I'm hoping that I can remove the dependency on Ruby at a later stage, but for now it's still required for using `grunt-contrib-sass`.

# About Nebula.css
Nebula.css is a work-in-progress CSS framework with the aim to quickly generate “building-block” classes for font sizes, colors, background colors and spacing. In addition to that, it also offers a nice typographic foundation + basic styles. It's inspired by [BEM](https://en.bem.info) and [OOCSS](http://www.stubbornella.org/content/category/general/geek/css/oocss-css-geek-general/). It's a great starting kit for responsive websites, and allows you to easily scale type and spacing at different breakpoints.

The framework is built with [SASS](http://sass-lang.com), and probably requires tweaking before compiling. That said, it can be used outside of a <span class="n-small-caps">SASS</span> pipeline together with other stylesheets.

### Nebula loves spacing

For most block elements, Nebula provides no margins. This is so that the amount of spacing can be explicitly defined depending on the context and surrounding elements. In my experience, this leads to more consistent spacing across a page, with less chance of padding + margin adding up to inconsistent amounts compared to other elements on the page.

## Nebula generates help classes

The top of the framework's `styles.scss` file contains a number of variables/maps you can set, which will result in the generation of building-block class names:

### [Colors & Background](#colors)

<pre class="scss">$colors: (
  accent: #009CDA,
  …
);

.n-color-accent      { color: #009CDA; }
.n-background-accent { background-color: #009CDA; }</pre></section><section id="borders" class="n-vspacing-medium">
### [Borders](#borders)

Border classnames are generated from two variables, first `$bordersForColor` defines what colors to generate borders for, and then `$borderProperties` defines what properties are styled:

<pre class="scss n-spacing-top-small">$bordersForColor: 'accent', …
$borderProperties: 'border', 'border-bottom';

.n-border-accent        { border: 1px solid #009CDA; }
.n-border-bottom-accent { border-bottom: 1px solid #009CDA; }</pre></section><section id="fontsizes" class="n-vspacing-medium">
### [Font Sizes](#fontsizes)

Similarly, font size classes will be generated for `$fontBaseSizes` and `$headerBaseSizes`:

<pre class="scss n-vspacing-small">$fontBaseSizes: (
  normal: 16,
  …
);
$headerBaseSizes: (
  h1: 26,
  …
);

.n-font-normal { font-size: 16px; font-size: 1.6rem; }
h1, .n-font-h1 { font-size: 26px; font-size: 2.6rem; }
</pre>
Since it's a header, we automatically create a `h1` element, but we also create a class for this in case you want to style an element as a header, but do not want to associate it a header element's tag (for semantic reasons, for example).

### [Spacing](#spacing)

For every spacing value you define, the following classes get generated:

<pre class="scss n-vspacing-small">$spacingValue: (
  smallest: 5,
  …
);

.n-spacing-smallest  { margin: 5px;  }
.n-vspacing-smallest { margin-top: 5px;   margin-bottom: 5px;  }
.n-hspacing-smallest { margin-left: 5px;  margin-right: 5px;   }

.n-padding-smallest  { padding: 5px; }
.n-vpadding-smallest { padding-top: 5px;  padding-bottom: 5px; }
.n-hpadding-smallest { padding-left: 5px; padding-right: 5px;  }</pre>
As sometimes you might only want to give elements spacing on one side, any direction defined in `$spacingDirections` will generate additional directional classes for every `$spacingValue` defined:

<pre class="scss n-spacing-top-small">$spacingDirections: 'top', 'bottom'; 

.n-spacing-top-smallest    { margin-top: 5px; }
.n-spacing-bottom-smallest { margin-bottom: 5px; }

.n-padding-top-smallest    { padding-top: 5px; }
.n-padding-bottom-smallest { padding-bottom: 5px; }</pre>

## [Responsiveness](#responsiveness)

At the moment, Nebula does not have any elements which require “reassembly” on certain screen sizes. That said, the framework is built to scale to different sizes easily.

All sizes defined in the framework's configuration are regarded as _base sizes_ that can be scaled for different media queries. Depending on the breakpoints your website requires, you define where you want font sizes or spacing to scale, and then call the media query to generate the rules again:

<pre class="scss n-vspacing-small">@media screen and (min-width: $breakpoint-tablet) {
  // Defining what size multiplier we use for the text and spacing for this breakpoint
  $bodyScale: 1.125;
  $headerScale: 1.8;
  $spacingScale: 2;
  $borderScale: 2;
  @include scaledSpacingAndType($spacingScale, $bodyScale, $headerScale);
  @include borderRules($borderScale);
}</pre>
This then generates the code necessary:

<pre class="scss n-vspacing-small">@media screen and (min-width: 800px) {
  .n-spacing-smallest { margin: 10px; }
  …
  body                { font-size: 18px; font-size: 1.8rem; }
  .n-font-normal      { font-size: 18px; font-size: 1.8rem; }
  h1, .n-font-h1      { font-size: 46.8px; font-size: 4.68rem; }
  …
  .n-border-accent     border: 2px solid #009CDA; 
}
</pre>
The original values defined in Nebula's configuration have now multiplied by the scaling values defined above. For example, because the `$spacingScale` was set to 2, `.n-spacing-smallest` changed from 5 to 10.

## [Helpers](#helpers)

As a bonus, Nebula.css also offers a couple of helper classes for common behaviour

### [Helper classes](#helper-classes)

You might want to hide and show components depending on available screen real estate. The classes `.hideOnMobile` and `.showOnMobile` do this, respectively. By default, “mobile” is defined as `<400`, but can be easily changed in the configuration file.

### [Helper functions](#helper-functions)

If you're including Nebula in a SCSS pipeline, you get access to the `font-size()` and `color()` functions for accessing configured font-sizes and colors.

<pre class="scss n-vspacing-small">// nebula/_config.scss
$colors: (
  accent: #009CDA,
  …
);

// Your site styles
a {
  color: color('accent');
}
</pre>
