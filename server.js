const express = require("express");
const fs = require("fs");

app = express();
port = process.env.PORT || 3000;

const VOCABULARY = __dirname + "/vocabulary/";

// Helper functions
function openFile(file) {
  const data = fs.readFileSync(VOCABULARY + file, "utf-8");
  let words = data.split(/\n/).map((word) => word.trim());
  return words;
}

const NOUNS = openFile("nouns.txt");
const VERBS = openFile("verbs.txt");
const ADJECTIVES = openFile("adjectives.txt");
const ADVERBS = openFile("adverbs.txt");

app.get("/", (req, res) => {
  res.send("<h1>Hello, there</h1>");
});

// Main routes
app.get("/api/v1/nouns", (req, res) => {
  let start = req.query.start || "";
  let end = req.query.end || "";
  let regexp = new RegExp(`^${start}[a-zA-Z]*${end}$`);
  let matches = NOUNS.filter((word) => word.match(regexp));
  res.json({
    matches,
    count: matches.length,
  });
});

app.get("/api/v1/verbs", (req, res) => {
  let start = req.query.start || "";
  let end = req.query.end || "";
  // let limit = req.query.limit || 100;
  let regexp = new RegExp(`^${start}[a-zA-Z]*${end}$`);
  let matches = VERBS.filter((word) => word.match(regexp));
  res.json({
    matches,
    count: matches.length,
  });
});

app.get("/api/v1/adjectives", (req, res) => {
  let start = req.query.start || "";
  let end = req.query.end || "";
  let regexp = new RegExp(`^${start}[a-zA-Z]*${end}$`);
  let matches = ADJECTIVES.filter((word) => word.match(regexp));
  res.json({
    matches,
    count: matches.length,
  });
});

app.get("/api/v1/adverbs", (req, res) => {
  let start = req.query.start || "";
  let end = req.query.end || "";
  let regexp = new RegExp(`^${start}[a-zA-Z]*${end}$`);
  let matches = ADVERBS.filter((word) => word.match(regexp));
  res.json({
    matches,
    count: matches.length,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
