import Database from "better-sqlite3";

const db = new Database("jobs.db");

db.exec(`
CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    source TEXT NOT NULL,
    external_id TEXT NOT NULL,

    company TEXT,
    title TEXT,

    location TEXT,
    remote INTEGER DEFAULT 0,

    url TEXT NOT NULL,

    salary TEXT,

    score INTEGER DEFAULT 0,

    applied INTEGER DEFAULT 0,
    favorite INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(source, external_id)
);
`);

export default db;