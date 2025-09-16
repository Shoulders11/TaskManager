import React from 'react';
import { FilterType } from '../../types';
import { ListTodo, CheckCircle, Circle, Calendar } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
    dueToday: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ 
  currentFilter, 
  onFilterChange, 
  taskCounts 
}) => {
  const filters = [
    { 
      key: 'all' as FilterType, 
      label: 'All Tasks', 
      icon: ListTodo, 
      count: taskCounts.all,
      color: 'from-conifer-teal-400 to-conifer-blue-400'
    },
    { 
      key: 'active' as FilterType, 
      label: 'Active', 
      icon: Circle, 
      count: taskCounts.active,
      color: 'from-conifer-orange-400 to-conifer-gray-400'
    },
    { 
      key: 'completed' as FilterType, 
      label: 'Completed', 
      icon: CheckCircle, 
      count: taskCounts.completed,
      color: 'from-conifer-green-400 to-conifer-teal-400'
    },
    { 
      key: 'dueToday' as FilterType, 
      label: 'Due Today', 
      icon: Calendar, 
      count: taskCounts.dueToday,
      color: 'from-conifer-orange-400 to-conifer-red-400'
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-conifer-green-100/50 mb-8 shadow-xl shadow-conifer-green-200/20">
      <h3 className="text-xl font-bold text-conifer-green-800 mb-6">Filter Tasks</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filters.map(({ key, label, icon: Icon, count, color }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`relative p-4 sm:p-5 lg:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg ${
              currentFilter === key
                ? 'border-conifer-green-400 bg-conifer-green-50/80 shadow-xl shadow-conifer-green-200/30'
                : 'border-conifer-green-200 hover:border-conifer-green-300 bg-white/60 backdrop-blur-sm'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-sm font-medium text-conifer-gray-700">{label}</span>
              <span className="text-lg font-bold text-conifer-gray-900">{count}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;