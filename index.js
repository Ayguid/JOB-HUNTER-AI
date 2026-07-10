import fs from "fs";
import db from "./database/sqlite.js";
import { normalizeJob } from "./crawlers/utils.js";

console.clear();

let inserted = 0;

const stmt = db.prepare(`
INSERT OR IGNORE INTO jobs
(
    source,
    external_id,
    company,
    title,
    location,
    remote,
    url,
    salary,
    description
)
VALUES
(
    @source,
    @external_id,
    @company,
    @title,
    @location,
    @remote,
    @url,
    @salary,
    @description
)
`);

const crawlers = [];

const files = fs.readdirSync("./crawlers");

for (const file of files) {

    if (!file.endsWith(".js") || file === "utils.js")
        continue;

    const module = await import(`./crawlers/${file}`);

    if (!module.default)
        continue;

    crawlers.push({
        name: file.replace(".js", ""),
        run: module.default
    });

}

let totalFound = 0;

for (const crawler of crawlers) {

    console.log(`Searching ${crawler.name}...`);

    const jobs = (await crawler.run()).map(normalizeJob);

    totalFound += jobs.length;

    for (const job of jobs) {
        const result = stmt.run(job);
        if (result.changes) inserted++;
    }

    console.log(`${crawler.name}: ${jobs.length}`);

}

const total = db.prepare(`
SELECT COUNT(*) AS total
FROM jobs
`).get();

console.log("");
console.log("============== RESULT ==============");
console.log(`Crawlers : ${crawlers.length}`);
console.log(`Found    : ${totalFound}`);
console.log(`New      : ${inserted}`);
console.log(`Database : ${total.total}`);
console.log("====================================");