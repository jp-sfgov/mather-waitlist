import React, { useState } from 'react';
import { WaitlistEntry } from '../types';
import { getCabinSizeColor } from '../utils/positionCalculator';
import { Users, MapPin } from 'lucide-react';
import { PositionAnalyzer } from './PositionAnalyzer';
import { calculatePosition } from '../utils/positionCalculator';

interface WaitlistTableProps {
  data: WaitlistEntry[];
  onEntryClick: (waitlistNumber: number) => void;
  selectedEntry?: number;
}

export const WaitlistTable: React.FC<WaitlistTableProps> = ({
  data,
  onEntryClick,
  selectedEntry
}) => {
  const [expandedEntry, setExpandedEntry] = useState<number | undefined>();

  const handleEntryClick = (waitlistNumber: number) => {
    onEntryClick(waitlistNumber);
    setExpandedEntry(expandedEntry === waitlistNumber ? undefined : waitlistNumber);
  };

  const expandedEntryData = expandedEntry 
    ? data.find(entry => entry.waitlistNumber === expandedEntry)
    : undefined;

  const positionAnalysis = expandedEntry 
    ? calculatePosition(expandedEntry, data)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Camp Mather Waitlist
        </h2>
        <p className="text-green-100 text-sm mt-1">
          Click on any waitlist number to see position analysis
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Waitlist #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Week Requests
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((entry) => (
              <React.Fragment key={entry.waitlistNumber}>
                <tr
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedEntry === entry.waitlistNumber ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => handleEntryClick(entry.waitlistNumber)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center justify-center w-12 h-8 rounded-full text-sm font-bold ${
                      selectedEntry === entry.waitlistNumber 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                    }`}>
                      {entry.waitlistNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {entry.weekRequests.map((request, idx) => (
                        <div key={idx} className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span className="font-medium">{request.week}:</span>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {request.cabinSizes.map((size) => (
                              <span
                                key={size}
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getCabinSizeColor(size)}`}
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                {expandedEntry === entry.waitlistNumber && expandedEntryData && (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 bg-gray-50">
                      <PositionAnalyzer
                        analysis={positionAnalysis}
                        waitlistNumber={expandedEntryData.waitlistNumber}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};