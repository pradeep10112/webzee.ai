import React, { useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/xrbkrnko", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(e.target as HTMLFormElement),
    });

    const data = await res.json();
    if (data.ok) {
      setStatus("Subscribed successfully!");
      setEmail("");
    } else {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-3 text-center">📧 Join Our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-3"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </form>
      {status && <p className="text-center mt-2 text-green-600">{status}</p>}
    </div>
  );
}

export default NewsletterForm;
