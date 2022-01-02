/* eslint-disable comma-dangle */

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

    const columnHeaders = [];

    // eslint-disable-next-line func-names
    table('th').each(function (i) {
      columnHeaders[i] = table(this).text();
    });

    /* eslint-disable prefer-arrow-callback, implicit-arrow-linebreak, func-names */
    table('tr').each(function (i, elem) {
      rowInfo[i] = [];

      table(elem)
        .find('td')
        .each(function (j) {
          rowInfo[i][j] = table(this).text();
        });
    });

    const rowObjects = [];

    rowInfo
      .filter((v) => v.length !== 0)
      .forEach(
        (rowData) => {
          if (columnHeaders.length === 0) {
            rowObjects.push(
              rowData.reduce(
                (previous, current, index) => ({
                  ...previous,
                  [index + 1]: current,
                }),
                {}
              )
            );
          } else {
            rowObjects.push(
              rowData.reduce(
                (previous, current, index) => ({
                  ...previous,
                  [columnHeaders[index]]: current,
                }),
                {}
              )
            );
          }
        }

        // eslint-disable-next-line function-paren-newline
      );
    /* eslint-enable prefer-arrow-callback, implicit-arrow-linebreak, func-names */
    return rowObjects;
  }
}

module.exports = HTMLParser;
