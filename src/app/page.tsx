"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";
import Card from "@/components/Card";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyApQcY06qqFCjj6yzJwgogJP9RV46PA158" });

export default function Home() {
  const [matches, setMatches] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuizSubmit = async (answers: any) => {
    setLoading(true);
    setError("");
    setMatches([]);
    setIndex(0);

    const prompt = `
A company is deciding which nonprofits to donate to based on the following preferences:
- Cause: ${answers.cause}
- Scope: ${answers.scope}
- Size: ${answers.size}
- Number of nonprofits: ${answers.count}

Please suggest ${answers.count} nonprofits that match this description.
Return the data in this exact JSON array format:

[
  {
    "name": "Nonprofit Name",
    "cause": "Cause category",
    "mission": "One-line mission statement",
    "location": "Location (city or global)",
    "annualcharity": "Annual Donations received",
    "peopleaffected": "How many benefit from charity in number form (i.e. 1m+",
    "website": "https://..."
  }
]
    `.trim();

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      const text = response.text;
      const jsonMatch = text.match(/```json([\s\S]*?)```/)?.[1] || text;
      const parsed = JSON.parse(jsonMatch.trim());
      setMatches(parsed.slice(0, answers.count));
    } catch (err: any) {
      console.error("Error generating nonprofit data:", err);
      setError("Failed to fetch suggestions. Please try again.");
    }

    setLoading(false);
  };

  const nextCard = () => {
    if (index + 1 < matches.length) {
      setIndex(index + 1);
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const resetQuiz = () => {
    setMatches([]);
    setIndex(0);
    setError("");
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-blue-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Your Matching Nonprofit
      </h1>

      {loading ? (
        <p className="text-center text-lg">Generating suggestions...</p>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : matches.length === 0 ? (
        <Quiz onSubmit={handleQuizSubmit} />
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <Card
            nonprofit={matches[index]}
            onNext={index + 1 < matches.length ? nextCard : undefined}
            onPrev={index > 0 ? prevCard : undefined}
          />

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </main>
  );
}
