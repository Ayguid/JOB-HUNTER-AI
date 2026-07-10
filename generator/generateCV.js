import experience from "../data/experience.js";
import summary from "../data/summary.js";
import TAXONOMY from "../config/taxonomy.js";

export default function generateCV(job, analysis) {

    const matched = analysis.reasons.map(r => r.tag.toLowerCase());

    return {

        summary: summary.filter(item =>
            item.tags.some(tag =>
                tag === "default" || matched.includes(tag.toLowerCase())
            )
        ),

        skills: TAXONOMY
            .filter(entry => entry.label && matched.includes(entry.tag.toLowerCase()))
            .map(entry => entry.label),

        experience: experience
            .map(exp => ({
                ...exp,
                bullets: exp.bullets.filter(bullet =>
                    bullet.tags.some(tag =>
                        matched.includes(tag.toLowerCase())
                    )
                )
            }))
            .filter(exp => exp.bullets.length)

    };

}