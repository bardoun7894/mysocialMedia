import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './components/pages/Dashboard';
import LanguageSelector from './components/settings/LanguageSelector';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // For now, we'll show a simple login form
    // In a real implementation, this would be a proper login page
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Social Media Management</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => {
                // Mock login for demonstration
                localStorage.setItem('authToken', 'mock-token');
                window.location.reload();
              }}
            >
              Sign In
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <LanguageSelector />
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
