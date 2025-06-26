import React from 'react';
import { Info, Home } from 'lucide-react';
import { getCabinSizeColor } from '../utils/positionCalculator';

export const Legend: React.FC = () => {
  const cabinSizes = ['2PC', '3PC', '4PC', '5PC', '6PC', '6PTS'] as const;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5" />
        Understanding the Waitlist
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Home className="w-4 h-4" />
            Cabin Size Legend
          </h3>
          <div className="flex flex-wrap gap-2">
            {cabinSizes.map((size) => (
              <span
                key={size}
                className={`px-3 py-1 text-sm font-medium rounded-full ${getCabinSizeColor(size)}`}
              >
                {size} {size !== '6PTS' && `(up to ${size.replace('PC', '')} people)`}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>How it works:</strong> Each waitlist entry can request multiple weeks with different cabin size preferences.</p>
          <p><strong>Your position:</strong> Calculated separately for each week + cabin size combination you requested.</p>
          <p><strong>Example:</strong> If you're #300 on the waitlist but only 5 entries ahead of you want the same week/cabin, you're actually #6 in line for that specific combination.</p>
        </div>
      </div>
    </div>
  );
};