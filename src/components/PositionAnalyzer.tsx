import React from 'react';
import { PositionAnalysis } from '../types';
import { getCabinSizeColor } from '../utils/positionCalculator';
import { TrendingUp, Users, Calendar, Home } from 'lucide-react';

interface PositionAnalyzerProps {
  analysis: PositionAnalysis[];
  waitlistNumber: number;
}

export const PositionAnalyzer: React.FC<PositionAnalyzerProps> = ({
  analysis,
  waitlistNumber
}) => {
  if (analysis.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Position Analysis
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Waitlist #{waitlistNumber}
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {analysis.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-sm text-gray-800">{item.week}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Home className="w-4 h-4 text-gray-600" />
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCabinSizeColor(item.cabinSize)}`}>
                  {item.cabinSize}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Position in Line:</span>
                  <span className="text-lg font-bold text-gray-900">#{item.position}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Applications Ahead:</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{item.totalAhead}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};