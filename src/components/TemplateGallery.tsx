import { useState } from "react";
import type { WebsiteData } from "../App";

interface TemplateGalleryProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  colors: { primary: string; secondary: string };
  features: string[];
}

export default function TemplateGallery({ websiteData, updateWebsiteData }: TemplateGalleryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates: Template[] = [
    {
      id: "modern-business",
      name: "Modern Business",
      description: "Clean and professional design for corporate businesses",
      category: "business",
      preview: "🏢",
      colors: { primary: "#3B82F6", secondary: "#1F2937" },
      features: ["Hero Section", "About", "Services", "Contact"]
    },
    {
      id: "creative-agency",
      name: "Creative Agency",
      description: "Bold and creative design for agencies and studios",
      category: "creative",
      preview: "🎨",
      colors: { primary: "#8B5CF6", secondary: "#1F2937" },
      features: ["Portfolio", "Team", "Services", "Contact"]
    },
    {
      id: "tech-startup",
      name: "Tech Startup",
      description: "Modern and innovative design for tech companies",
      category: "tech",
      preview: "🚀",
      colors: { primary: "#10B981", secondary: "#1F2937" },
      features: ["Product", "Features", "Pricing", "Contact"]
    },
    {
      id: "restaurant",
      name: "Restaurant",
      description: "Warm and inviting design for food businesses",
      category: "food",
      preview: "🍽️",
      colors: { primary: "#F97316", secondary: "#1F2937" },
      features: ["Menu", "About", "Gallery", "Reservations"]
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Elegant design for showcasing personal work",
      category: "portfolio",
      preview: "📸",
      colors: { primary: "#EC4899", secondary: "#1F2937" },
      features: ["Work", "About", "Skills", "Contact"]
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Professional design for online stores",
      category: "ecommerce",
      preview: "🛍️",
      colors: { primary: "#06B6D4", secondary: "#1F2937" },
      features: ["Products", "Categories", "About", "Contact"]
    }
  ];

  const categories = [
    { id: "all", name: "All Templates", icon: "🌟" },
    { id: "business", name: "Business", icon: "🏢" },
    { id: "creative", name: "Creative", icon: "🎨" },
    { id: "tech", name: "Tech", icon: "🚀" },
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "portfolio", name: "Portfolio", icon: "📸" },
    { id: "ecommerce", name: "E-commerce", icon: "🛍️" }
  ];

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || template.category === selectedCategory
  );

  const applyTemplate = (template: Template) => {
    updateWebsiteData({
      theme: {
        ...websiteData.theme,
        primaryColor: template.colors.primary,
        secondaryColor: template.colors.secondary,
        layout: template.id
      }
    });
    setSelectedTemplate(template.id);
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">Choose Your Template</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select a template that matches your business style and we'll customize it for you
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:scale-105 ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => applyTemplate(template)}
          >
            <div className="text-center mb-4">
              <div 
                className="w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                style={{ backgroundColor: template.colors.primary }}
              >
                {template.preview}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {template.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Primary Color:</span>
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: template.colors.primary }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Secondary Color:</span>
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: template.colors.secondary }}
                ></div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Includes:</h4>
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {selectedTemplate === template.id && (
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="text-sm font-medium">✓ Selected</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Template Applied Successfully!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your website will now use the selected template design and colors.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 