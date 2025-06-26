import { WaitlistEntry, PositionAnalysis, CabinSize } from '../types';

export function calculatePosition(
  targetWaitlistNumber: number,
  waitlistData: WaitlistEntry[]
): PositionAnalysis[] {
  const targetEntry = waitlistData.find(
    entry => entry.waitlistNumber === targetWaitlistNumber
  );
  
  if (!targetEntry) return [];

  const analyses: PositionAnalysis[] = [];

  // For each week/cabin combination the target entry requested
  targetEntry.weekRequests.forEach(weekRequest => {
    weekRequest.cabinSizes.forEach(cabinSize => {
      // Count entries ahead in line for this specific week/cabin combination
      let position = 1;
      
      waitlistData.forEach(entry => {
        if (entry.waitlistNumber < targetWaitlistNumber) {
          // Check if this entry also requested the same week/cabin combination
          const hasMatchingRequest = entry.weekRequests.some(request => 
            request.week === weekRequest.week && 
            request.cabinSizes.includes(cabinSize)
          );
          if (hasMatchingRequest) {
            position++;
          }
        }
      });

      analyses.push({
        week: weekRequest.week,
        cabinSize,
        position,
        totalAhead: position - 1
      });
    });
  });

  return analyses;
}

export function getCabinSizeColor(cabinSize: CabinSize): string {
  const colors = {
    '2PC': 'bg-blue-100 text-blue-800',
    '3PC': 'bg-indigo-100 text-indigo-800',
    '4PC': 'bg-green-100 text-green-800',
    '5PC': 'bg-yellow-100 text-yellow-800',
    '6PC': 'bg-purple-100 text-purple-800',
    '6PTS': 'bg-red-100 text-red-800'
  };
  return colors[cabinSize] || 'bg-gray-100 text-gray-800';
}