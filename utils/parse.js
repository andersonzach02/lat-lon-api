const axios = require('axios');
const HTMLParser = require('./HTMLParser');

axios
  .get('https://www.latlong.net/category/states-236-14.html')
  .then((response) => {
    const parser = new HTMLParser(response.data);

    const table = parser.getElement('table');

    const tableData = parser.parseTabletoJSON(table);

    tableData.forEach((city) => {
      // eslint-disable-next-line no-param-reassign
      parser.changePropertyName(city, 'Place Name', 'Name');

      const cityName = city.Name.split(',')[0].trim();

      // eslint-disable-next-line no-param-reassign
      city.Name = cityName;
    });

    console.log(tableData);
  });
