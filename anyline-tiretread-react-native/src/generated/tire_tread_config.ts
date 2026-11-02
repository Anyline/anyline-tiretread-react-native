export interface TireTreadConfig {
  additionalContext?: AdditionalContext | null;
  scanConfig?: ScanConfig;
  uiConfig?: UIConfig;
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

export interface ScanConfig {
  heatmapStyle?: HeatmapStyle;
  tireWidth?: number | null;
}

export type HeatmapStyle = 'Colored' | 'Grayscale';

export interface UIConfig {
  appearance?: Appearance;
  distanceIndicatorConfig?: DistanceIndicatorConfig;
  focusPointTooltipConfig?: FocusPointTooltipConfig;
  measurementSystem?: MeasurementSystem;
  missingPermissionConfig?: MissingPermissionConfig;
  orientationWarningConfig?: OrientationWarningConfig;
  scanSpeed?: ScanSpeed;
  tapToStartScanningTooltipConfig?: TapToStartScanningTooltipConfig;
  tireWidthInputConfig?: TireWidthInputConfig;
  uploadViewConfig?: UploadViewConfig;
}

export type Appearance = 'Classic' | 'Neon';

export interface DistanceIndicatorConfig {
  /** Neon UI only. Shown during the scan when the distance cannot be determined. Default "Incorrect distance". */
  textIncorrectDistance?: string;
  /** Neon UI only. Shown before the scan when the distance is not right, imperial. Default "Keep distance at 8 in". */
  textKeepDistanceImperial?: string;
  /** Neon UI only. Shown before the scan when the distance is not right, metric. Default "Keep distance at 20 cm". */
  textKeepDistanceMetric?: string;
  /**
   * Neon UI only. Added after `textMoveAway` / `textMoveCloser` with " - " when much too close or too far during
   * the scan, imperial. An empty string shows only the move text. Default "keep distance at 8 in".
   */
  textKeepDistanceSuffixImperial?: string;
  /**
   * Neon UI only. Added after `textMoveAway` / `textMoveCloser` with " - " when much too close or too far during
   * the scan, metric. An empty string shows only the move text. Default "keep distance at 20 cm".
   */
  textKeepDistanceSuffixMetric?: string;
  textMoveAway?: string;
  textMoveCloser?: string;
  textOk?: string;
}

export interface FocusPointTooltipConfig {
  smallText?: string;
  text?: string;
}

export type MeasurementSystem = 'Metric' | 'Imperial';

export interface MissingPermissionConfig {
  text?: string;
  title?: string;
}

export interface OrientationWarningConfig {
  rotationLockHint?: string;
  text?: string;
}

export type ScanSpeed = 'Fast' | 'Slow';

export interface TapToStartScanningTooltipConfig {
  textNotOkImperial?: string;
  textNotOkMetric?: string;
  textOk?: string;
}

export interface TireWidthInputConfig {
  continueButtonText?: string;
  explanationText?: string;
  prefilledTireWidth?: number | null;
  tireWidthOptions?: number[];
  tireWidthRange?: TireWidthRange;
  titleText?: string;
}

export interface TireWidthRange {
  lowerLimit?: number;
  upperLimit?: number;
}

export interface UploadViewConfig {
  text?: string;
}
