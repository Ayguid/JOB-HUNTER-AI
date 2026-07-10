import axios from "axios";

export default async function() {

    const companies = [
        "microventures", "posthog", "railway",
        "sourcegraph", "gusto", "buffer", "planetscale"
    ];

    const jobs = [];

    for (const company of companies) {

        try {

            const url = `https://api.lever.co/v0/postings/${company}?mode=json`;
            const { data } = await axios.get(url);

            data.forEach(job => {

                const description = [
                    job.descriptionPlain,
                    job.additionalPlain
                ].filter(Boolean).join(" ");

                jobs.push({
                    source: "lever",
                    external_id: String(job.id),
                    company: String(company),
                    title: String(job.text ?? ""),
                    location: String(job.categories?.location ?? ""),
                    remote: (job.categories?.location ?? "").toLowerCase().includes("remote") ? 1 : 0,
                    url: String(job.hostedUrl ?? ""),
                    salary: null,
                    description
                });

            });

        } catch {}

    }

    return jobs;

}