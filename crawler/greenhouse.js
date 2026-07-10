import axios from "axios";
import { buildJob, stripHtml } from "./utils.js";

const boards = [
    "automatticcareers", "canonical", "stripe", "mongodb",
    "duolingo", "vercel", "sourcegraph91", "planetscale", "gusto"
];

const fetchBoardJobs = async (board) => {
    try {
        const url = `https://boards-api.greenhouse.io/v1/boards/${board}/jobs?content=true`;
        const { data } = await axios.get(url);

        const boardJobs = data.jobs.map((job) => buildJob({
            source: "greenhouse",
            external_id: job.id,
            company: board,
            title: job.title,
            location: job.location?.name,
            url: job.absolute_url,
            description: stripHtml(job.content)
        }));

        console.log(`✅ ${board}: ${boardJobs.length} jobs`);
        return boardJobs;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn(`⚠️  ${board}: board not found`);
        } else if (error.response?.status === 429) {
            console.warn(`⏳ ${board}: rate limited (skipping)`);
        } else {
            console.warn(`❌ Error fetching ${board}:`, error.message);
        }
        return [];
    }
};

const fetchGreenhouseJobs = async () => {
    console.log("🔍 Searching Greenhouse...");

    const results = await Promise.all(boards.map(fetchBoardJobs));
    const jobs = results.flat();

    console.log(`📊 Total: ${jobs.length} jobs fetched from ${boards.length} boards`);

    return jobs;
};

export default fetchGreenhouseJobs;