---
title: Nebula.css - Usage with Sass
---

# Using Nebula with an existing SASS pipeline
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

## Modularity
You can also import individual nebula modules, like
```scss
@import 'nebula.css/config';
@import 'nebula.css/colors';
```

## Responsiveness
After setting configuration variables and importing Nebula, you can scale typography and spacing with a couple of useful mixins: [scale-spacing](http://marcohamersma.github.io/nebula.css/sassdoc#mixin-scale-spacing) and [scale-type](http://marcohamersma.github.io/nebula.css/sassdoc#mixin-scale-type).

```scss
@media screen and (min-width: $breakpoint-widescreen) {
  @include scale-spacing(1.5, 1.5);
  @include scale-type(1.2, 1.3);
}
```

## Documentation
For more information on how to use Nebula, and how to use its mixins and functions, check out the [Sassdoc](http://marcohamersma.github.io/nebula.css/sassdoc).
