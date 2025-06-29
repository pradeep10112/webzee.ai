import Landing from "./components/Landing";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Newsletter from "./components/NewsletterForm";
import HeroGenerator from "./components/HeroGenerator";
import PricingGenerator from "./components/PricingGenerator";
import TestimonialGenerator from "./components/TestimonialGenerator";
import ImageGenerator from "./components/ImageGenerator";
import ExportButton from "./components/ExportButton";
import SectionManager from "./components/SectionManager";
import ThemeToggle from "./components/ThemeToggle";
import { useState } from "react";

import "./index.css";

function App() {
  const [sections] = useState<string[]>([]);

  return (
    <div className="font-sans text-gray-800">
      <Landing />
      <Features />
      <div className="p-4 space-y-6">
        <ThemeToggle />
        <HeroGenerator />
        <PricingGenerator />
        <TestimonialGenerator />
        <ImageGenerator />
        <SectionManager />
        <ExportButton sections={sections} />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
