# Job Hunter AI

Job Hunter AI is a small Node.js project that helps you discover and prioritize job opportunities from public job boards. It crawls postings from Greenhouse and Lever-backed companies, stores them in a local SQLite database, and assigns a simple relevance score based on keywords found in the job title, company, and location.

## Features

- Crawls job postings from multiple Greenhouse boards
- Crawls job postings from multiple Lever companies
- Stores jobs in a local SQLite database
- Scores jobs using a keyword-based heuristic
- Prints the highest-scoring opportunities for review

## Tech Stack

- Node.js
- JavaScript (ES modules)
- SQLite via better-sqlite3
- Axios for HTTP requests
- Dotenv for environment configuration

## Project Structure

- index.js — main entry point that runs all crawlers and inserts results into the database
- list.js — reads jobs from the database, scores them, and prints the best matches
- crawler/ — crawler implementations for different job board providers
  - greenhouse.js
  - lever.js
- database/sqlite.js — SQLite schema and database setup
- scoring/score.js — scoring logic for ranking opportunities
- generator/ — placeholder modules for future cover letter/CV generation helpers
- config.js — simple configuration loader

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the crawler:

   ```bash
   npm start
   ```

   This will scan the configured sources, collect jobs, and save them to a local SQLite database file named jobs.db.

3. List the best-ranked jobs:

   ```bash
   npm run list
   ```

4. Start the app in watch mode during development:

   ```bash
   npm run dev
   ```

## How It Works

1. The main script loads every crawler module in the crawler folder.
2. Each crawler fetches job listings from its source.
3. Jobs are inserted into the jobs table in the SQLite database.
4. The listing script reads those records, applies the scoring logic, and displays the top-ranked results.

## Scoring

The current scoring model gives points for keywords such as:

- Vue, Laravel, PHP, Node.js, JavaScript, TypeScript
- QA, Selenium, Cypress
- Solutions Engineer, Implementation, Consultant
- Documentation, Technical Writer
- Remote work

The score is calculated from the job title, company, and location text.

## Configuration

The project uses a simple environment-based config file. If needed, you can add a .env file with values such as:

```env
PORT=3000
```

## Notes

This repository is currently a lightweight automation script rather than a full web app. The dashboard and generator folders are present as starting points for future expansion.
