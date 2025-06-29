import { useState } from "react";

function TestimonialGenerator() {
  const [name1, setName1] = useState("");
  const [quote1, setQuote1] = useState("");
  const [name2, setName2] = useState("");
  const [quote2, setQuote2] = useState("");
  const [testimonials, setTestimonials] = useState("");

  const handleGenerate = () => {
    setTestimonials(`🗣️ ${name1}: "${quote1}" | ${name2}: "${quote2}"`);
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">🌟 Testimonial Section Generator</h2>
      <input value={name1} onChange={(e) => setName1(e.target.value)} placeholder="Customer 1 Name" className="border p-2 w-full rounded" />
      <input value={quote1} onChange={(e) => setQuote1(e.target.value)} placeholder="Customer 1 Quote" className="border p-2 w-full rounded" />
      <input value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Customer 2 Name" className="border p-2 w-full rounded" />
      <input value={quote2} onChange={(e) => setQuote2(e.target.value)} placeholder="Customer 2 Quote" className="border p-2 w-full rounded" />
      <button
        onClick={handleGenerate}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Generate Testimonials
      </button>
      {testimonials && (
        <div className="p-4 bg-gray-100 rounded text-center font-semibold">{testimonials}</div>
      )}
    </div>
  );
}

export default TestimonialGenerator;
