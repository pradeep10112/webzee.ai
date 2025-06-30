import { useState } from "react";
import type { WebsiteData } from "../App";

interface WebsitePreviewProps {
  websiteData: WebsiteData;
}

export default function WebsitePreview({ websiteData }: WebsitePreviewProps) {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const currentPageData = websiteData.pages.find(p => p.id === currentPage) || websiteData.pages[0];

  const renderPageContent = (page: any) => {
    switch (page.type) {
      case "hero":
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center max-w-4xl mx-auto px-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: websiteData.theme.primaryColor }}>
                {page.content.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {page.content.description}
              </p>
              <button 
                className="px-8 py-4 text-lg font-semibold rounded-lg text-white hover:scale-105 transition-transform"
                style={{ backgroundColor: websiteData.theme.primaryColor }}
              >
                {page.content.cta}
              </button>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: websiteData.theme.primaryColor }}>
                  {page.content.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {page.content.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {page.content.features?.map((feature: string, index: number) => (
                  <div key={index} className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: websiteData.theme.primaryColor }}>
                      <span className="text-white text-2xl">★</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: websiteData.theme.primaryColor }}>
                  {page.content.title}
                </h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {page.content.services?.map((service: any, index: number) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 mb-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: websiteData.theme.primaryColor }}>
                      <span className="text-white text-xl">★</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{service.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: websiteData.theme.primaryColor }}>
                  {page.content.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {page.content.description}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 text-lg font-semibold rounded-lg text-white hover:scale-105 transition-transform"
                    style={{ backgroundColor: websiteData.theme.primaryColor }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4" style={{ color: websiteData.theme.primaryColor }}>
                {page.content.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {page.content.description}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900" style={{ fontFamily: websiteData.theme.fontFamily }}>
      {/* Navigation */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold" style={{ color: websiteData.theme.primaryColor }}>
                {websiteData.story.businessName || "Your Business"}
              </h1>
              
              <nav className="hidden md:flex space-x-8">
                {websiteData.navigation.items
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.pageId)}
                      className={`text-sm font-medium transition-colors ${
                        currentPage === item.pageId
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: websiteData.theme.primaryColor }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        {currentPageData && renderPageContent(currentPageData)}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{websiteData.story.businessName || "Your Business"}</h3>
              <p className="text-gray-400">{websiteData.story.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {websiteData.story.services.slice(0, 3).map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Ready to work with us?</p>
              <button 
                className="mt-2 px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: websiteData.theme.primaryColor }}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {websiteData.story.businessName || "Your Business"}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 