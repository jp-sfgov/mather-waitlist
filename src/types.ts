export interface WaitlistEntry {
  waitlistNumber: number;
  weekRequests: WeekRequest[];
}

export interface WeekRequest {
  week: string;
  cabinSizes: CabinSize[];
}

export type CabinSize = '2PC' | '3PC' | '4PC' | '5PC' | '6PC' | '6PTS' | '6PTS';

export interface PositionAnalysis {
  week: string;
  cabinSize: CabinSize;
  position: number;
  totalAhead: number;
}