import type { SdkError } from './scan_outcome';

export interface SdkOk<T> {
  ok: true;
  value: T;
}

export interface SdkErr {
  ok: false;
  error: SdkError;
}

export type SdkResult<T> = SdkOk<T> | SdkErr;
