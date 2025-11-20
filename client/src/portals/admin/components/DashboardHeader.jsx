import React, { useState } from 'react';

const DashboardHeader = () => {
  const [activeFilter, setActiveFilter] = useState('last7days');

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

        {/* Time Filter Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveFilter('today')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'today'
                ? 'bg-white text-gray-900 border border-gray-300'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveFilter('last7days')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'last7days'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setActiveFilter('last30days')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'last30days'
                ? 'bg-white text-gray-900 border border-gray-300'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
