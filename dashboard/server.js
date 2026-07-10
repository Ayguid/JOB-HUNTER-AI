import express from "express";
import config from "../config.js";
import db from "../database/sqlite.js";
import score from "../scoring/score.js";
import EXCLUDE_KEYWORDS from "../config/exclude-keywords.js";

const app = express();

function isExcluded(job) {
    const text = `${job.title ?? ""} ${job.location ?? ""}`.toLowerCase();
    return EXCLUDE_KEYWORDS.some(keyword => text.includes(keyword));
}

app.use(express.static("dashboard/public"));

app.get("/api/jobs", (req, res) => {

    const jobs = db.prepare(`SELECT * FROM jobs`).all()
        .filter(job => !isExcluded(job));

    for (const job of jobs) {
        const result = score(job);
        job.score = result.score;
        job.reasons = result.reasons;
    }

    jobs.sort((a, b) => b.score - a.score);

    res.json(jobs);

});

app.listen(config.port, () => {
    console.log(`Dashboard corriendo en http://localhost:${config.port}`);
});