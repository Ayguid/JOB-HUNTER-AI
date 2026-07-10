import db from "./database/sqlite.js";
import score from "./scoring/score.js";
import EXCLUDE_TITLES from "./config/exclude-titles.js";

function isExcluded(job) {
    const title = (job.title ?? "").toLowerCase();
    return EXCLUDE_TITLES.some(keyword => title.includes(keyword));
}

const jobs = db.prepare(`SELECT * FROM jobs`).all()
    .filter(job => !isExcluded(job));

for (const job of jobs) {
    const result = score(job);
    job.score = result.score;
    job.reasons = result.reasons;
    //job.text = result.text;
}

jobs.sort((a, b) => b.score - a.score);

for (const job of jobs.slice(0, 50)) {

    console.log(`#${job.id} — ${job.score} pts`);

    for (const reason of job.reasons.sort((a, b) => b.points - a.points))
        console.log(` +${reason.points} ${reason.tag}`);

    //console.log(job.text);
    console.log(job.title);
    console.log(job.company);
    console.log(job.location);
    console.log(job.url);
    console.log("-----------------------------------");

}