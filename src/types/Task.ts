export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status?: 'In Progress' | 'Pending' | 'Completed';
  createdAt: number;
}

export type FilterType = 'all' | 'in-progress' | 'pending' | 'completed';
