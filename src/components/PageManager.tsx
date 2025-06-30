import { useState } from "react";
import type { WebsiteData } from "../App";

interface PageManagerProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PageManager({ websiteData, updateWebsiteData, onNext, onBack }: PageManagerProps) {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<any>(null);

  const handlePageSelect = (pageId: string) => {
    const page = websiteData.pages.find(p => p.id === pageId);
    if (page) {
      setSelectedPage(pageId);
      setEditingContent({ ...page.content });
    }
  };

  const handleContentUpdate = (field: string, value: any) => {
    if (!selectedPage) return;
    
    const updatedPages = websiteData.pages.map(page => {
      if (page.id === selectedPage) {
        return {
          ...page,
          content: {
            ...page.content,
            [field]: value
          }
        };
      }
      return page;
    });

    updateWebsiteData({ pages: updatedPages });
    setEditingContent({ ...editingContent, [field]: value });
  };

  const addNewPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      name: "New Page",
      type: "custom",
      content: {
        title: "New Page",
        description: "Add your content here",
        sections: []
      },
      order: websiteData.pages.length + 1
    };

    updateWebsiteData({
      pages: [...websiteData.pages, newPage]
    });
  };

  const deletePage = (pageId: string) => {
    const updatedPages = websiteData.pages.filter(p => p.id !== pageId);
    updateWebsiteData({ pages: updatedPages });
    if (selectedPage === pageId) {
      setSelectedPage(null);
      setEditingContent(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Design Your Pages
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Customize each page of your website with your content and branding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pages</h2>
              <button
                onClick={addNewPage}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                + Add Page
              </button>
            </div>
            
            <div className="space-y-2">
              {websiteData.pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedPage === page.id
                      ? "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => handlePageSelect(page.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{page.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{page.type}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePage(page.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Edit Page: {websiteData.pages.find(p => p.id === selectedPage)?.name}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Name
                  </label>
                  <input
                    type="text"
                    value={websiteData.pages.find(p => p.id === selectedPage)?.name || ""}
                    onChange={(e) => {
                      const updatedPages = websiteData.pages.map(page => {
                        if (page.id === selectedPage) {
                          return { ...page, name: e.target.value };
                        }
                        return page;
                      });
                      updateWebsiteData({ pages: updatedPages });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingContent?.title || ""}
                    onChange={(e) => handleContentUpdate("title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingContent?.description || ""}
                    onChange={(e) => handleContentUpdate("description", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {editingContent?.cta && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Call to Action
                    </label>
                    <input
                      type="text"
                      value={editingContent.cta}
                      onChange={(e) => handleContentUpdate("cta", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )}

                {editingContent?.services && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Services
                    </label>
                    <textarea
                      value={editingContent.services.map((s: any) => s.name).join('\n')}
                      onChange={(e) => {
                        const services = e.target.value.split('\n').filter(s => s.trim()).map(name => ({
                          name,
                          description: `Professional ${name.toLowerCase()} services`,
                          icon: "star"
                        }));
                        handleContentUpdate("services", services);
                      }}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex items-center justify-center h-64">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">Select a page to edit</p>
                <p className="text-sm">Choose a page from the list to customize its content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700"
        >
          Continue to Navigation
        </button>
      </div>
    </div>
  );
} 