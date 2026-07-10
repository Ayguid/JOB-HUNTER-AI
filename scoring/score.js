import TAXONOMY from "../config/taxonomy.js";

const buildMatcher = (keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i");
};


const COMPILED = TAXONOMY.map(entry => ({
    ...entry,
    patterns: entry.keywords.map(buildMatcher),
}));

const score = (job) => {
    const text = [job.title, job.company, job.location, job.description]
        .filter(Boolean)
        .join(" ");

    const reasons = [];
    let total = 0;

    for (const entry of COMPILED) {
        const matchedKeyword = entry.keywords.find((keyword, index) =>
            entry.patterns[index].test(text)
        );

        if (matchedKeyword) {
            total += entry.points;
            reasons.push({
                tag: entry.tag,
                keyword: matchedKeyword,
                points: entry.points,
                label: entry.label
            });
        }
    }

    return { score: total, reasons, text };
};

export default score;