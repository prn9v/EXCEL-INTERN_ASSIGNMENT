'use client';

import React from 'react';
import {
  Filter,
  Import,
  Plus,
  Eye,
  EyeOff,
  ArrowUpDown,
  ChevronsRight,
  ArrowUpFromLine,
  ExternalLink,
} from 'lucide-react';


interface TableToolbarProps {
  onImport: () => void;
  onExport: () => void;
  onShare: () => void;
  onNewAction: () => void;
  onFilter: () => void;
  onHideFields: () => void;
  onSort: () => void;
  onCellView: () => void;
  onToolBar: () => void
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  onImport,
  onExport,
  onShare,
  onNewAction,
  onToolBar,
  onFilter,
  onHideFields,
  onSort,
  onCellView,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Filter Dropdown */}
        <div className="flex items-center space-x-2">
        <button onClick={onToolBar} className="flex bg-gray-200 items-center space-x-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer">
            <span>Tool bar</span>
            <ChevronsRight size={16} />
          </button>
          <button onClick={onHideFields} className="flex bg-gray-200 items-center space-x-1 px-4 py-2  text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer">
            <EyeOff size={16} />
            <span>Hide Field</span>
          </button>
          <button onClick={onSort} className="flex bg-gray-200 items-center space-x-1 px-4 py-2  text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer">
            <ArrowUpDown size={16} />
            <span>Sort</span>
          </button>
          <button onClick={onFilter} className="flex bg-gray-200 items-center space-x-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button onClick={onCellView} className="flex bg-gray-200 items-center space-x-1 px-4 py-2  text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer">
            <Eye size={16} />
            <span>Cell View</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onImport}
            className="flex bg-gray-200 items-center space-x-1 px-4 py-2  text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer"
          >
            <Import size={16} />
            <span>Import</span>
          </button>

          <button
            onClick={onExport}
            className="flex bg-gray-200 items-center space-x-1 px-4 py-2  text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer"
          >
            <ArrowUpFromLine size={16} />
            <span>Export</span>
          </button>

          <button
            onClick={onShare}
            className="flex bg-gray-200 items-center space-x-1 px-4 py-2  text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-400 rounded transition-colors cursor-pointer"
          >
            <ExternalLink size={16} />
            <span>Share</span>
          </button>

          <button
            onClick={onNewAction}
            className="flex items-center space-x-1 px-4 py-2  text-sm text-white bg-green-600 hover:bg-green-700 rounded transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>New Action</span>
          </button>
        </div>
      </div>


    </div>
  );
};

export default TableToolbar;
