import { useState, useEffect } from "react";

interface LandingProps {
  onStartBuilder?: () => void;
}

export default function Landing({ onStartBuilder }: LandingProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
            <span className="text-white text-3xl font-bold">AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text text-shadow-lg">
            WebCraft AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create beautiful, professional websites with AI-powered storytelling
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStartBuilder}
            className="btn-primary text-lg px-8 py-4"
          >
            🚀 Start Building
          </button>
          <button className="btn-secondary text-lg px-8 py-4">
            📖 Learn More
          </button>
        </div>
        
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
