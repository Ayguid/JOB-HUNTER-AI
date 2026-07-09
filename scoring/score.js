export default function score(job) {

    let score = 0;

    const text = (
        job.title + " " +
        job.company + " " +
        job.location
    ).toLowerCase();

    if (text.includes("vue")) score += 20;
    if (text.includes("laravel")) score += 20;
    if (text.includes("php")) score += 15;
    if (text.includes("node")) score += 10;
    if (text.includes("javascript")) score += 8;
    if (text.includes("typescript")) score += 8;

    if (text.includes("qa")) score += 12;
    if (text.includes("selenium")) score += 12;
    if (text.includes("cypress")) score += 10;

    if (text.includes("solutions engineer")) score += 18;
    if (text.includes("implementation")) score += 15;
    if (text.includes("consultant")) score += 12;

    if (text.includes("documentation")) score += 15;
    if (text.includes("technical writer")) score += 20;

    if (text.includes("remote")) score += 20;

    return score;

}