import React, { useState } from 'react';
import { Header } from './components/Header';
import { WaitlistTable } from './components/WaitlistTable';
import { PositionAnalyzer } from './components/PositionAnalyzer';
import { SearchPosition } from './components/SearchPosition';
import { Legend } from './components/Legend';
import { mockWaitlistData } from './data/mockData';
import { calculatePosition } from './utils/positionCalculator';

type ViewMode = 'browse' | 'search';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('search');
  const [selectedEntry, setSelectedEntry] = useState<number | undefined>();

  const handleEntryClick = (waitlistNumber: number) => {
    setSelectedEntry(waitlistNumber);
  };

  const handleSearchSubmit = (waitlistNumber: number) => {
    setSelectedEntry(waitlistNumber);
  };

  const selectedEntryData = selectedEntry 
    ? mockWaitlistData.find(entry => entry.waitlistNumber === selectedEntry)
    : undefined;

  const positionAnalysis = selectedEntry 
    ? calculatePosition(selectedEntry, mockWaitlistData)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <Header />
      
      {/* View Mode Toggle */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <div className="flex">
              <button
                onClick={() => setViewMode('search')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  viewMode === 'search'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Search Position
              </button>
              <button
                onClick={() => setViewMode('browse')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  viewMode === 'browse'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Browse Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-8 space-y-8">
        {viewMode === 'search' ? (
          <div className="space-y-8">
            <SearchPosition onSubmit={handleSearchSubmit} />
            
            {selectedEntryData && (
              <PositionAnalyzer
                analysis={positionAnalysis}
                waitlistNumber={selectedEntryData.waitlistNumber}
              />
            )}

            {!selectedEntry && (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Enter Your Waitlist Number
                  </h3>
                  <p className="text-gray-600">
                    Type your waitlist number above to see your detailed position analysis for each week and cabin size combination.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WaitlistTable
                data={mockWaitlistData}
                onEntryClick={handleEntryClick}
                selectedEntry={selectedEntry}
              />
            </div>
            
            <div>
              <Legend />
            </div>
          </div>
        )}

        {viewMode === 'browse' && selectedEntryData && (
          <PositionAnalyzer
            analysis={positionAnalysis}
            waitlistNumber={selectedEntryData.waitlistNumber}
          />
        )}

        {viewMode === 'browse' && !selectedEntry && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4">🏕️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Select a Waitlist Entry to Analyze
              </h3>
              <p className="text-gray-600">
                Click on any waitlist number above to see detailed position analysis for each week and cabin size combination.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Camp Mather Waitlist Analyzer - Making summer camp planning easier for San Francisco residents
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;