import React from 'react';
import { Mountain, TreePine } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-700 via-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Mountain className="w-8 h-8" />
            <TreePine className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Camp Mather Waitlist Analyzer</h1>
            <p className="text-green-100 text-lg">City and County of San Francisco</p>
          </div>
        </div>
        <p className="text-green-100 max-w-3xl leading-relaxed">
          Easily understand your position in line for different weeks and cabin sizes. 
          Click on any waitlist number below to see a detailed analysis of your chances for each requested week.
        </p>
      </div>
    </header>
  );
};