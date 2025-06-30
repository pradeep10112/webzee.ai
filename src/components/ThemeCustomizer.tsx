import { useState } from "react";
import type { WebsiteData } from "../App";
import TemplateGallery from "./TemplateGallery";

interface ThemeCustomizerProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ThemeCustomizer({ websiteData, updateWebsiteData, onNext, onBack }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState("templates");

  const colorPresets = [
    { name: "Ocean Blue", primary: "#3B82F6", secondary: "#1F2937" },
    { name: "Purple Dream", primary: "#8B5CF6", secondary: "#1F2937" },
    { name: "Emerald Green", primary: "#10B981", secondary: "#1F2937" },
    { name: "Sunset Orange", primary: "#F97316", secondary: "#1F2937" },
    { name: "Rose Pink", primary: "#EC4899", secondary: "#1F2937" },
    { name: "Cyan Blue", primary: "#06B6D4", secondary: "#1F2937" }
  ];

  const fontOptions = [
    { name: "Inter", value: "Inter", preview: "Aa" },
    { name: "Poppins", value: "Poppins", preview: "Aa" },
    { name: "Roboto", value: "Roboto", preview: "Aa" },
    { name: "Open Sans", value: "Open Sans", preview: "Aa" },
    { name: "Montserrat", value: "Montserrat", preview: "Aa" },
    { name: "Playfair Display", value: "Playfair Display", preview: "Aa" }
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
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-down">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Customize Your Theme
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose from beautiful templates and customize colors, fonts, and layout to match your brand
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "templates"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            🎨 Templates
          </button>
          <button
            onClick={() => setActiveTab("colors")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "colors"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            🎨 Colors
          </button>
          <button
            onClick={() => setActiveTab("fonts")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "fonts"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            📝 Fonts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === "templates" && (
            <TemplateGallery websiteData={websiteData} updateWebsiteData={updateWebsiteData} />
          )}

          {activeTab === "colors" && (
            <div className="card p-8 animate-slide-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">Color Customization</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={websiteData.theme.primaryColor}
                      onChange={(e) => updateWebsiteData({
                        theme: { ...websiteData.theme, primaryColor: e.target.value }
                      })}
                      className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={websiteData.theme.primaryColor}
                      onChange={(e) => updateWebsiteData({
                        theme: { ...websiteData.theme, primaryColor: e.target.value }
                      })}
                      className="input-field flex-1"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={websiteData.theme.secondaryColor}
                      onChange={(e) => updateWebsiteData({
                        theme: { ...websiteData.theme, secondaryColor: e.target.value }
                      })}
                      className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={websiteData.theme.secondaryColor}
                      onChange={(e) => updateWebsiteData({
                        theme: { ...websiteData.theme, secondaryColor: e.target.value }
                      })}
                      className="input-field flex-1"
                      placeholder="#1F2937"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Color Presets</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {colorPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => updateWebsiteData({
                        theme: { ...websiteData.theme, primaryColor: preset.primary, secondaryColor: preset.secondary }
                      })}
                      className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: preset.primary }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: preset.secondary }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "fonts" && (
            <div className="card p-8 animate-slide-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">Typography</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Font Family
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {fontOptions.map((font) => (
                      <button
                        key={font.value}
                        onClick={() => updateWebsiteData({
                          theme: { ...websiteData.theme, fontFamily: font.value }
                        })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                          websiteData.theme.fontFamily === font.value
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div 
                          className="text-2xl font-bold mb-2"
                          style={{ fontFamily: font.value }}
                        >
                          {font.preview}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sample Heading</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This is how your text will look with the selected font and colors.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: websiteData.theme.primaryColor }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Primary Color</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: websiteData.theme.secondaryColor }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Secondary Color</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Font: <span className="font-medium">{websiteData.theme.fontFamily}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Layout: <span className="font-medium">{websiteData.theme.layout}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        
        <button onClick={onNext} className="btn-primary">
          Continue to Preview →
        </button>
      </div>
    </div>
  );
} 