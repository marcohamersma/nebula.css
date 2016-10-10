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


    nebula(null, './nebula-custom.css', { 'use-reset': false }, function(fileName) {
        console.log('output at ' + fileName);
    });
```

# About Nebula.css
