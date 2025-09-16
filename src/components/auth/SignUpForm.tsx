import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, Mail, Lock } from 'lucide-react';

interface SignUpFormProps {
  onToggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
    } catch (error: any) {
      setError('Failed to create account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/85 backdrop-blur-md rounded-[2rem] shadow-2xl shadow-conifer-blue-200/30 p-8 border-2 border-conifer-blue-100/50">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-conifer-blue-500 via-conifer-teal-500 to-conifer-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-conifer-blue-300/40 animate-pulse-slow">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-conifer-blue-800 mb-3">Join Us</h2>
        <p className="text-conifer-blue-600 font-medium">Create your Closed List account</p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-conifer-blue-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-5 py-4 border-2 border-conifer-blue-200 rounded-2xl focus:border-conifer-blue-400 focus:outline-none focus:ring-4 focus:ring-conifer-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 w-5 h-5 text-conifer-blue-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
            className="w-full pl-12 pr-5 py-4 border-2 border-conifer-blue-200 rounded-2xl focus:border-conifer-blue-400 focus:outline-none focus:ring-4 focus:ring-conifer-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 w-5 h-5 text-conifer-blue-400" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full pl-12 pr-5 py-4 border-2 border-conifer-blue-200 rounded-2xl focus:border-conifer-blue-400 focus:outline-none focus:ring-4 focus:ring-conifer-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-conifer-blue-500 via-conifer-teal-500 to-conifer-green-500 text-white py-4 px-6 rounded-2xl hover:from-conifer-blue-600 hover:via-conifer-teal-600 hover:to-conifer-green-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-conifer-blue-300/40 disabled:opacity-50 font-semibold text-lg shadow-lg"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center mt-8 text-conifer-blue-600 font-medium">
        Already have an account?{' '}
        <button
          onClick={onToggleForm}
          className="text-conifer-green-500 hover:text-conifer-green-600 font-bold transition-colors duration-200 underline decoration-2 underline-offset-2"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;