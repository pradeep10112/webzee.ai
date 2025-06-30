import type { WebsiteData } from "../App";

interface HeaderProps {
  currentStep: number;
  steps: { id: number; name: string; component: any }[];
  onStepChange: (step: number) => void;
  previewMode: boolean;
  onPreviewToggle: () => void;
}

export default function Header({ currentStep, steps, onStepChange, previewMode, onPreviewToggle }: HeaderProps) {
  return (
    <header className="glass-effect border-b border-gray-200 dark:border-gray-700 h-20 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3 animate-bounce-in">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">Buildows AI</h1>
        </div>
        
        <nav className="hidden md:flex space-x-1">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                currentStep === step.id
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-md"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {step.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onPreviewToggle}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            previewMode
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {previewMode ? "Exit Preview" : "Preview Website"}
        </button>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Step {currentStep} of {steps.length}</span>
        </div>
      </div>
    </header>
  );
} 