function NewsletterForm() {
  return (
    <section className="text-center my-10">
      <h2 className="text-2xl font-semibold">📧 Subscribe for Updates!</h2>
      <form
        action="https://formspree.io/f/xrbkrnko"
        method="POST"
        className="mt-4 space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="border px-4 py-2 rounded w-72"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default NewsletterForm;
