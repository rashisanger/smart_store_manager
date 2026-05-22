const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ================= SAFE JSON PARSER =================
const safeJSONParse = (text) => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ JSON Parse Failed:", text);
    return [];
  }
};

// ================= GENERATE DESCRIPTION =================
const generateDescription = async ({ productName, category, price }) => {
  try {
    const prompt = `
You are an expert e-commerce copywriter.

Write a compelling 3-sentence product description.

Product: ${productName}
Category: ${category}
Price: $${price}

Focus on benefits, persuasive language, and customer appeal.

Return only plain text description.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq Error:", error.message);

    return `${productName} is a premium ${category} product designed for modern customers seeking quality and performance. Enjoy exceptional value and reliable functionality at an affordable price.`;
  }
};

// ================= GENERATE SEO TAGS =================
const generateSEOTags = async ({ productName, description }) => {
  try {
    const prompt = `
Generate exactly 8 SEO keyword tags.

Product: ${productName}
Description: ${description}

Return ONLY valid JSON array.
No markdown, no explanation.

Example:
["smart", "wireless", "portable"]
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 150,
    });

    return safeJSONParse(response.choices[0].message.content);
  } catch (error) {
    console.error("Groq Error:", error.message);

    return [
      "premium",
      "smart",
      "modern",
      "trending",
      "quality",
      "best",
      "sale",
      "popular",
    ];
  }
};

// ================= MARKETING CAPTION =================
const generateMarketingCaption = async ({ productName, description }) => {
  try {
    const prompt = `
Write one short social media marketing caption.

Product: ${productName}
Description: ${description}

Maximum 20 words.
Include CTA.
Return only text.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 80,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq Error:", error.message);

    return `Upgrade your lifestyle with ${productName} 🚀 Shop now!`;
  }
};

// ================= SALES SUGGESTIONS =================
const getSalesSuggestions = async (topProducts, revenueData) => {
  try {
    const prompt = `
You are a retail analytics AI.

Analyze data and return 3 business recommendations.

Top products:
${JSON.stringify(topProducts)}

Revenue data:
${JSON.stringify(revenueData)}

Return ONLY valid JSON array.
No markdown, no explanation.

Format:
[
  {
    "suggestion": "",
    "reason": "",
    "priority": "high"
  }
]
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 500,
    });

    return safeJSONParse(response.choices[0].message.content);
  } catch (error) {
    console.error("Groq Error:", error.message);

    return [
      {
        suggestion: "Promote best-selling products",
        reason: "High-performing products can increase revenue",
        priority: "high",
      },
      {
        suggestion: "Improve low-stock inventory",
        reason: "Avoid lost sales opportunities",
        priority: "medium",
      },
    ];
  }
};

// ================= EXPORTS =================
module.exports = {
  generateDescription,
  generateSEOTags,
  generateMarketingCaption,
  getSalesSuggestions,
};