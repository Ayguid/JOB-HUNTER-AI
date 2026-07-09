import axios from "axios";

const boards = [
    "automattic",
    "canonical",
    "stripe",
    "mongodb",
    "duolingo",
    "vercel",
    "postgresml",
    "sourcegraph"
];

export default async function() {

    const jobs = [];

    for (const board of boards) {

        try {

            const url = `https://boards-api.greenhouse.io/v1/boards/${board}/jobs`;

            const { data } = await axios.get(url);

            for (const job of data.jobs) {

                jobs.push({

                    source: "greenhouse",

                    external_id: String(job.id),

                    company: board,

                    title: job.title ?? "",

                    location: job.location?.name ?? "",

                    remote: (job.location?.name ?? "")
                        .toLowerCase()
                        .includes("remote") ? 1 : 0,

                    url: job.absolute_url,

                    salary: null

                });

            }

        } catch {}

    }

    return jobs;

}