export interface TableRow {
    id: number;
    jobRequest: string;
    date: string;
    status: 'In-progress' | 'Need to start' | 'Complete' | 'Blocked' | '';
    submitter: string;
    url: string;
    assignee: string;
    priority: 'High' | 'Medium' | 'Low' | '';
    dueDate: string;
    estValue: string;
    [key: string]: string | number;
  }
  
  export interface ColumnConfig {
    key: keyof TableRow;
    label: React.ReactNode;
    width: number;
    visible: boolean;
    sortable: boolean;
  }
  