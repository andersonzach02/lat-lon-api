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

    table('td').each((i) => {
      rowInfo[i] = table(this).text();
    });

    console.log(rowInfo);

    return rowInfo.map(
      (previous, colInfo, index) => ({ ...previous, [index]: colInfo }),
      {}
    );

    // return {
    //   1: rowInfo,
    // };
  }
}

module.exports = HTMLParser;
