import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Header from './components/layout/Header';
import TaskList from './components/tasks/TaskList';

const AuthWrapper: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-conifer-green-50 via-conifer-teal-50 to-conifer-blue-50 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-conifer-green-200/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-conifer-teal-200/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-conifer-blue-200/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-conifer-gray-200/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative z-10">
          <Header />
          <TaskList />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-conifer-blue-50 via-conifer-teal-50 to-conifer-green-50 relative overflow-hidden flex items-center justify-center">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-28 h-28 bg-conifer-blue-200/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-12 w-36 h-36 bg-conifer-teal-200/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-conifer-green-200/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-24 right-1/4 w-24 h-24 bg-conifer-gray-200/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '2.2s'}}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        {isLogin ? (
          <LoginForm onToggleForm={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onToggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;