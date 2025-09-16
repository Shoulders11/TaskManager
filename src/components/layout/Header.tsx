import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="bg-white/85 backdrop-blur-lg border-b-2 border-ghibli-sage-200/50 sticky top-0 z-50 shadow-lg shadow-ghibli-sage-100/30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-conifer-green-500 via-conifer-teal-500 to-conifer-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-conifer-green-300/40 animate-pulse-slow">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-conifer-green-800">Closed List</h1>
            <p className="text-sm text-conifer-green-600 font-medium">Conifer Health</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-conifer-green-800">
              Welcome, {currentUser?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-conifer-green-600 font-medium">Let's get things done!</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-3 text-conifer-green-600 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;