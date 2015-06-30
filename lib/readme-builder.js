/* eslint quotes:0 */
var Handlebars = require('handlebars'),
    builder    = require('./nebula-builder'),
    fs         = require('fs'),
    slugger    = require('slug'),
    MDheader   = fs.readFileSync('./readme-src/readme-header.md'),
    medium     = 'html',
    layout,
    template;

function loadTemplates() {
  var src       = fs.readFileSync('./readme-src/index.hbs', 'utf8'),
      layoutsrc = fs.readFileSync('./readme-src/layout.hbs', 'utf8');

  layout = Handlebars.compile(layoutsrc);
  template = Handlebars.compile(src);
}

Handlebars.registerHelper('heading', function(options) {
  var className = options.hash.className || '',
      title     = options.fn(this),
      slug      = options.hash.slug || slugger(title).toLowerCase(),
      headertype= options.hash.headerType || 3,
      mdHeader  = new Array(headertype + 1).join('#') + ' ';

  if (medium === "html") {
    return new Handlebars.SafeString(
        '<h'+headertype+' class="'+className+'" id="' + slug + '">' +
          '<a class="g-anchor" href="#' + slug + '">' + title + '</a>' +
        '</h'+headertype+'>'
    );
  } else {
    return new Handlebars.SafeString(
      mdHeader + options.fn(this) + "\n"
    );
  }
});

Handlebars.registerHelper('section', function(options) {
  var className = options.hash.className,
      title     = Handlebars.Utils.escapeExpression(options.hash.title),
      slug      = options.hash.slug || slugger(options.hash.title).toLowerCase(),
      headertype= options.hash.headerType || 3,
      mdHeader  = new Array(headertype + 1).join('#') + ' ';

  if (medium === "html") {
    return new Handlebars.SafeString(
      '<section id="' + slug + '" class="' + className + '">' +
        '<h'+headertype+'><a class="g-anchor" href="#' + slug + '">' + title + '</a></h'+headertype+'>' +
        options.fn(this) +
      '</section>'
    );
  } else {
    return new Handlebars.SafeString(
      mdHeader + title + "\n" + options.fn(this)
    );
  }
});

Handlebars.registerHelper('code', function(options) {
  var className = options.hash.className || '';
  if (medium === "html") {
    return new Handlebars.SafeString(
      '<pre class="scss '+className+'"><code>' +
        options.fn(this) +
      '</pre></code>'
    );
  } else {
    return new Handlebars.SafeString(
      "```scss\n" +
        options.fn(this) +
      "\n```\n"
    );
  }
});

module.exports = {
  html: function(callback) {
    var options = {};

    loadTemplates();
    builder(null, 'assets/page-styles.css', options, function() {
      medium = 'html';
      callback(layout({yield: template()}));
    });
  },
  markdown: function(callback) {
    medium = 'markdown';
    loadTemplates();
    callback(MDheader + template());
  }
};
