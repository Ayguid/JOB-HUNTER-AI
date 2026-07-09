export default function score(job) {

    let score = 0;
    const reasons = [];

    const text = `
        ${job.title}
        ${job.company}
        ${job.location}
    `.toLowerCase();

    function add(points, reason) {
        score += points;
        reasons.push({
            points,
            reason
        });
    }

    if (text.includes("vue")) add(20, "Vue");
    if (text.includes("laravel")) add(20, "Laravel");
    if (text.includes("php")) add(15, "PHP");
    if (text.includes("node")) add(10, "Node");
    if (text.includes("typescript")) add(8, "TypeScript");
    if (text.includes("javascript")) add(8, "JavaScript");

    if (text.includes("remote")) add(20, "Remote");

    if (text.includes("qa")) add(15, "QA");

    if (text.includes("selenium")) add(15, "Selenium");

    if (text.includes("cypress")) add(10, "Cypress");

    if (text.includes("solution")) add(15, "Solutions Engineer");

    if (text.includes("consult")) add(10, "Consulting");

    if (text.includes("documentation")) add(15, "Documentation");

    if (text.includes("technical writer")) add(20, "Technical Writer");

    if (text.includes("senior")) add(5, "Senior");

    return {
        score,
        reasons
    };

}