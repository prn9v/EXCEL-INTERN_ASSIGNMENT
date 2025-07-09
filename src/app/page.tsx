// pages/index.tsx
'use client'
import { useState } from 'react';
import type { NextPage } from 'next';
import { TableRow, ColumnConfig } from '../types/spreadsheet';
import SpreadsheetTable from '../components/SpreadsheetTable';
import TableToolbar from '../components/TableToolbar';
import TabNavigation from '../components/TabNavigation';
import { Bell, Search, ClipboardList, Calendar, Circle, User, Link2, GitFork, UserCheck } from 'lucide-react';
import Image from 'next/image';


const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState('all-orders');

  const [sampleData] = useState<TableRow[]>([
    {
      id: 1,
      jobRequest: 'Launch social media campaign for product promotion',
      date: '15-11-2024',
      status: 'In-progress',
      submitter: 'Aloha Patel',
      url: 'www.alohapatel.com',
      assignee: 'Sophie Choudhury',
      priority: 'Medium',
      dueDate: '20-11-2024',
      estValue: '6,200,000 ₹',
    },
    {
      id: 2,
      jobRequest: 'Update press kit for company redesign',
      date: '28-10-2024',
      status: 'Need to start',
      submitter: 'Irfan Khan',
      url: 'www.irfankhan.pk',
      assignee: 'Tejas Pandey',
      priority: 'High',
      dueDate: '30-10-2024',
      estValue: '3,500,000 ₹',
    },
    {
      id: 3,
      jobRequest: 'Finalize user testing feedback for app redesign',
      date: '05-12-2024',
      status: 'In-progress',
      submitter: 'Mark Johnson',
      url: 'www.markjohnso.com',
      assignee: 'Rachel Lee',
      priority: 'Medium',
      dueDate: '10-12-2024',
      estValue: '4,750,000 ₹',
    },
    {
      id: 4,
      jobRequest: 'Design new features for the website',
      date: '10-01-2025',
      status: 'Complete',
      submitter: 'Emily Green',
      url: 'www.emilygreen.co',
      assignee: 'Tom Wright',
      priority: 'Low',
      dueDate: '15-01-2025',
      estValue: '5,800,000 ₹',
    },
    {
      id: 5,
      jobRequest: 'Prepare financial report for Q4',
      date: '25-01-2025',
      status: 'Blocked',
      submitter: 'Jessica Brown',
      url: 'www.jessicabro.wn',
      assignee: 'Kevin Smith',
      priority: 'Low',
      dueDate: '30-01-2025',
      estValue: '2,800,000 ₹',
    },
  ]);

  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: 'jobRequest', label: (<><ClipboardList className="inline mr-1" size={16}/>Job Request</>), width: 300, visible: true, sortable: true },
    { key: 'date', label: (<><Calendar className="inline mr-1" size={16}/>Date</>), width: 120, visible: true, sortable: true },
    { key: 'status', label: (<><Circle className="inline mr-1" size={16}/>Status</>), width: 130, visible: true, sortable: true },
    { key: 'submitter', label: (<><User className="inline mr-1" size={16}/>Submitter</>), width: 150, visible: true, sortable: true },
    { key: 'url', label: (<><Link2 className="inline mr-1" size={16}/>URL</>), width: 180, visible: true, sortable: false },
    { key: 'assignee', label: (<><UserCheck className="inline mr-1" size={16}/>Assignee</>), width: 150, visible: true, sortable: true },
    { key: 'priority', label: 'Priority', width: 100, visible: true, sortable: true },
    { key: 'dueDate', label: 'Due Date', width: 120, visible: true, sortable: true },
    { key: 'estValue', label: 'Est. Value', width: 140, visible: true, sortable: true },
  ]);

  const handleColumnResize = (columnKey: keyof TableRow, newWidth: number) => {
    setColumns((prev) =>
      prev.map((col) => (col.key === columnKey ? { ...col, width: newWidth } : col))
    );
  };

  const handleToolbarAction = (action: string) => {
    console.log(`${action} action triggered`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-400">
        <div className="px-4 pt-2 pb-1 border-b border-gray-400">
          <div className="flex items-center justify-between">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Workspace</span>
              <span>›</span>
              <span>Folder 2</span>
              <span>›</span>
              <span className="font-medium text-gray-900">Spreadsheet 3</span>
            </div>
            {/* Right: Search, Bell, Profile */}
            <div className="flex items-center space-x-4">
              {/* Search Box */}
              <div className="relative w-[180px]">
                <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search within Sheet"
                  className="pl-8 pr-2 py-1 w-full border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              {/* Notification Bell */}
              <button className="rounded-full bg-white shadow-sm hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer p-2 flex items-center justify-center">
                <Bell size={20} className="text-gray-500" />
              </button>
              {/* Profile Section */}
              <div className="flex items-center bg-white shadow-sm rounded-lg px-3 py-1 space-x-3 hover:bg-blue-50 transition-colors cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-gray-900 font-semibold text-sm">John Doe</span>
                  <span className="text-gray-400 text-xs">@johndoe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TableToolbar
          onToolBar = {() => handleToolbarAction('Tool Bar')}
          onImport={() => handleToolbarAction('Import')}
          onExport={() => handleToolbarAction('Export')}
          onShare={() => handleToolbarAction('Share')}
          onNewAction={() => handleToolbarAction('New Action')}
          onFilter={() => handleToolbarAction('Filter')}
          onHideFields={() => handleToolbarAction('Hide Fields')}
          onSort={() => handleToolbarAction('Sort')}
          onCellView={() => handleToolbarAction('Cell View')}
        />
      </div>


      <div className="flex-1">
        <SpreadsheetTable
          data={sampleData}
          columns={columns}
          onColumnResize={handleColumnResize}
          sectionHeaders={[
            { label: (<><Link2 className="inline mr-1" size={16}/>Q3 Financial Overview</>), colSpan: 5, colorClass: 'bg-blue-200 border-blue-200' },
            { label: (<><GitFork className="inline mr-1" size={16}/>ABC</>), colSpan: 1, colorClass: 'bg-green-100 border-green-100' },
            { label: (<><GitFork className="inline mr-1" size={16}/>Answer a question</>), colSpan: 2, colorClass: 'bg-purple-100 border-purple-100' },
            { label: (<><GitFork className="inline mr-1" size={16}/>Extract</>), colSpan: 1, colorClass: 'bg-orange-100 border-orange-100' },
          ]}
        />
      </div>

      <div className="bg-white border-t border-gray-200">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="text-xs text-gray-500">
          Showing {sampleData.length} of {sampleData.length} records
        </div>
      </div>
    </div>
  );
};

export default Home;
