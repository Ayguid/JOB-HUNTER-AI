import RULES from "../config/rules.js";

// Matchea la keyword como palabra/frase completa, no como substring de otra
// palabra (ej: "qa" no matchea dentro de "square"). El "." en variantes tipo
// "vue.js" o "node.js" se escapa para que sea literal.
function buildMatcher(keyword) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i");
}

const COMPILED_RULES = RULES.map(rule => ({
    ...rule,
    patterns: rule.keywords.map(buildMatcher),
}));

export default function score(job) {
    const text = [
        job.title,
        job.company,
        job.location,
        job.description
    ]
        .filter(Boolean)
        .join(" ");

    const reasons = [];
    let total = 0;

    for (const rule of COMPILED_RULES) {
        const matchedKeyword = rule.keywords.find((keyword, index) =>
            rule.patterns[index].test(text)
        );

        if (matchedKeyword) {

            total += rule.points;

            reasons.push({
                keyword: matchedKeyword,
                points: rule.points,
                reason: rule.reason
            });

        }
    }

    return { score: total, reasons, text};
}