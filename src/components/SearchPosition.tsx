import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { mockWaitlistData } from '../data/mockData';

interface SearchPositionProps {
  onSubmit: (waitlistNumber: number) => void;
}

export const SearchPosition: React.FC<SearchPositionProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waitlistNumber = parseInt(inputValue.trim());
    
    if (!inputValue.trim()) {
      setError('Please enter a waitlist number');
      return;
    }
    
    if (isNaN(waitlistNumber) || waitlistNumber <= 0) {
      setError('Please enter a valid waitlist number');
      return;
    }

    const entryExists = mockWaitlistData.some(entry => entry.waitlistNumber === waitlistNumber);
    
    if (!entryExists) {
      setError(`Waitlist number ${waitlistNumber} not found in the current data`);
      return;
    }

    setError('');
    onSubmit(waitlistNumber);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
          <div className="flex items-center gap-3 text-white">
            <Search className="w-6 h-6" />
            <h2 className="text-xl font-bold">Find Your Position</h2>
          </div>
          <p className="text-blue-100 text-sm mt-2">
            Enter your waitlist number to see your position analysis
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="waitlist-number" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your waitlist number
              </label>
              <div className="relative">
                <input
                  id="waitlist-number"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="e.g., 25, 148, 320"
                  className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Analyze My Position
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Available Waitlist Numbers</h3>
            <p className="text-sm text-blue-700 mb-2">
              Current data includes waitlist numbers from #{Math.min(...mockWaitlistData.map(e => e.waitlistNumber))} to #{Math.max(...mockWaitlistData.map(e => e.waitlistNumber))}
            </p>
            <div className="flex flex-wrap gap-1">
              {mockWaitlistData.slice(0, 10).map((entry) => (
                <button
                  key={entry.waitlistNumber}
                  onClick={() => {
                    setInputValue(entry.waitlistNumber.toString());
                    setError('');
                  }}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  #{entry.waitlistNumber}
                </button>
              ))}
              <span className="px-2 py-1 text-xs text-blue-600">...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};