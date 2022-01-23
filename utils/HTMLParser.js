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
    const rowInfo = this.#getRowInfo(table);

    if (!rowInfo) return {};

    const columnHeaders = this.#getColumnHeaders(table);

    const rowObjects = rowInfo
      .filter((v) => v.length !== 0)
      .map(
        (rowData) => {
          if (!columnHeaders) return this.#convertTableToObject(rowData);

          return this.#convertTableToObject(rowData, columnHeaders);
        }

        // eslint-disable-next-line function-paren-newline
      );
    /* eslint-enable prefer-arrow-callback, implicit-arrow-linebreak, func-names */

    return rowObjects;
  }

  // eslint-disable-next-line class-methods-use-this
  #getRowInfo(table) {
    const rowInfo = [];

    /* eslint-disable prefer-arrow-callback, implicit-arrow-linebreak, func-names */
    table('tr').each(function (i, elem) {
      rowInfo.push([]);

      table(elem)
        .find('td')
        .each(function () {
          rowInfo[i].push(table(this).text());
        });
    });

    return rowInfo.filter((v) => v).length === 0 ? null : rowInfo;
  }

  // eslint-disable-next-line class-methods-use-this
  #getColumnHeaders(table) {
    const columnHeaders = [];

    // eslint-disable-next-line func-names
    table('th').each(function (i) {
      columnHeaders[i] = table(this).text();
    });

    return columnHeaders.length === 0 ? null : columnHeaders;
  }

  // eslint-disable-next-line class-methods-use-this
  #convertTableToObject(rowData, columnHeaders) {
    return rowData.reduce(
      (previous, current, index) => ({
        ...previous,
        [columnHeaders ? columnHeaders[index] : [index + 1]]: current,
      }),
      {}
    );
  }

  // eslint-disable-next-line class-methods-use-this
  changePropertyName(object, existingPropertyName, newPropertyName) {
    // eslint-disable-next-line no-param-reassign
    object[newPropertyName] = object[existingPropertyName];
    // eslint-disable-next-line no-param-reassign
    delete object['Place Name'];
  }
}

module.exports = HTMLParser;
