// components/PriorityBadge.tsx
import React from 'react';

interface PriorityBadgeProps {
  priority: 'High' | 'Medium' | 'Low';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyle = () => {
    switch (priority) {
      case 'High':
        return 'bg-red-200 text-red-700 font-semibold';
      case 'Medium':
        return 'bg-orange-50 text-orange-700 font-medium';
      case 'Low':
        return 'bg-blue-50 text-blue-700 font-medium';
      default:
        return 'bg-gray-50 text-gray-700 font-medium';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${getPriorityStyle()}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
