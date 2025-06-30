import { useState } from "react";
import Landing from "./components/Landing";
import StoryBuilder from "./components/StoryBuilder";
import WebsitePreview from "./components/WebsitePreview";
import NavigationBuilder from "./components/NavigationBuilder";
import PageManager from "./components/PageManager";
import ThemeCustomizer from "./components/ThemeCustomizer";
import ExportDeploy from "./components/ExportDeploy";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import "./index.css";

export interface WebsiteData {
  story: {
    businessName: string;
    description: string;
    targetAudience: string;
    services: string[];
    goals: string[];
  };
  pages: {
    id: string;
    name: string;
    type: string;
    content: any;
    order: number;
  }[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: string;
  };
  navigation: {
    items: { id: string; label: string; pageId: string; order: number }[];
  };
}

function App() {
  const [websiteData, setWebsiteData] = useState<WebsiteData>({
    story: {
      businessName: "",
      description: "",
      targetAudience: "",
      services: [],
      goals: []
    },
    pages: [],
    theme: {
      primaryColor: "#3B82F6",
      secondaryColor: "#1F2937",
      fontFamily: "Inter",
      layout: "modern"
    },
    navigation: {
      items: []
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);

  const updateWebsiteData = (updates: Partial<WebsiteData>) => {
    setWebsiteData(prev => ({ ...prev, ...updates }));
  };

  const steps = [
    { id: 1, name: "Tell Your Story", component: StoryBuilder },
    { id: 2, name: "Design Pages", component: PageManager },
    { id: 3, name: "Navigation", component: NavigationBuilder },
    { id: 4, name: "Customize Theme", component: ThemeCustomizer },
    { id: 5, name: "Preview & Deploy", component: ExportDeploy }
  ];

  if (!showBuilder) {
    return <Landing onStartBuilder={() => setShowBuilder(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header 
        currentStep={currentStep} 
        steps={steps}
        onStepChange={setCurrentStep}
        previewMode={previewMode}
        onPreviewToggle={() => setPreviewMode(!previewMode)}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar 
          currentStep={currentStep}
          steps={steps}
          onStepChange={setCurrentStep}
          websiteData={websiteData}
        />
        
        <main className="flex-1 overflow-hidden">
          {previewMode ? (
            <WebsitePreview websiteData={websiteData} />
          ) : (
            <div className="h-full overflow-y-auto p-6">
              {steps.map(step => {
                const StepComponent = step.component;
                return step.id === currentStep ? (
                  <StepComponent
                    key={step.id}
                    websiteData={websiteData}
                    updateWebsiteData={updateWebsiteData}
                    onNext={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
                    onBack={() => setCurrentStep(Math.max(currentStep - 1, 1))}
                  />
                ) : null;
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
