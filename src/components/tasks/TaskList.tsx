import React, { useState, useMemo } from 'react';
import { Task, FilterType } from '../../types';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import { Sparkles, Filter } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<Task['priority'] | 'all'>('all');

  const isToday = (dateString: string) => {
    if (!dateString) return false;
    const taskDate = new Date(dateString);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply main filter
    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      case 'dueToday':
        filtered = tasks.filter(task => isToday(task.dueDate));
        break;
      default:
        filtered = tasks;
    }

    // Apply priority filter
    if (selectedPriorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === selectedPriorityFilter);
    }

    return filtered;
  }, [tasks, filter, selectedPriorityFilter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
    dueToday: tasks.filter(task => isToday(task.dueDate)).length,
  }), [tasks]);

  const handleSubmit = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await addTask(taskData);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-conifer-green-500 via-conifer-teal-500 to-conifer-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-xl shadow-conifer-green-300/40">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-conifer-green-600 font-semibold text-lg">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <TaskForm 
        onSubmit={handleSubmit} 
        editingTask={editingTask} 
        onCancel={() => setEditingTask(null)} 
      />
      
      {/* Priority Filter */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border-2 border-conifer-green-100/50 mb-6 shadow-xl shadow-conifer-green-200/20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-conifer-green-600" />
            <label className="text-sm font-semibold text-conifer-green-700">Filter by Priority:</label>
          </div>
          <select
            value={selectedPriorityFilter}
            onChange={(e) => setSelectedPriorityFilter(e.target.value as Task['priority'] | 'all')}
            className="px-4 py-2 border-2 border-conifer-green-200 rounded-xl focus:border-conifer-green-400 focus:outline-none focus:ring-2 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="None">None</option>
            <option value="Important">Important</option>
            <option value="Urgent">Urgent</option>
            <option value="Urgent & Important">Urgent & Important</option>
          </select>
        </div>
      </div>

      <TaskFilter 
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
      />

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-conifer-teal-400 via-conifer-blue-400 to-conifer-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-conifer-teal-300/40 animate-pulse-slow backdrop-blur-sm">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-conifer-green-100/50 shadow-xl shadow-conifer-green-200/20">
            <h3 className="text-3xl font-bold text-conifer-gray-700 mb-4">
            {filter === 'completed' 
              ? 'No completed tasks yet' 
              : filter === 'active' 
              ? 'No active tasks' 
              : filter === 'dueToday'
              ? 'No tasks due today'
              : 'No tasks yet'}
            </h3>
            <p className="text-conifer-gray-500 max-w-sm mx-auto font-medium text-lg">
            {filter === 'all' 
              ? selectedPriorityFilter !== 'all' 
                ? `No tasks with ${selectedPriorityFilter} priority found.`
                : "Start by adding your first task!" 
              : filter === 'active'
              ? "All your tasks are complete! Time to celebrate! 🎉"
              : filter === 'dueToday'
              ? "No tasks are due today. Enjoy your day!"
              : "Complete some tasks to see them here."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-8 p-8 bg-white/70 backdrop-blur-md rounded-3xl border-2 border-conifer-green-100/50 shadow-xl shadow-conifer-green-200/20">
          <div className="text-center">
            <p className="text-conifer-green-700 font-semibold text-lg">
              You have {taskCounts.active} active task{taskCounts.active !== 1 ? 's' : ''} 
              {taskCounts.completed > 0 && ` and ${taskCounts.completed} completed`}
            </p>
            {taskCounts.completed > 0 && (
              <p className="text-base text-conifer-green-600 mt-2 font-medium">
                Great progress! Keep going! ✨
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;