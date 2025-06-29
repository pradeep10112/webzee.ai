import HeroGenerator from "./components/HeroGenerator";
import PricingGenerator from "./components/PricingGenerator";
import TestimonialGenerator from "./components/TestimonialGenerator";
import ImageGenerator from "./components/ImageGenerator";
import ExportButton from "./components/ExportButton";
import ThemeToggle from "./components/ThemeToggle";
import SectionManager from "./components/SectionManager";
import Landing from "./components/Landing";
import NewsletterForm from "./components/NewsletterForm";

import { useState } from "react";
import "./index.css";

function App() {
  const [sections] = useState<string[]>([]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
      {/* Logo + Theme Toggle */}
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">🌐 Webzee.AI</h1>
        <ThemeToggle />
      </div>

      {/* Landing Section */}
      <Landing />

      {/* Section Generators */}
      <HeroGenerator />
      <PricingGenerator />
      <TestimonialGenerator />
      <ImageGenerator />

      {/* Section Manager */}
      <SectionManager />

      {/* Export Button */}
      <ExportButton sections={sections} />

      {/* Newsletter Signup */}
      <NewsletterForm />
    </div>
  );
}

export default App;
