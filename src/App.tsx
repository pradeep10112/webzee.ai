import { useState } from "react";
import Landing from "./components/Landing";

import "./index.css";

function App() {
  const [showBuilder, setShowBuilder] = useState(false);

  if (!showBuilder) {
    return <Landing onStartBuilder={() => setShowBuilder(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🎉 Website Builder Coming Soon!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          The full AI website builder is being loaded...
        </p>
        <button 
          onClick={() => setShowBuilder(false)}
          className="btn-secondary"
        >
          ← Back to Landing
        </button>
      </div>
    </div>
  );
}

export default App;
