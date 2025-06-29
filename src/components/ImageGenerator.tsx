import { useState } from "react";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const handleGenerate = () => {
    setImage(`https://via.placeholder.com/600x300?text=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">🖼️ AI Image Placeholder Generator</h2>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter image title/prompt"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Generate Image
      </button>
      {image && (
        <div className="p-2 bg-gray-100 rounded">
          <img src={image} alt={prompt} className="rounded" />
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
