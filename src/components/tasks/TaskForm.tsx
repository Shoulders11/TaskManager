import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { Plus, Save, X, Calendar, AlertTriangle, Repeat } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('None');
  const [recurrent, setRecurrent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority);
      setRecurrent(editingTask.recurrent || false);
      setIsOpen(true);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('None');
      setRecurrent(false);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      recurrent,
      completed: editingTask ? editingTask.completed : false,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('None');
    setRecurrent(false);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('None');
    setRecurrent(false);
    setIsOpen(false);
    onCancel?.();
  };

  if (!isOpen && !editingTask) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-conifer-green-500 via-conifer-teal-500 to-conifer-blue-500 text-white py-5 px-8 rounded-3xl hover:from-conifer-green-600 hover:via-conifer-teal-600 hover:to-conifer-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-conifer-green-300/40 font-bold text-lg flex items-center justify-center space-x-3 mb-8 shadow-xl"
      >
        <Plus className="w-6 h-6" />
        <span>Add New Task</span>
      </button>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-conifer-green-100/50 mb-8 shadow-xl shadow-conifer-green-200/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-conifer-green-800">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </h3>
        {!editingTask && (
          <button
            onClick={handleCancel}
            className="p-3 text-conifer-gray-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 transform hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-conifer-green-700 mb-3">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-5 py-4 border-2 border-conifer-green-200 rounded-2xl focus:border-conifer-green-400 focus:outline-none focus:ring-4 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-conifer-green-700 mb-3">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details..."
            rows={3}
            className="w-full px-5 py-4 border-2 border-conifer-green-200 rounded-2xl focus:border-conifer-green-400 focus:outline-none focus:ring-4 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none shadow-inner font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-conifer-green-700 mb-3">
            Priority
          </label>
          <div className="relative">
            <AlertTriangle className="absolute left-4 top-4 w-5 h-5 text-conifer-green-400" />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="w-full pl-12 pr-5 py-4 border-2 border-conifer-green-200 rounded-2xl focus:border-conifer-green-400 focus:outline-none focus:ring-4 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner font-medium"
            >
              <option value="None">None</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
              <option value="Urgent & Important">Urgent & Important</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-conifer-green-700 mb-3">
            Due Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-4 w-5 h-5 text-conifer-green-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-12 pr-5 py-4 border-2 border-conifer-green-200 rounded-2xl focus:border-conifer-green-400 focus:outline-none focus:ring-4 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner font-medium"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={recurrent}
                onChange={(e) => setRecurrent(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                recurrent 
                  ? 'bg-conifer-green-500 border-conifer-green-500' 
                  : 'border-conifer-green-300 hover:border-conifer-green-400'
              }`}>
                {recurrent && <Repeat className="w-4 h-4 text-white" />}
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold text-conifer-green-700">Recurring Task</span>
              <p className="text-xs text-conifer-green-600">Task will reset daily when completed</p>
            </div>
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-conifer-green-500 via-conifer-teal-500 to-conifer-blue-500 text-white py-4 px-6 rounded-2xl hover:from-conifer-green-600 hover:via-conifer-teal-600 hover:to-conifer-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-conifer-green-300/40 font-bold flex items-center justify-center space-x-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>{editingTask ? 'Update Task' : 'Create Task'}</span>
          </button>
          
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-4 border-2 border-conifer-gray-300 text-conifer-gray-700 rounded-2xl hover:border-conifer-gray-400 hover:bg-conifer-gray-50 transition-all duration-300 font-semibold shadow-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;