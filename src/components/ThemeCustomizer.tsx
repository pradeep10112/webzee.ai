import { useState } from "react";
import type { WebsiteData } from "../App";

interface ThemeCustomizerProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ThemeCustomizer({ websiteData, updateWebsiteData, onNext, onBack }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState("colors");

  const colorPresets = [
    { name: "Blue", primary: "#3B82F6", secondary: "#1F2937" },
    { name: "Purple", primary: "#8B5CF6", secondary: "#1F2937" },
    { name: "Green", primary: "#10B981", secondary: "#1F2937" },
    { name: "Red", primary: "#EF4444", secondary: "#1F2937" },
    { name: "Orange", primary: "#F97316", secondary: "#1F2937" },
    { name: "Teal", primary: "#14B8A6", secondary: "#1F2937" }
  ];

  const fontPresets = [
    { name: "Inter", value: "Inter" },
    { name: "Roboto", value: "Roboto" },
    { name: "Open Sans", value: "Open Sans" },
    { name: "Poppins", value: "Poppins" },
    { name: "Montserrat", value: "Montserrat" },
    { name: "Lato", value: "Lato" }
  ];

  const layoutPresets = [
    { name: "Modern", value: "modern", description: "Clean and contemporary design" },
    { name: "Classic", value: "classic", description: "Traditional and professional" },
    { name: "Minimal", value: "minimal", description: "Simple and focused" },
    { name: "Bold", value: "bold", description: "Strong and impactful" }
  ];

  const updateTheme = (field: string, value: string) => {
    updateWebsiteData({
      theme: { ...websiteData.theme, [field]: value }
    });
  };

  const applyColorPreset = (preset: { primary: string; secondary: string }) => {
    updateTheme("primaryColor", preset.primary);
    updateTheme("secondaryColor", preset.secondary);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Customize Your Theme
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Choose colors, fonts, and layout to match your brand identity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme Preview</h2>
            
            <div 
              className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              style={{ fontFamily: websiteData.theme.fontFamily }}
            >
              {/* Header Preview */}
              <div 
                className="p-4"
                style={{ backgroundColor: websiteData.theme.primaryColor }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">{websiteData.story.businessName || "Your Business"}</h3>
                  <nav className="flex space-x-4">
                    <a href="#" className="text-white/80 hover:text-white text-sm">Home</a>
                    <a href="#" className="text-white/80 hover:text-white text-sm">About</a>
                    <a href="#" className="text-white/80 hover:text-white text-sm">Contact</a>
                  </nav>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-6 bg-white dark:bg-gray-800">
                <h4 className="text-xl font-bold mb-2" style={{ color: websiteData.theme.primaryColor }}>
                  Welcome to Our Site
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This is how your content will look with the selected theme.
                </p>
                <button 
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: websiteData.theme.primaryColor }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Controls */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("colors")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "colors"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Colors
              </button>
              <button
                onClick={() => setActiveTab("fonts")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "fonts"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Fonts
              </button>
              <button
                onClick={() => setActiveTab("layout")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "layout"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Layout
              </button>
            </div>

            {activeTab === "colors" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Color Presets</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyColorPreset(preset)}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: preset.primary }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: preset.secondary }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={websiteData.theme.primaryColor}
                        onChange={(e) => updateTheme("primaryColor", e.target.value)}
                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={websiteData.theme.primaryColor}
                        onChange={(e) => updateTheme("primaryColor", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={websiteData.theme.secondaryColor}
                        onChange={(e) => updateTheme("secondaryColor", e.target.value)}
                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={websiteData.theme.secondaryColor}
                        onChange={(e) => updateTheme("secondaryColor", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fonts" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Font Family</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {fontPresets.map((font) => (
                      <button
                        key={font.value}
                        onClick={() => updateTheme("fontFamily", font.value)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          websiteData.theme.fontFamily === font.value
                            ? "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{font.name}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "layout" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layout Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {layoutPresets.map((layout) => (
                      <button
                        key={layout.value}
                        onClick={() => updateTheme("layout", layout.value)}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          websiteData.theme.layout === layout.value
                            ? "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white">{layout.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{layout.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700"
        >
          Preview & Deploy
        </button>
      </div>
    </div>
  );
} 