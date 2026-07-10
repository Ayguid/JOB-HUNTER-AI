import axios from "axios";

const boards = [
    "automattic", "canonical", "stripe", "mongodb",
    "duolingo", "vercel", "postgresml", "sourcegraph"
];

// ✅ stripHtml como arrow function
const stripHtml = (html) => (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ✅ Función principal como arrow function
const fetchGreenhouseJobs = async () => {
    const jobs = [];

    for (const board of boards) {
        try {
            const url = `https://boards-api.greenhouse.io/v1/boards/${board}/jobs?content=true`;
            const { data } = await axios.get(url);

            // ✅ Mapeo inline con arrow function
            const boardJobs = data.jobs.map((job) => ({
                source: "greenhouse",
                external_id: String(job.id),
                company: board,
                title: job.title ?? "",
                location: job.location?.name ?? "",
                remote: (job.location?.name ?? "").toLowerCase().includes("remote") ? 1 : 0,
                url: job.absolute_url,
                salary: null,
                description: stripHtml(job.content)
            }));

            jobs.push(...boardJobs);
        } catch (error) {
            console.warn(`❌ Error fetching ${board}:`, error.message);
        }
    }

    return jobs;
};

export default fetchGreenhouseJobs;