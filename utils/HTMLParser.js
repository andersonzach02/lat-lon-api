const cheerio = require('cheerio');

class HTMLParser {
	constructor(htmlString) {
		this.$ = cheerio.load(htmlString, null, false);
	}

	getElement(elementType) {
		return this.$(elementType).html() || '';
	}

	parseTabletoJSON(tableBody) {
		return null;
	}
}

module.exports = HTMLParser;
