import HeroGenerator from "./components/HeroGenerator";
import PricingGenerator from "./components/PricingGenerator";
import TestimonialGenerator from "./components/TestimonialGenerator";
import ImageGenerator from "./components/ImageGenerator";
import ExportButton from "./components/ExportButton";
import ThemeToggle from "./components/ThemeToggle";
import { useState } from "react";
import SectionManager from "./components/SectionManager";
import Landing from "./components/Landing";
import "./index.css";

function App() {
  const [sections] = useState<string[]>([]);

  return (
    <>
      {/* 👑 Landing page at the top */}
      <Landing />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
        <ThemeToggle />
        <HeroGenerator />
        <PricingGenerator />
        <TestimonialGenerator />
        <ImageGenerator />
        <SectionManager />
        <ExportButton sections={sections} />
      </div>
    </>
  );
}

export default App;

