import type { WebsiteData } from "../App";

interface SidebarProps {
  currentStep: number;
  steps: { id: number; name: string; component: any }[];
  onStepChange: (step: number) => void;
  websiteData: WebsiteData;
}

export default function Sidebar({ currentStep, steps, onStepChange, websiteData }: SidebarProps) {
  return (
    <aside className="w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 overflow-y-auto animate-slide-down">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold gradient-text mb-2">Website Progress</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                currentStep === step.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              }`}
              onClick={() => onStepChange(step.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-white text-blue-600 shadow-md"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}>
                  {step.id}
                </div>
                <div className="flex-1">
                  <span className={`font-medium transition-colors duration-300 ${
                    currentStep === step.id
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                    {step.name}
                  </span>
                  {currentStep === step.id && (
                    <div className="mt-1">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
                {currentStep === step.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          Website Overview
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🏢</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Business</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {websiteData.story.businessName || "Not set"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📄</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Pages</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {websiteData.pages.length} pages created
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎨</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Theme</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {websiteData.theme.layout} layout
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-blue-500">{websiteData.pages.length}</div>
              <div className="text-gray-500 dark:text-gray-400">Pages</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-purple-500">{websiteData.navigation.items.length}</div>
              <div className="text-gray-500 dark:text-gray-400">Nav Items</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-green-500">{websiteData.story.services.length}</div>
              <div className="text-gray-500 dark:text-gray-400">Services</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-orange-500">{currentStep}</div>
              <div className="text-gray-500 dark:text-gray-400">Step</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
} 