import { useState } from "react";
import type { WebsiteData } from "../App";

interface ExportDeployProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ExportDeploy({ websiteData, updateWebsiteData, onNext, onBack }: ExportDeployProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const deploymentPlatforms = [
    {
      id: "vercel",
      name: "Vercel",
      description: "Deploy instantly with Vercel's global edge network",
      icon: "🚀",
      color: "from-black to-gray-800"
    },
    {
      id: "netlify",
      name: "Netlify",
      description: "Build, deploy, and manage your site with Netlify",
      icon: "🌐",
      color: "from-green-500 to-green-600"
    },
    {
      id: "github",
      name: "GitHub Pages",
      description: "Host your site directly from your GitHub repository",
      icon: "📚",
      color: "from-gray-700 to-gray-900"
    },
    {
      id: "custom",
      name: "Custom Domain",
      description: "Deploy to your own domain and hosting provider",
      icon: "🔗",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const generateWebsiteCode = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.story.businessName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=${websiteData.theme.fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: '${websiteData.theme.fontFamily}', sans-serif; }
        .primary-color { color: ${websiteData.theme.primaryColor}; }
        .primary-bg { background-color: ${websiteData.theme.primaryColor}; }
        .secondary-color { color: ${websiteData.theme.secondaryColor}; }
        .secondary-bg { background-color: ${websiteData.theme.secondaryColor}; }
    </style>
</head>
<body class="bg-white dark:bg-gray-900">
    <!-- Navigation -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-8">
                    <h1 class="text-xl font-bold primary-color">${websiteData.story.businessName}</h1>
                    <nav class="hidden md:flex space-x-8">
                        ${websiteData.navigation.items
                          .sort((a, b) => a.order - b.order)
                          .map(item => `<a href="#${item.pageId}" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">${item.label}</a>`)
                          .join('')}
                    </nav>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="px-4 py-2 rounded-lg text-white font-medium primary-bg">Get Started</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Content -->
    <main>
        ${websiteData.pages
          .sort((a, b) => a.order - b.order)
          .map(page => {
            switch (page.type) {
              case "hero":
                return `
                <section id="${page.id}" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                    <div class="text-center max-w-4xl mx-auto px-6">
                        <h1 class="text-5xl md:text-7xl font-bold mb-6 primary-color">${page.content.title}</h1>
                        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">${page.content.description}</p>
                        <button class="px-8 py-4 text-lg font-semibold rounded-lg text-white hover:scale-105 transition-transform primary-bg">${page.content.cta}</button>
                    </div>
                </section>`;
              case "about":
                return `
                <section id="${page.id}" class="min-h-screen bg-white dark:bg-gray-900 py-20">
                    <div class="max-w-6xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6 primary-color">${page.content.title}</h1>
                            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">${page.content.description}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${page.content.features?.map((feature: string) => `
                            <div class="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
                                <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center primary-bg">
                                    <span class="text-white text-2xl">★</span>
                                </div>
                                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">${feature}</h3>
                            </div>`).join('')}
                        </div>
                    </div>
                </section>`;
              case "services":
                return `
                <section id="${page.id}" class="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
                    <div class="max-w-6xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6 primary-color">${page.content.title}</h1>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${page.content.services?.map((service: any) => `
                            <div class="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div class="w-12 h-12 mb-6 rounded-lg flex items-center justify-center primary-bg">
                                    <span class="text-white text-xl">★</span>
                                </div>
                                <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">${service.name}</h3>
                                <p class="text-gray-600 dark:text-gray-300">${service.description}</p>
                            </div>`).join('')}
                        </div>
                    </div>
                </section>`;
              case "contact":
                return `
                <section id="${page.id}" class="min-h-screen bg-white dark:bg-gray-900 py-20">
                    <div class="max-w-4xl mx-auto px-6">
                        <div class="text-center mb-16">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6 primary-color">${page.content.title}</h1>
                            <p class="text-xl text-gray-600 dark:text-gray-300">${page.content.description}</p>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                            <form class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                        <input type="text" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Your name">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                        <input type="email" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="your@email.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                    <textarea rows="5" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Tell us about your project..."></textarea>
                                </div>
                                <button type="submit" class="w-full px-8 py-4 text-lg font-semibold rounded-lg text-white hover:scale-105 transition-transform primary-bg">Send Message</button>
                            </form>
                        </div>
                    </div>
                </section>`;
              default:
                return `
                <section id="${page.id}" class="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                    <div class="text-center">
                        <h1 class="text-4xl font-bold mb-4 primary-color">${page.content.title}</h1>
                        <p class="text-xl text-gray-600 dark:text-gray-300">${page.content.description}</p>
                    </div>
                </section>`;
            }
          }).join('')}
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">${websiteData.story.businessName}</h3>
                    <p class="text-gray-400">${websiteData.story.description}</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-400">
                        ${websiteData.story.services.slice(0, 3).map((service: string) => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Contact</h4>
                    <p class="text-gray-400">Ready to work with us?</p>
                    <button class="mt-2 px-4 py-2 rounded-lg text-white font-medium primary-bg">Get In Touch</button>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 ${websiteData.story.businessName}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>`;

    return html;
  };

  const handleExport = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      const html = generateWebsiteCode();
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${websiteData.story.businessName.replace(/\s+/g, '-').toLowerCase()}-website.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1000);
  };

  const handleDeploy = () => {
    if (!selectedPlatform) {
      alert("Please select a deployment platform");
      return;
    }

    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      alert(`Your website has been successfully deployed to ${deploymentPlatforms.find(p => p.id === selectedPlatform)?.name}!`);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Preview & Deploy Your Website
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Export your website or deploy it to the web with just a few clicks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Export Website</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Download your website as HTML files to host anywhere
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Complete HTML website</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Responsive design</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Custom styling</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Ready to upload</span>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Download Website</span>
              </>
            )}
          </button>
        </div>

        {/* Deploy Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Deploy to Web</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Deploy your website instantly to popular hosting platforms
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {deploymentPlatforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`w-full p-4 border rounded-lg text-left transition-all duration-200 ${
                  selectedPlatform === platform.id
                    ? "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{platform.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{platform.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleDeploy}
            disabled={isDeploying || !selectedPlatform}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isDeploying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Deploy Website</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
        >
          Back
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Your website is ready! 🎉
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            You can always come back to make changes and re-export
          </p>
        </div>
      </div>
    </div>
  );
} 