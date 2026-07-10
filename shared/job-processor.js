import db from "../database/sqlite.js";
import score from "../scoring/score.js";
import EXCLUDE_KEYWORDS from "../config/exclude-keywords.js";

export function isExcluded(job) {
    const text = `${job.title ?? ""} ${job.location ?? ""}`.toLowerCase();
    return EXCLUDE_KEYWORDS.some(keyword => text.includes(keyword));
}

export function getProcessedJobs() {
    const jobs = db.prepare(`SELECT * FROM jobs`).all()
        .filter(job => !isExcluded(job));

    for (const job of jobs) {
        const result = score(job);
        job.score = result.score;
        job.reasons = result.reasons;
    }

    jobs.sort((a, b) => b.score - a.score);
    return jobs;
}