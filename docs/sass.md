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

For more information on how to use Nebula in a Sass pipeline, check out the [Sassdoc](http://marcohamersma.github.io/nebula.css/sassdoc).
