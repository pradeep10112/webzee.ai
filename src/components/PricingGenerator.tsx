import { useState } from "react";

function PricingGenerator() {
  const [plan1, setPlan1] = useState("");
  const [price1, setPrice1] = useState("");
  const [plan2, setPlan2] = useState("");
  const [price2, setPrice2] = useState("");
  const [pricing, setPricing] = useState("");

  const handleGenerate = () => {
    setPricing(`✨ ${plan1}: ₹${price1} / ${plan2}: ₹${price2}`);
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">💸 Smart Pricing Section Generator</h2>
      <input
        value={plan1}
        onChange={(e) => setPlan1(e.target.value)}
        placeholder="Plan 1 Title"
        className="border p-2 w-full rounded"
      />
      <input
        value={price1}
        onChange={(e) => setPrice1(e.target.value)}
        placeholder="₹ Price"
        className="border p-2 w-full rounded"
      />
      <input
        value={plan2}
        onChange={(e) => setPlan2(e.target.value)}
        placeholder="Plan 2 Title"
        className="border p-2 w-full rounded"
      />
      <input
        value={price2}
        onChange={(e) => setPrice2(e.target.value)}
        placeholder="₹ Price"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Pricing
      </button>
      {pricing && (
        <div className="p-4 bg-gray-100 rounded text-center font-semibold">{pricing}</div>
      )}
    </div>
  );
}

export default PricingGenerator;
