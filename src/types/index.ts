export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'None' | 'Important' | 'Urgent' | 'Urgent & Important';
  completed: boolean;
  recurrent?: boolean;
  completedAt?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export type FilterType = 'all' | 'active' | 'completed' | 'dueToday';