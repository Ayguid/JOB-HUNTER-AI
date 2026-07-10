import axios from "axios";

const COMPANIES = [
    "microventures", "posthog", "railway",
    "sourcegraph", "gusto", "buffer", "planetscale"
];

const transformJob = (job, company) => {
    const description = [job.descriptionPlain, job.additionalPlain]
        .filter(Boolean)
        .join(" ");

    return {
        source: "lever",
        external_id: String(job.id),
        company: String(company),
        title: String(job.text ?? ""),
        location: String(job.categories?.location ?? ""),
        remote: (job.categories?.location ?? "").toLowerCase().includes("remote") ? 1 : 0,
        url: String(job.hostedUrl ?? ""),
        salary: null,
        description
    };
};

const fetchCompanyJobs = async (company) => {
    try {
        const url = `https://api.lever.co/v0/postings/${company}?mode=json`;
        const { data } = await axios.get(url);
        
        const jobs = data.map((job) => transformJob(job, company));
        console.log(`✅ ${company}: ${jobs.length} jobs`);
        
        return jobs;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn(`⚠️  ${company}: company not found`);
        } else if (error.response?.status === 429) {
            console.warn(`⏳ ${company}: rate limited (skipping)`);
        } else {
            console.warn(`❌ Error fetching ${company}:`, error.message);
        }
        return [];
    }
};


const fetchLeverJobs = async () => {
    console.log("🔍 Searching Lever...");
    
    const results = await Promise.all(
        COMPANIES.map(fetchCompanyJobs)
    );
    
    const jobs = results.flat();
    console.log(`📊 Total: ${jobs.length} jobs fetched from ${COMPANIES.length} companies`);
    
    return jobs;
};

export default fetchLeverJobs;