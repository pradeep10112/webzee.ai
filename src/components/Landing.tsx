function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-5xl font-bold mb-4 text-center">🚀 Welcome to WebCraft</h1>
      <p className="text-lg text-center max-w-xl mb-8">
        AI-powered Website Section Generator for Hero, Pricing, Testimonials, and Images.  
        Build faster than ever, no coding needed ⚡.
      </p>
      <a href="#app" className="bg-white text-black font-bold py-2 px-6 rounded-xl hover:bg-gray-200 transition">
        Start Building Now
      </a>
    </div>
  )
}
export default Landing;
