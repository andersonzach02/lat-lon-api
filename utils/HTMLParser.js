const cheerio = require('cheerio');

class HTMLParser {
  constructor(htmlString) {
    this.$ = cheerio.load(htmlString, null, false);
  }

  getElement(elementType) {
    return this.$(elementType).html() || '';
  }

  // eslint-disable-next-line class-methods-use-this
  parseTabletoJSON(tableBody) {
    const table = cheerio.load(tableBody, null, false);

    const rowInfo = [];

    // eslint-disable-next-line func-names
    table('td').each(function (i) {
      rowInfo[i] = table(this).text();
    });

    return rowInfo.reduce(
      (previous, current, index) => ({
        ...previous,
        [index + 1]: current,
      }),
      // eslint-disable-next-line comma-dangle
      {}
    );
  }
}

module.exports = HTMLParser;
