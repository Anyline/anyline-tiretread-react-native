export interface CompletedOutcome {
  kind: 'ScanCompleted';
  measurementUUID: string;
}

export interface AbortedOutcome {
  kind: 'ScanAborted';
  measurementUUID: null | string;
}

export interface FailedOutcome {
  kind: 'ScanFailed';
  measurementUUID: null | string;
  error?: SdkError;
}

export type ScanOutcome = CompletedOutcome | AbortedOutcome | FailedOutcome;
export type Kind = 'ScanCompleted' | 'ScanAborted' | 'ScanFailed';

export interface SdkError {
  code: ErrorCode;
  debug?: { [key: string]: string };
  message: string;
  type: ErrorType;
}

export type ErrorCode =
  | 'INVALID_ARGUMENT'
  | 'INVALID_LICENSE'
  | 'LICENSE_KEY_FORBIDDEN'
  | 'INITIALIZATION_FAILED'
  | 'NO_CONNECTION'
  | 'SDK_NOT_INITIALIZED'
  | 'SDK_NOT_VERIFIED'
  | 'ALREADY_RUNNING'
  | 'INVALID_UUID'
  | 'SESSION_CREATION_FAILED'
  | 'UPLOAD_FAILED'
  | 'MEASUREMENT_ERROR'
  | 'RESULT_ERROR'
  | 'HEATMAP_ERROR'
  | 'TIMEOUT'
  | 'INTERNAL_ERROR'
  | 'UNKNOWN_ERROR';

export type ErrorType =
  | 'LICENSE_ERROR'
  | 'CONFIG_ERROR'
  | 'NETWORK_ERROR'
  | 'SCAN_ERROR'
  | 'RESULT_ERROR';
