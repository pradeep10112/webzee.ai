import { useState } from "react";

function HeroGenerator() {
  const [title, setTitle] = useState("");
  const [heroText, setHeroText] = useState("");

  const handleGenerate = () => {
    if (title.trim() === "") return;
    setHeroText(`🚀 ${title} — your AI-powered digital hero section!`);
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">🖥️ AI Hero Section Generator</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your Hero Title"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Hero
      </button>
      {heroText && (
        <div className="p-4 bg-gray-100 rounded text-center font-semibold">{heroText}</div>
      )}
    </div>
  );
}

export default HeroGenerator;
