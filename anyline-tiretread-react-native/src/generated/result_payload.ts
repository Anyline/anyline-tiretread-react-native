export interface TreadDepthResult {
  global: TreadResultRegion;
  measurementInfo: MeasurementInfo;
  measurementMetadata?: MeasurementMetadata | null;
  regions: TreadResultRegion[];
}

export interface TreadResultRegion {
  available: boolean;
  value_inch: number;
  value_inch_32nds: number;
  value_mm: number;
}

export interface TreadDepthFeedbackRegion {
  available: boolean;
  value_mm: number;
}

export interface MeasurementInfo {
  additionalContext?: AdditionalContext | null;
  measurementUUID: string;
  status: MeasurementStatus;
}

export interface AdditionalContext {
  correlationId?: null | string;
  tirePosition?: TirePosition | null;
}

export interface TirePosition {
  axle: number;
  positionOnAxle: number;
  side: TireSide;
}

export type TireSide = 'Left' | 'Right' | 'Center';

export type MeasurementStatus =
  | 'Unknown'
  | 'WaitingForImages'
  | 'Processing'
  | 'ResultReady'
  | 'ResultAndReportReady'
  | 'Completed'
  | 'Aborted'
  | 'Failed';

export interface MeasurementMetadata {
  movementDirection?: MovementDirection | null;
}

export type MovementDirection = 'Unknown' | 'LeftToRight' | 'RightToLeft';
