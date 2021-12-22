# lat-lon-api

## TODO

- [ ] Install axios to make HTTP requests
- [ ] Find a webpage that has information on lat and lon for US capitals
  - <https://www.latlong.net/category/states-236-14.html>
- [ ] Check robots.txt to make sure that I'm able to scrape the site
- [ ] Create a function that scrapes the webpage and parses the information to receive lat lon data
- [ ] Store the lat lon data in a database
- [ ] Does the scraper ever need to be called again? Should the DB ever occasionally be updated?
- [ ] Create basic REST API routes to query the data in the database
- [ ] Deploy the application for practice (Heroku?)

## Project Overview

This project is a very simple API that will use axios to make an HTTP request to web scrape data for latitude and longitude on major cities in the US. Eventually, this information will get stored in a database for the API to query whenever a call gets made to the API.
