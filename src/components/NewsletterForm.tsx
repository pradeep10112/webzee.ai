

const NewsletterForm = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg mt-10 text-center">
      <h2 className="text-2xl mb-4">Subscribe to our new updates!</h2>
      <form action="https://formspree.io/f/xrbkrnko" method="POST">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
