import axios from "axios";
import { buildJob } from "./utils.js";

const COMPANIES = [
    "railway", "posthog", "ramp", "notable", "harvey"
];

const fetchCompanyJobs = async (company) => {
    try {
        const url = `https://api.ashbyhq.com/posting-api/job-board/${company}?includeCompensation=false`;
        const { data } = await axios.get(url);

        const jobs = (data.jobs ?? []).map((job) => buildJob({
            source: "ashby",
            external_id: job.jobUrl,
            company,
            title: job.title,
            location: job.location,
            url: job.jobUrl,
            description: job.descriptionPlain
        }));

        console.log(`✅ ${company}: ${jobs.length} jobs`);
        return jobs;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn(`⚠️  ${company}: board not found`);
        } else if (error.response?.status === 429) {
            console.warn(`⏳ ${company}: rate limited (skipping)`);
        } else {
            console.warn(`❌ Error fetching ${company}:`, error.message);
        }
        return [];
    }
};

const fetchAshbyJobs = async () => {
    console.log("🔍 Searching Ashby...");

    const results = await Promise.all(COMPANIES.map(fetchCompanyJobs));
    const jobs = results.flat();

    console.log(`📊 Total: ${jobs.length} jobs fetched from ${COMPANIES.length} companies`);

    return jobs;
};

export default fetchAshbyJobs;