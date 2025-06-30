import type { WebsiteData } from "../App";
import ProgressTracker from "./ProgressTracker";

interface SidebarProps {
  currentStep: number;
  steps: { id: number; name: string; component: any }[];
  onStepChange: (step: number) => void;
  websiteData: WebsiteData;
}

export default function Sidebar({ currentStep, steps, onStepChange, websiteData }: SidebarProps) {
  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">WebCraft</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Website Builder</p>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <ProgressTracker currentStep={currentStep} websiteData={websiteData} />

        {/* Step Navigation */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Steps</h3>
          <div className="space-y-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => onStepChange(step.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  currentStep === step.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}>
                    {step.id}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Step {step.id} of {steps.length}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-lg">💾</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Save Progress</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔄</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Reset Website</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-lg">❓</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Help & Support</span>
              </div>
            </button>
          </div>
        </div>

        {/* Website Info */}
        {websiteData.story.businessName && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Website Info</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Business:</span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {websiteData.story.businessName}
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Pages:</span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {websiteData.pages.length} pages created
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Theme:</span>
                <div className="font-medium text-gray-900 dark:text-white capitalize">
                  {websiteData.theme.layout}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 