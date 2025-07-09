import React, { useState, useCallback, useEffect } from 'react';
import { TableRow, ColumnConfig } from '@/types/spreadsheet';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import type { StatusType } from './StatusBadge';
type PriorityType = 'High' | 'Medium' | 'Low';

interface SectionHeader {
  label: React.ReactNode;
  colSpan: number;
  colorClass: string; // Tailwind or custom class for background color
}

interface SpreadsheetTableProps {
  data: TableRow[];
  columns: ColumnConfig[];
  onColumnResize: (columnKey: keyof TableRow, newWidth: number) => void;
  sectionHeaders?: SectionHeader[]; // New prop
}

const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({
  data,
  columns,
  onColumnResize,
  sectionHeaders // New prop
}) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof TableRow; direction: 'asc' | 'desc' } | null>(null);


  const handleSort = (key: keyof TableRow) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedCell) return;
    
    const visibleColumns = columns.filter(col => col.visible);
    const maxRow = data.length - 1;
    const maxCol = visibleColumns.length - 1;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedCell(prev => prev ? { ...prev, row: Math.max(0, prev.row - 1) } : null);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedCell(prev => prev ? { ...prev, row: Math.min(maxRow, prev.row + 1) } : null);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setSelectedCell(prev => prev ? { ...prev, col: Math.max(0, prev.col - 1) } : null);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSelectedCell(prev => prev ? { ...prev, col: Math.min(maxCol, prev.col + 1) } : null);
        break;
    }
  }, [selectedCell, columns, data.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Helper to check if a row is empty (all fields except id are empty)
  const isRowEmpty = (row: TableRow) => {
    const { ...rest } = row;
    return Object.values(rest).every(val => val === '' || val === undefined);
  };

  const renderCellContent = (row: TableRow, column: ColumnConfig) => {
    if (isRowEmpty(row)) return null;
    const value = row[column.key];
    switch (column.key) {
      case 'status': {
        const validStatuses: StatusType[] = ['In-progress', 'Need to start', 'Complete', 'Blocked'];
        if (validStatuses.includes(value as StatusType)) {
          return <StatusBadge status={value as StatusType} />;
        }
        return '';
      }
      case 'priority': {
        const validPriorities: PriorityType[] = ['High', 'Medium', 'Low'];
        if (validPriorities.includes(value as PriorityType)) {
          return <PriorityBadge priority={value as PriorityType} />;
        }
        return '';
      }
      case 'url':
        return (
          <a
            href={typeof value === 'string' ? value : '#'}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {typeof value === 'string' ? value.substring(0, 30) + (value.length > 30 ? '...' : '') : ''}
          </a>
        );
      default:
        return <span className="text-sm text-gray-900">{value}</span>;
    }
  };

  const visibleColumns = columns.filter(col => col.visible);

  // Function to convert number to Excel-style column letters (A, B, C, ..., AA, AB, etc.)
  const numberToColumnLetter = (num: number): string => {
    let result = '';
    while (num >= 0) {
      result = String.fromCharCode(65 + (num % 26)) + result;
      num = Math.floor(num / 26) - 1;
      if (num < 0) break;
    }
    return result;
  };

  const MIN_ROWS = 25;

  // Calculate the number of rows to display
  const totalRows = Math.max(data.length, MIN_ROWS);
  const filledRows = data.length;

  // Create a combined array of filled and empty rows
  const displayRows: TableRow[] = [
    ...data,
    ...Array.from({ length: totalRows - filledRows }, (_, i) => ({
      id: filledRows + i + 1,
      jobRequest: '',
      date: '',
      status: '' as TableRow['status'],
      submitter: '',
      url: '',
      assignee: '',
      priority: '' as TableRow['priority'],
      dueDate: '',
      estValue: '',
    }))
  ];

  // Note: These variables are prepared for future use but not currently needed
  // const TOTAL_COLUMNS = 26;
  // const alphabet = Array.from({ length: TOTAL_COLUMNS }, (_, i) => String.fromCharCode(65 + i));

  // Use the width of the first column as the default for extra columns
  // const defaultColWidth = columns[0]?.width || 120;
  // const baseColumns = columns.filter(col => col.visible);
  // const allColumns: ColumnConfig[] = Array.from({ length: TOTAL_COLUMNS }, (_, i) => {
  //   if (baseColumns[i]) return baseColumns[i];
  //   return {
  //     key: `extra${i}`,
  //     label: '',
  //     width: defaultColWidth,
  //     visible: true,
  //     sortable: false,
  //   };
  // });

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg min-h-screen">
      <table className="w-full border-collapse">
        <thead>
          {/* Section header row */}
          {sectionHeaders && (
            <tr>
              <th className="w-12 bg-white" />
              {sectionHeaders.map((section, idx) => (
                <th
                  key={idx}
                  colSpan={section.colSpan}
                  className={`text-md font-semibold text-gray-700 text-left px-4 py-2 border-r border-gray-200 ${section.colorClass}`}
                  style={{ minWidth: section.colSpan * 80 }}
                >
                  {section.label}
                </th>
              ))}
            </tr>
          )}
          {/* Column letters row */}
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="w-12 px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 bg-gray-200">
              {/* Empty cell above row numbers */}
            </th>
            {visibleColumns.map((column, colIndex) => (
              <th
                key={`col-letter-${column.key}`}
                className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 bg-gray-100 text-center"
                style={{ width: column.width }}
              >
                {numberToColumnLetter(colIndex)}
              </th>
            ))}
          </tr>
          {/* Column headers row */}
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="w-12 px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 bg-gray-200">
              #
            </th>
            {visibleColumns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0 cursor-pointer hover:bg-gray-100 transition-colors relative group"
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center justify-between">
                  <span>{column.label}</span>
                  {sortConfig?.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 opacity-0 group-hover:opacity-50"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startX = e.clientX;
                    const startWidth = column.width;
                    
                    const handleMouseMove = (e: MouseEvent) => {
                      const newWidth = Math.max(100, startWidth + (e.clientX - startX));
                      onColumnResize(column.key, newWidth);
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, rowIndex) => {
            const empty = isRowEmpty(row);
            return (
              <tr
                key={row.id}
                className={
                  'border-b border-gray-200' +
                  (empty ? '' : ' hover:bg-gray-50 transition-colors')
                }
              >
                {/* Row number */}
                <td className="w-12 px-2 py-3 text-xs text-gray-500 text-center border-r border-gray-300 bg-gray-100 font-medium">
                  {rowIndex + 1}
                </td>
                {visibleColumns.map((column, colIndex) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={
                      'px-4 py-3 border-r border-gray-200 last:border-r-0' +
                      (empty
                        ? ''
                        : ' cursor-cell' +
                          (selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                            ? ' bg-blue-100 ring-2 ring-blue-500'
                            : ''))
                    }
                    onClick={
                      empty
                        ? undefined
                        : () => setSelectedCell({ row: rowIndex, col: colIndex })
                    }
                  >
                    {renderCellContent(row, column)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetTable;