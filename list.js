import { getProcessedJobs } from "./shared/job-processor.js";

const jobs = getProcessedJobs();

for (const job of jobs.slice(0, 50)) {
    console.log(`#${job.id} — ${job.score} pts`);
    for (const reason of job.reasons.sort((a, b) => b.points - a.points))
        console.log(` +${reason.points} ${reason.tag}`);
    console.log(job.title);
    console.log(job.company);
    console.log(job.location);
    console.log(job.url);
    console.log("-----------------------------------");
}