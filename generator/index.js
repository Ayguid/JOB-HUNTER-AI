import fs from "fs";
import db from "../database/sqlite.js";
import score from "../scoring/score.js";
import generateCV from "./generateCV.js";

const id = process.argv[2];
const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get(id);

const analysis = score(job);
const cv = generateCV(job, analysis);

let md = "";

md += `<!--\n`;
md += `Job: ${job.title}\n`;
md += `Company: ${job.company}\n`;
md += `Location: ${job.location}\n`;
md += `URL: ${job.url}\n`;
md += `Score: ${analysis.score} pts\n`;
md += `-->\n\n`;

md += "# Guido Aimar\n\n";

md += "## Summary\n\n";
for (const item of cv.summary)
    md += `${item.text}\n\n`;

md += "## Skills\n\n";
for (const skill of cv.skills)
    md += `- ${skill}\n`;

md += "\n## Experience\n\n";
for (const exp of cv.experience) {
    md += `### ${exp.title} | ${exp.company}\n\n`;
    for (const bullet of exp.bullets)
        md += `- ${bullet.text}\n`;
    md += "\n";
}

fs.mkdirSync("./output", { recursive: true });
fs.writeFileSync("./output/cv.md", md);

console.log(`CV generado para: ${job.title} @ ${job.company} (score: ${analysis.score})`);