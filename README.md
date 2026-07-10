# Job Hunter AI

Job Hunter AI is a small Node.js automation tool for discovering and prioritizing job opportunities from public job boards. It crawls postings from Greenhouse and Lever-backed companies, stores them in a local SQLite database, scores them against a personalized taxonomy, and can generate a tailored CV draft for a selected job.

## What is implemented

- Crawls job postings from curated Greenhouse and Lever sources
- Stores jobs in a local SQLite database file named jobs.db
- Filters out clearly irrelevant titles with a configurable exclusion list
- Scores opportunities using a custom taxonomy of technologies, practices, and soft skills
- Displays the highest-ranked matches with the reasons behind each score
- Serves the ranked jobs through a local web dashboard
- Generates a Markdown CV draft in the output folder for a chosen job

## Tech stack

- Node.js
- JavaScript (ES modules)
- SQLite via better-sqlite3
- Axios for HTTP requests
- Cheerio for HTML cleanup
- Dotenv for environment configuration

## Project structure

- index.js — main entry point that runs all crawlers and inserts results into the database
- list.js — loads saved jobs, applies scoring, and prints the best matches
- crawler/greenhouse.js — crawler for Greenhouse boards
- crawler/lever.js — crawler for Lever companies
- config/taxonomy.js — scoring taxonomy and point values
- config/exclude-titles.js — list of job titles to skip
- database/sqlite.js — SQLite schema and DB initialization
- scoring/score.js — scoring logic for ranking opportunities
- generator/generateCV.js — builds a CV summary and experience selection from job matches
- generator/index.js — generates a Markdown CV file for a specific job
- dashboard/server.js — starts a local Express dashboard that serves ranked jobs
- dashboard/public/index.html — simple frontend for browsing results
- data/experience.js and data/summary.js — content used to generate the CV draft
- output/ — generated files such as cv.md

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the crawlers and save results to the database:

   ```bash
   npm start
   ```

3. Review the ranked jobs:

   ```bash
   npm run list
   ```

4. Start the web dashboard:

   ```bash
   npm run dashboard
   ```

   Then open http://localhost:3000 to browse the ranked jobs.

5. Generate a CV draft for a specific job ID from the list output:

   ```bash
   npm run generate -- 1
   ```

   The generated Markdown file will be written to output/cv.md.

6. Run the script in watch mode during development:

   ```bash
   npm run dev
   ```

## How it works

1. The main script loads every crawler module in the crawler folder.
2. Each crawler fetches job listings from its source and normalizes them.
3. Jobs are inserted into the jobs table in the SQLite database.
4. The listing script reads those records, removes excluded titles, and applies the scoring logic from the taxonomy.
5. The Express dashboard exposes the same ranked job data through a local API and a simple frontend.
6. The generator uses the matched tags to build a customized CV summary and experience section for a chosen job.

## Scoring

The current scoring model is driven by a configurable taxonomy in config/taxonomy.js. It rewards matches such as:

- Vue.js, Laravel, PHP, JavaScript, TypeScript, Node.js
- QA, Selenium, Cypress, Mocha
- Remote-friendly roles
- CI/CD, Docker, GitLab, DevOps
- Camunda, microservices, automation, documentation, leadership

The score is calculated from the title, company, location and description of each job.

## Configuration

The project uses a small environment-based configuration file. You can add a .env file if needed:

```env
PORT=3000
```

You can also tune the behavior by editing:

- config/taxonomy.js to adjust scoring rules and weights
- config/exclude-titles.js to filter out unwanted roles
- config/exclude-keywords.js to hide additional job titles or locations

## Notes

This repository now includes a lightweight local dashboard for reviewing ranked jobs, while the generator pipeline continues to produce Markdown CV drafts from the same data.
