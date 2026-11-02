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
  /**
   * BETA: Shoulder wear estimate, set only on the first and the last region.
   * Absent on the middle regions, on `global`, when `shoulderWearEnabled` was
   * not set on `initialize`, and whenever there is no estimate.
   */
  shoulder_wear?: ShoulderWear | null;
}

/**
 * BETA: Shoulder wear estimate for the tire shoulder next to an outer region.
 * An automated estimate from the scan images, not a guaranteed assessment of
 * the tire's condition.
 */
export interface ShoulderWear {
  /** Whether the tire shoulder is probably worn. */
  worn: boolean;
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
