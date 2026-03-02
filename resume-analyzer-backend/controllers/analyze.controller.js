const extractText = require('../services/pdf.service');
const { analyzeSkills } = require("../services/analyze.service");

async function analyze(req, res) {
    try {
        console.log("📥 ANALYZE API HIT");

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const text = await extractText(req.file.buffer);
        console.log("✅ PDF Extracted");

        const analysis = analyzeSkills(text, req.body.role);

        res.json(analysis);

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { analyze };