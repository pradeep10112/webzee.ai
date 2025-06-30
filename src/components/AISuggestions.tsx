import { useState } from "react";
import type { WebsiteData } from "../App";

interface AISuggestionsProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
}

export default function AISuggestions({ websiteData, updateWebsiteData }: AISuggestionsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generating suggestions
    setTimeout(() => {
      const newSuggestions = [
        {
          type: "content",
          title: "Enhanced Business Description",
          content: `Transform your business into a compelling story that resonates with ${websiteData.story.targetAudience || 'your target audience'}.`,
          action: () => {
            const enhancedDescription = `${websiteData.story.businessName} is a forward-thinking company dedicated to delivering exceptional ${websiteData.story.services[0]?.toLowerCase() || 'services'} that empower ${websiteData.story.targetAudience || 'businesses'} to achieve their goals. With years of experience and a passion for innovation, we create solutions that drive real results.`;
            updateWebsiteData({
              story: { ...websiteData.story, description: enhancedDescription }
            });
          }
        },
        {
          type: "services",
          title: "Additional Service Ideas",
          content: "Based on your business, consider adding these complementary services:",
          suggestions: ["Consultation", "Training", "Support", "Maintenance"],
          action: () => {
            const newServices = [...websiteData.story.services, "Consultation", "Training"];
            updateWebsiteData({
              story: { ...websiteData.story, services: newServices }
            });
          }
        },
        {
          type: "goals",
          title: "Business Goal Recommendations",
          content: "Here are some strategic goals that align with your business:",
          suggestions: ["Increase market share by 25%", "Improve customer satisfaction", "Expand to new markets", "Launch new product lines"],
          action: () => {
            const newGoals = [...websiteData.story.goals, "Increase market share by 25%", "Improve customer satisfaction"];
            updateWebsiteData({
              story: { ...websiteData.story, goals: newGoals }
            });
          }
        }
      ];
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">AI Suggestions</h2>
        <button
          onClick={generateSuggestions}
          disabled={isGenerating}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🤖</span>
              <span>Get AI Suggestions</span>
            </>
          )}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">AI</span>
                    {suggestion.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {suggestion.content}
                  </p>
                  
                  {suggestion.suggestions && (
                    <div className="mb-3">
                      <ul className="space-y-1">
                        {suggestion.suggestions.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={suggestion.action}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {suggestions.length === 0 && !isGenerating && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ready for AI Insights
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get intelligent suggestions to enhance your website content and improve your business messaging.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Content Optimization
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Service Ideas
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Goal Setting
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 