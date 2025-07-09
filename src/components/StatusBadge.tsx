'use client';

import React from 'react';

export type StatusType = 'In-progress' | 'Need to start' | 'Complete' | 'Blocked';

interface StatusBadgeProps {
  status: StatusType;
}

const statusStyles: Record<StatusType, string> = {
  'Complete': 'bg-green-100 text-green-800 border-green-200',
  'In-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Need to start': 'bg-blue-100 text-blue-800 border-blue-200',
  'Blocked': 'bg-red-100 text-red-800 border-red-200',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded border ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
