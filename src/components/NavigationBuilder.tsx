import { useState } from "react";
import type { WebsiteData } from "../App";

interface NavigationBuilderProps {
  websiteData: WebsiteData;
  updateWebsiteData: (updates: Partial<WebsiteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function NavigationBuilder({ websiteData, updateWebsiteData, onNext, onBack }: NavigationBuilderProps) {
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);

  const handleNavItemSelect = (navId: string) => {
    setSelectedNavItem(navId);
  };

  const updateNavItem = (navId: string, field: string, value: any) => {
    const updatedItems = websiteData.navigation.items.map(item => {
      if (item.id === navId) {
        return { ...item, [field]: value };
      }
      return item;
    });

    updateWebsiteData({
      navigation: { ...websiteData.navigation, items: updatedItems }
    });
  };

  const addNavItem = () => {
    const newNavItem = {
      id: `nav-${Date.now()}`,
      label: "New Link",
      pageId: "",
      order: websiteData.navigation.items.length + 1
    };

    updateWebsiteData({
      navigation: {
        ...websiteData.navigation,
        items: [...websiteData.navigation.items, newNavItem]
      }
    });
  };

  const removeNavItem = (navId: string) => {
    const updatedItems = websiteData.navigation.items.filter(item => item.id !== navId);
    updateWebsiteData({
      navigation: { ...websiteData.navigation, items: updatedItems }
    });
    if (selectedNavItem === navId) {
      setSelectedNavItem(null);
    }
  };

  const reorderNavItems = (fromIndex: number, toIndex: number) => {
    const items = [...websiteData.navigation.items];
    const [movedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, movedItem);
    
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    updateWebsiteData({
      navigation: { ...websiteData.navigation, items: reorderedItems }
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Build Your Navigation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Organize your website's navigation menu and link pages together
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation Preview</h2>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <nav className="flex flex-wrap gap-2">
                {websiteData.navigation.items
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
              </nav>
            </div>

            <div className="mt-4">
              <button
                onClick={addNavItem}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
              >
                + Add Navigation Item
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation Items</h2>
            
            <div className="space-y-3">
              {websiteData.navigation.items
                .sort((a, b) => a.order - b.order)
                .map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedNavItem === item.id
                        ? "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handleNavItemSelect(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.label}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Links to: {websiteData.pages.find(p => p.id === item.pageId)?.name || "No page selected"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNavItem(item.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {selectedNavItem && (
              <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Edit Navigation Item</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={websiteData.navigation.items.find(n => n.id === selectedNavItem)?.label || ""}
                      onChange={(e) => updateNavItem(selectedNavItem, "label", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Link to Page
                    </label>
                    <select
                      value={websiteData.navigation.items.find(n => n.id === selectedNavItem)?.pageId || ""}
                      onChange={(e) => updateNavItem(selectedNavItem, "pageId", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select a page</option>
                      {websiteData.pages.map((page) => (
                        <option key={page.id} value={page.id}>
                          {page.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
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
          Continue to Theme
        </button>
      </div>
    </div>
  );
} 