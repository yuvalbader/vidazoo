# Update from 18/11

As part of my drawing conclusions, I made a small patch to the Dockerize process and now it works.
in order to run the project please follow the instructions below:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yuvalbader/Vidazoo-hw
   ```

2. **Go to root folder:**

   ```bash
   cd Vidazoo-hw
   ```

3. **Run the docker-compose:**

   ```bash
   docker-compose up --build
   ```

4. **Open browser:**

   www.localhost:3000

# Ads.txt Parser Web App

Unfortunately, at the end of the work as part of the deployment process, critical things has changed.
I wanted to do the deployment using heroku container registry and that's also why I dockerized the application.
Unfortunately it doesn't work, and my configurations have changed and affected
critical to redis, so I did not complete the deploy and redis cache will not serve the data.

## Overview

This project is a solution to the Junior Developer Home Assignment, aiming to build a web app that retrieves and displays information from the 'ads.txt' file of a given domain. The server-side handles scraping and parsing of the 'ads.txt' file, while the UI, built using React with JSX, presents the results in a table format.

## How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yuvalbader/Vidazoo

   ```

2. **Run the client:**

   ```bash
   cd client
   npm i
   npm run start

   ```

3. **Run the server:**

   ```bash
   cd server
   npm i
   node server.js
   ```

## Features

1. **Retrieve Ads.txt Information:**

   - Given a domain, the web app displays a table with all the advertiser domains from the 'ads.txt' file.
   - The table includes the advertiser domain and the number of times each advertiser appears in the file.

2. **Clickable Domain Redirects:**

   - Clicking on a domain in the table redirects to the corresponding website.

3. **Percentage of Presence:**

   - The web app calculates the percentage of presence for each advertiser on the page.

4. **Table Manipulations:**

   - Users can manipulate the data in the table with operations such as filtering, sorting, and searching.
   - Options for starts with, contains, etc., are available for efficient data exploration.

5. **Export and Print:**
   - Users can export the table data to a CSV file for further analysis or reporting.
   - Printing functionality is available for creating hard copies of the table.

## Bonus Points

<!-- - The project is hosted on Heroku: [Heroku Demo](#) (replace with the actual Heroku link) -->

- Sorting and searching functionality is available in the results table.
- A loader is implemented in the UI to indicate when results are being retrieved.
- Users can download a JSON/CSV representation of the results from the UI.
- Caching is implemented on the server for improved performance when querying the same domain multiple times.
- Added unit tests for getAds logic.

## Project Structure

The project follows a client-server architecture, with the server handling scraping and parsing tasks, and the client presenting the results in a user-friendly UI.
