import type { WebsiteData } from "../App";

interface ProgressTrackerProps {
  currentStep: number;
  websiteData: WebsiteData;
}

export default function ProgressTracker({ currentStep, websiteData }: ProgressTrackerProps) {
  const steps = [
    { id: 1, name: "Story", icon: "📖", completed: !!websiteData.story.businessName },
    { id: 2, name: "Pages", icon: "📄", completed: websiteData.pages.length > 0 },
    { id: 3, name: "Navigation", icon: "🧭", completed: websiteData.navigation.items.length > 0 },
    { id: 4, name: "Theme", icon: "🎨", completed: websiteData.theme.layout !== "modern" },
    { id: 5, name: "Deploy", icon: "🚀", completed: false }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {completedSteps} of {steps.length} completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              step.completed
                ? "bg-green-500 text-white"
                : currentStep === step.id
                ? "bg-blue-500 text-white animate-pulse"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>
              {step.completed ? "✓" : step.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium transition-colors ${
                  step.completed
                    ? "text-green-600 dark:text-green-400"
                    : currentStep === step.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                  {step.name}
                </span>
                {step.completed && (
                  <span className="text-xs text-green-500">✓ Done</span>
                )}
              </div>
              {currentStep === step.id && (
                <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                  Currently working on this step
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Status */}
      {completedSteps === steps.length - 1 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🎉</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Almost There!
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Just one more step to complete your website.
              </p>
            </div>
          </div>
        </div>
      )}

      {completedSteps === steps.length && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🚀</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Website Complete!
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your website is ready to be deployed and shared with the world.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">💡 Tips</h4>
        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
          {currentStep === 1 && (
            <p>• Be specific about your business to get better AI suggestions</p>
          )}
          {currentStep === 2 && (
            <p>• Add multiple pages to create a comprehensive website</p>
          )}
          {currentStep === 3 && (
            <p>• Organize your navigation logically for better user experience</p>
          )}
          {currentStep === 4 && (
            <p>• Choose colors that match your brand identity</p>
          )}
          {currentStep === 5 && (
            <p>• Preview your website before deploying to ensure everything looks perfect</p>
          )}
        </div>
      </div>
    </div>
  );
} 