const cheerio = require('cheerio');

class HTMLParser {
  constructor(htmlString) {
    this.$ = cheerio.load(htmlString, null, false);
  }

  getElement(elementType) {
    return this.$(elementType).html() || '';
  }
}

module.exports = HTMLParser;
