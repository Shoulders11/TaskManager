import React from 'react';
import { Task } from '../../types';
import { Check, Edit, Trash2, Calendar, Clock, AlertTriangle, Flag, Zap, Repeat } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const dueToday = task.dueDate && 
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  const getPriorityConfig = (priority: Task['priority']) => {
    switch (priority) {
      case 'Urgent & Important':
        return {
          icon: Zap,
          color: 'text-conifer-red-600',
          bgColor: 'bg-conifer-red-100',
          label: 'Urgent & Important'
        };
      case 'Urgent':
        return {
          icon: AlertTriangle,
          color: 'text-conifer-orange-600',
          bgColor: 'bg-conifer-orange-100',
          label: 'Urgent'
        };
      case 'Important':
        return {
          icon: Flag,
          color: 'text-conifer-blue-600',
          bgColor: 'bg-conifer-blue-100',
          label: 'Important'
        };
      default:
        return null;
    }
  };

  const priorityConfig = getPriorityConfig(task.priority);

  return (
    <div className={`bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.01] ${
      task.completed 
        ? 'border-conifer-green-300 bg-conifer-green-50/60 shadow-lg shadow-conifer-green-200/30' 
        : isOverdue 
        ? 'border-red-300 bg-red-50/60 shadow-lg shadow-red-200/30' 
        : dueToday
        ? 'border-conifer-orange-300 bg-conifer-orange-50/60 shadow-lg shadow-conifer-orange-200/30'
        : 'border-conifer-green-200 shadow-lg shadow-conifer-green-100/20'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={() => onToggle(task.id, !task.completed)}
            className={`mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm ${
              task.completed
                ? 'bg-conifer-green-500 border-conifer-green-500 text-white shadow-lg shadow-conifer-green-300/40'
                : 'border-conifer-green-300 hover:border-conifer-green-500 hover:bg-conifer-green-50'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 animate-pulse" />}
          </button>

          <div className="flex-1">
            <h3 className={`text-xl font-bold transition-all duration-300 ${
              task.completed 
                ? 'text-conifer-green-600 line-through' 
                : 'text-conifer-gray-800'
            } flex items-center space-x-2`}>
              <span>{task.title}</span>
              {task.recurrent && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-conifer-teal-100 text-conifer-teal-700 rounded-full text-xs font-semibold">
                  <Repeat className="w-3 h-3" />
                  <span>Daily</span>
                </div>
              )}
            </h3>
            
            {priorityConfig && (
              <div className={`mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig.bgColor} ${priorityConfig.color}`}>
                <priorityConfig.icon className="w-3 h-3" />
                <span>{priorityConfig.label}</span>
              </div>
            )}
            
            {task.description && (
              <p className={`mt-3 text-base font-medium transition-all duration-300 ${
                task.completed 
                  ? 'text-conifer-green-500 line-through' 
                  : 'text-conifer-gray-600'
              }`}>
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <div className={`mt-4 flex items-center space-x-2 text-sm font-medium ${
                isOverdue 
                  ? 'text-red-600' 
                  : dueToday 
                  ? 'text-conifer-orange-600' 
                  : task.completed 
                  ? 'text-conifer-green-500' 
                  : 'text-conifer-gray-500'
              }`}>
                {dueToday ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                <span>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                  {dueToday && ' (Today)'}
                  {isOverdue && ' (Overdue)'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-3 text-conifer-blue-500 hover:text-conifer-blue-600 hover:bg-conifer-blue-50 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
            title="Edit task"
          >
            <Edit className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
            title="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;