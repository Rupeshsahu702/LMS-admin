import React from 'react';
import { ChevronDown } from 'lucide-react';

const FilterSection = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-gray-700 font-medium">Filter by College</span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-gray-700 font-medium">Filter by Course</span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default FilterSection;
