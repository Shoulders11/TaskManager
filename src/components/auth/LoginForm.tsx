import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (error: any) {
      setError('Failed to log in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/85 backdrop-blur-md rounded-[2rem] shadow-2xl shadow-conifer-green-200/30 p-8 border-2 border-conifer-green-100/50">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-conifer-green-500 via-conifer-teal-500 to-conifer-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-conifer-green-300/40 animate-pulse-slow">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-conifer-green-800 mb-3">Welcome Back</h2>
        <p className="text-conifer-green-600 font-medium">Sign in to Closed List</p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-conifer-green-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-5 py-4 border-2 border-conifer-green-200 rounded-2xl focus:border-conifer-green-400 focus:outline-none focus:ring-4 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 w-5 h-5 text-conifer-green-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-12 pr-5 py-4 border-2 border-conifer-green-200 rounded-2xl focus:border-conifer-green-400 focus:outline-none focus:ring-4 focus:ring-conifer-green-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-conifer-green-500 via-conifer-teal-500 to-conifer-blue-500 text-white py-4 px-6 rounded-2xl hover:from-conifer-green-600 hover:via-conifer-teal-600 hover:to-conifer-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-conifer-green-300/40 disabled:opacity-50 font-semibold text-lg shadow-lg"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center mt-8 text-conifer-green-600 font-medium">
        Don't have an account?{' '}
        <button
          onClick={onToggleForm}
          className="text-conifer-blue-500 hover:text-conifer-blue-600 font-bold transition-colors duration-200 underline decoration-2 underline-offset-2"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;