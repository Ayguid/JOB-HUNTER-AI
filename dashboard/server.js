import express from "express";
import config from "../config.js";
import { getProcessedJobs } from "../shared/job-processor.js";

const app = express();
app.use(express.static("dashboard/public"));

app.get("/api/jobs", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    const allJobs = getProcessedJobs();
    const total = allJobs.length;
    const paginatedJobs = allJobs.slice(offset, offset + limit);
    
    res.json({
        data: paginatedJobs,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    });
});

app.listen(config.port, () => {
    console.log(`Dashboard corriendo en http://localhost:${config.port}`);
});