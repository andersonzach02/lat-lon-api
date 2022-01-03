const HTMLParser = require('../../utils/HTMLParser');

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
  test('parseTabletoJSON should take a table with a single cell and return a single JSON object in an array where the key for the object is the column number', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1 Column 1</td></tr></tbody></table>'
    );

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual([{ 1: 'Row 1 Column 1' }]);
  });

  test('parseTabletoJSON should take a table with multiple columns in a single row and return a single JSON object in an array where the key is the column number', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1 Column 1</td><td>Row 1 Column 2</td></tr></tbody></table>'
    );

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual([
      { 1: 'Row 1 Column 1', 2: 'Row 1 Column 2' },
    ]);
  });

  test('parseTabletoJson should take a table with multiple rows and create multiple objects with the value of the columns with keys as the column numbers in an array', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><td>Row 1 Column 1</td><td>Row 1 Column 2</td></tr><tr><td>Row 2 Column 1</td><td>Row 2 Column 2</td></tr></tbody></table>'
    );

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual([
      { 1: 'Row 1 Column 1', 2: 'Row 1 Column 2' },
      { 1: 'Row 2 Column 1', 2: 'Row 2 Column 2' },
    ]);
  });

  test('parseTabletoJSON should return an array of objects representing the table data with object field keys set to column headers if they are present', () => {
    const parser = new HTMLParser(
      // eslint-disable-next-line comma-dangle
      '<table><tbody><tr><th>Column 1</th><th>Column 2</th></tr><tr><td>Row 1 Column 1</td><td>Row 1 Column 2</td></tr><tr><td>Row 2 Column 1</td><td>Row 2 Column 2</td></tr></tbody></table>'
    );

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual([
      { 'Column 1': 'Row 1 Column 1', 'Column 2': 'Row 1 Column 2' },
      { 'Column 1': 'Row 2 Column 1', 'Column 2': 'Row 2 Column 2' },
    ]);
  });

  test('parseTabletoJSON in an empty table should return an empty object', () => {
    const parser = new HTMLParser('<table></table>');

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual({});
  });

  test('parseTabletoJSON with an empty parser should return an empty object', () => {
    const parser = new HTMLParser('');

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual({});
  });

  test('parseTabletoJSON with an empty tbody should return an empty object', () => {
    const parser = new HTMLParser('<table><tbody></tbody></table>');

    const tableBody = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(tableBody);

    expect(tableData).toStrictEqual({});
  });
});
