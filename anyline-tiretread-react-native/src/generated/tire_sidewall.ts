import type { SdkError } from './scan_outcome';

/**
 * Ambient lighting condition detected during a sidewall scan.
 *
 * Mirrors the SDK's `EnvironmentLighting` enum. Reported as telemetry on the
 * captured frame; it is not a prediction input.
 */
export type EnvironmentLighting = 'Dark' | 'Bright' | 'Good';

/**
 * Localizable UI strings shown by the sidewall scanner overlay.
 *
 * Mirrors the SDK's `TswScannerTexts`. Every field is optional: omit a field to
 * keep the SDK's English default, or set it to override that one string.
 */
export interface TireSidewallTexts {
  /** Shown while the scanner is starting up. */
  initializing?: string;
  /** Shown when the tire must be aligned within the overlay. */
  alignTire?: string;
  /** Shown when the user is too far from the tire. */
  moveCloser?: string;
  /** Shown when the user is too close to the tire. */
  moveAway?: string;
  /** Shown when the device is at too steep an angle. */
  faceTire?: string;
  /** Shown when framing is good and capture can start. */
  ready?: string;
  /** Shown while the capture is taken. */
  holdSteady?: string;
  /** Shown while the camera refocuses after capture. */
  focusing?: string;
  /** Shown while white balance calibrates after capture. */
  calibratingWhiteBalance?: string;
  /** Shown while exposure calibrates after capture. */
  calibratingExposure?: string;
  /** Shown when the scanner turns the torch on for a dark environment. */
  tooDark?: string;
}

/**
 * Configuration for a Tire Sidewall (TSW) scan.
 *
 * Mirrors the SDK's `TswScannerConfig`. UI strings live under {@link texts};
 * scan-level inputs (such as {@link correlationId}) sit at the top level.
 */
export interface TireSidewallConfig {
  /**
   * Optional ID to correlate scans across Anyline products (e.g. Tire Sidewall
   * and Tire Tread). Must be a version-4 UUID when set; omit to send none. An
   * invalid value fails the scan with `INVALID_UUID`.
   */
  correlationId?: string | null;
  /** Localizable UI strings shown by the scanner overlay. */
  texts?: TireSidewallTexts;
}

/**
 * Result of {@link TireSidewall.isSupported}.
 *
 * Mirrors the SDK's `TswSupportStatus`. When {@link supported} is `false`,
 * {@link error} explains why and {@link userResolvable} indicates whether the
 * user can fix it (e.g. install/update Google Play Services on Android). On a
 * user-resolvable failure, call {@link TireSidewall.resolvePlayServices}.
 */
export interface TireSidewallSupport {
  supported: boolean;
  userResolvable: boolean;
  error?: SdkError;
}

/**
 * Scan succeeded. Carries the raw cloud result JSON, the captured (upright)
 * image as a base64-encoded JPEG, and the ambient lighting at capture time.
 */
export interface TswScanCompleted {
  kind: 'completed';
  /**
   * The cloud response for the sidewall scan, as a raw JSON string. Parse it in
   * your app; a typed model may be added once the response schema is final.
   */
  resultJson: string;
  /**
   * The captured sidewall image as a base64-encoded JPEG (no data-URI prefix).
   * Render it with `{ uri: 'data:image/jpeg;base64,' + imageBase64 }`.
   */
  imageBase64: string;
  /** Ambient lighting detected for the captured frame, or `null` if unavailable. */
  lighting: EnvironmentLighting | null;
}

/** User aborted before capture. */
export interface TswScanAborted {
  kind: 'aborted';
}

/** Scan failed. Carries a structured {@link SdkError}. */
export interface TswScanFailed {
  kind: 'failed';
  error?: SdkError;
}

/**
 * Outcome of a Tire Sidewall (TSW) scan, delivered once when
 * {@link TireSidewall.scan} completes. Mirrors the SDK's `TswScanResult`.
 */
export type TswScanOutcome = TswScanCompleted | TswScanAborted | TswScanFailed;
