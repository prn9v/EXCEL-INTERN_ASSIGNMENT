'use client';

import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all-orders', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'reviewed', label: 'Reviewed' },
    { id: 'arrived', label: 'Arrived' },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex space-x-8 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Optional: New Tab Button */}
        <button
          onClick={() => console.log('Add new tab')}
          className="py-4 px-1 text-gray-400 hover:text-gray-600 text-sm font-medium"
          aria-label="Add new tab"
        >
          +
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;
