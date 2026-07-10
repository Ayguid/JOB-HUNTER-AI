export function buildJob(job) {
    return {
        source: job.source,
        external_id: String(job.external_id),
        company: job.company ?? "",
        title: job.title ?? "",
        location: job.location ?? "",
        remote: (job.location ?? "").toLowerCase().includes("remote") ? 1 : 0,
        url: job.url ?? "",
        salary: null,
        description: job.description ?? ""
    };
}

export function stripHtml(html) {
    return (html ?? "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

export function normalizeJob(job) {
    return {
        ...job,
        title: (job.title ?? "").trim().replace(/\s+/g, " "),
        company: toTitleCase((job.company ?? "").trim()),
        location: (job.location ?? "").trim().replace(/\s*;\s*/g, "; "),
    };
}