const axios = require('axios');

async function analyzeWithAI(resumeText, role) {
    try {
        const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
            {
                role: "system",
                content: "You are an ATS resume analyzer. Always respond in JSON."
            },
            {
                role: "user",
                content: `
Analyze this resume for role: ${role}

Resume:
${resumeText}
`
            }
        ],
        temperature: 0.3,

        // 🔥 THIS IS THE IMPORTANT PART
        response_format: {
            type: "json_object"
        }
    },
    {
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Resume Analyzer"
        }
    }
);

        return response.data.choices[0].message.content;

    } catch (error) {
        console.log("OpenRouter FULL ERROR:", error.response?.data);
        throw error;
    }
}

module.exports = { analyzeWithAI };