

const Newsletter = () => {
  return (
    <section className="py-14 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4">Subscribe for Updates</h2>
      <form
        action="https://formspree.io/f/xrbkrnko"
        method="POST"
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border px-4 py-2 rounded w-72"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
