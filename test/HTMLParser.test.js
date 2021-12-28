const HTMLParser = require('../utils/HTMLParser');

/* eslint-disable no-undef */
describe('HTMLParser tests', () => {
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
      '<table><tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody></table>',
    );

    const tbody = parser.getElement('table');

    expect(tbody).toBe(
      '<tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody>',
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
});
