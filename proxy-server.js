import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Replace with your actual Groq API key
const GROQ_API_KEY = "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";

app.use(cors());
app.use(express.json());

app.post("/rephrase", async (req, res) => {
  try {
    const { text } = req.body;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that rephrases text professionally and concisely."
          },
          {
            role: "user",
            content: `Rephrase this: ${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      }),
    });

    const data = await groqRes.json();

    if (data.choices && data.choices.length > 0) {
   const responseText = data.choices[0].message.content;
console.log("✅ Rephrased Text:", responseText);
console.log("Groq full response:", JSON.stringify(data, null, 2));

      res.json({ rephrased: responseText });
    } else {
      console.error("Unexpected response from Groq:", data);
      res.status(500).json({ error: "No valid response from Groq API" });
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
