import { useState } from "react";
import type { WebsiteData } from "../App";

interface StoryBuilderProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StoryBuilder({ websiteData, updateWebsiteData, onNext, onBack }: StoryBuilderProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStorySubmit = async () => {
    if (!websiteData.story.businessName || !websiteData.story.description) {
      alert("Please fill in the business name and description");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedPages = [
        {
          id: "home",
          name: "Home",
          type: "hero",
          content: {
            title: websiteData.story.businessName,
            subtitle: websiteData.story.description,
            cta: "Get Started",
            background: "gradient"
          },
          order: 1
        },
        {
          id: "about",
          name: "About",
          type: "about",
          content: {
            title: "About Us",
            description: `We are ${websiteData.story.businessName}, dedicated to serving ${websiteData.story.targetAudience}.`,
            features: websiteData.story.services.slice(0, 3)
          },
          order: 2
        },
        {
          id: "services",
          name: "Services",
          type: "services",
          content: {
            title: "Our Services",
            services: websiteData.story.services.map(service => ({
              name: service,
              description: `Professional ${service.toLowerCase()} services`,
              icon: "star"
            }))
          },
          order: 3
        },
        {
          id: "contact",
          name: "Contact",
          type: "contact",
          content: {
            title: "Get In Touch",
            description: "Ready to work with us? Let's discuss your project.",
            form: true
          },
          order: 4
        }
      ];

      const generatedNavigation = {
        items: generatedPages.map(page => ({
          id: `nav-${page.id}`,
          label: page.name,
          pageId: page.id,
          order: page.order
        }))
      };

      updateWebsiteData({
        pages: generatedPages,
        navigation: generatedNavigation
      });
      
      setIsGenerating(false);
      onNext();
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-slide-down">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text text-shadow-lg">
              Tell Us Your Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Describe your business and we'll create a complete website that tells your story
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                Business Name *
              </label>
              <input
                type="text"
                value={websiteData.story.businessName}
                onChange={(e) => updateWebsiteData({
                  story: { ...websiteData.story, businessName: e.target.value }
                })}
                className="input-field group-hover:shadow-lg transition-all duration-300"
                placeholder="Enter your business name"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                Target Audience
              </label>
              <input
                type="text"
                value={websiteData.story.targetAudience}
                onChange={(e) => updateWebsiteData({
                  story: { ...websiteData.story, targetAudience: e.target.value }
                })}
                className="input-field group-hover:shadow-lg transition-all duration-300"
                placeholder="e.g., Small businesses, Tech startups"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
                Business Description *
              </label>
              <textarea
                value={websiteData.story.description}
                onChange={(e) => updateWebsiteData({
                  story: { ...websiteData.story, description: e.target.value }
                })}
                rows={4}
                className="input-field group-hover:shadow-lg transition-all duration-300 resize-none"
                placeholder="Describe what your business does, your mission, and what makes you unique..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mr-2">4</span>
              Services/Products (one per line)
            </label>
            <textarea
              value={websiteData.story.services.join('\n')}
              onChange={(e) => updateWebsiteData({
                story: { ...websiteData.story, services: e.target.value.split('\n').filter(s => s.trim()) }
              })}
              rows={3}
              className="input-field group-hover:shadow-lg transition-all duration-300 resize-none"
              placeholder="Web Design&#10;Digital Marketing&#10;Consulting"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2">5</span>
              Business Goals
            </label>
            <textarea
              value={websiteData.story.goals.join('\n')}
              onChange={(e) => updateWebsiteData({
                story: { ...websiteData.story, goals: e.target.value.split('\n').filter(s => s.trim()) }
              })}
              rows={3}
              className="input-field group-hover:shadow-lg transition-all duration-300 resize-none"
              placeholder="Increase online presence&#10;Generate more leads&#10;Showcase portfolio"
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analysis Progress</h3>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Analyzing business structure</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Identifying target audience</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">AI</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Generating website structure</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={onBack}
            className="btn-secondary"
          >
            ← Back
          </button>
          
          <button
            onClick={handleStorySubmit}
            disabled={isGenerating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Website...</span>
              </>
            ) : (
              <>
                <span className="text-xl">✨</span>
                <span>Generate My Website</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 