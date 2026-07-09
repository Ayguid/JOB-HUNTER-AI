import db from "./database/sqlite.js";
import score from "./scoring/score.js";

const jobs = db.prepare(`
SELECT *
FROM jobs
`).all();

for (const job of jobs) {
    job.score = score(job);
}

jobs.sort((a, b) => b.score - a.score);

for (const job of jobs.slice(0, 50)) {

    console.log(`${job.score} pts`);
    console.log(job.title);
    console.log(job.company);
    console.log(job.location);
    console.log(job.url);
    console.log("-----------------------------------");

}