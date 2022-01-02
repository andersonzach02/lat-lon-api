const HTMLParser = require('../utils/HTMLParser');

/* eslint-disable no-undef */
describe('HTMLParser getElement tests', () => {
  test('getElement should return the element specified by the element type passed as a string', () => {
    const parser = new HTMLParser('<h2>Test</h2>');

    const header = parser.getElement('h2');

    expect(header).toBe('Test');
  });

  test('getElement should only return the specified element when multiple HTML tags are present', () => {
    const parser = new HTMLParser('<h1>Test</h1><h2>This is a test</h2>');

    const header = parser.getElement('h1');

    expect(header).toBe('Test');
  });

  test('getElement should return items when a table is requested', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody></table>'
    );

    const tbody = parser.getElement('table');

    expect(tbody).toBe(
      // eslint-disable-next-line comma-dangle
      '<tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody>'
    );
  });

  test('getElement with empty string should return an empty string', () => {
    const parser = new HTMLParser('<h1>Test</h1>');

    const response = parser.getElement('');

    expect(response).toBe('');
  });

  test('getElement on a parser with no html string should return empty string', () => {
    const parser = new HTMLParser('');

    const response = parser.getElement('h1');

    expect(response).toBe('');
  });

  test('getElement should return first row when given a table and given a <tr> tag', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody></table>'
    );

    const row = parser.getElement('tr');

    expect(row).toBe('<td>Row 1</td>');
  });
});

describe('HTMLParser parseTabletoJSON tests', () => {
  test('parseTabletoJSON should take a table with a single cell and convert the data in that row to a JSON object where the key is the column number', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1</td></tr></tbody></table>'
    );

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual({ 1: 'Row 1' });
  });

  test('parseTabletoJSON should take a table with multiple columns in a single row and covert the data to a JSON where the key is the column number', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1</td><td>Row 2</td></tr></tbody></table>'
    );

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual({ 1: 'Row 1', 2: 'Row 2' });
  });

  // eslint-disable-next-line max-len
  // also want table with multiple rows to return an array of objects, maybe the single row should be an array too with a single object
});
