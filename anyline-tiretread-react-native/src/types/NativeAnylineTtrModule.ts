import type { Heatmap } from '../generated/heatmap_payload';
import type {
  MeasurementInfo,
  TreadDepthResult,
  TreadDepthFeedbackRegion,
} from '../generated/result_payload';
import type { ScanOutcome } from '../generated/scan_outcome';
import type { SdkResult } from '../generated/sdk_result';
import type {
  TswScanOutcome,
  TireSidewallSupport,
} from '../generated/tire_sidewall';

type InitializeArgs = {
  licenseKey: string;
  customTag: string | null;
  uploadTimeoutMillis: number | null;
};

type ScanArgs = {
  configJson: string | null;
  optionsJson: string | null;
};

type ResultArgs = {
  measurementUUID: string;
  timeoutSeconds: number | null;
};

type CommentFeedbackArgs = {
  measurementUUID: string;
  comment: string;
};

type TreadDepthFeedbackArgs = {
  measurementUUID: string;
  treadResultRegions: TreadDepthFeedbackRegion[];
};

type TireIdFeedbackArgs = {
  measurementUUID: string;
  tireId: string;
};

type TireSidewallScanArgs = {
  clientId: string;
  configJson: string | null;
};

export interface Spec {
  initialize(options: InitializeArgs): Promise<SdkResult<null>>;
  isDeviceSupported(): Promise<SdkResult<boolean>>;
  scan(options: ScanArgs): Promise<ScanOutcome>;
  getResult(options: ResultArgs): Promise<SdkResult<TreadDepthResult>>;
  getHeatmap(options: ResultArgs): Promise<SdkResult<Heatmap>>;
  setTestingConfig(options: Object): Promise<void>;
  clearTestingConfig(): Promise<void>;
  sendCommentFeedback(
    options: CommentFeedbackArgs
  ): Promise<SdkResult<MeasurementInfo>>;
  sendTreadDepthResultFeedback(
    options: TreadDepthFeedbackArgs
  ): Promise<SdkResult<MeasurementInfo>>;
  sendTireIdFeedback(
    options: TireIdFeedbackArgs
  ): Promise<SdkResult<MeasurementInfo>>;
  getSdkVersion(): Promise<string>;
  getWrapperVersion(): Promise<string>;
  tireSidewallScan(options: TireSidewallScanArgs): Promise<TswScanOutcome>;
  tireSidewallIsSupported(): Promise<TireSidewallSupport>;
  tireSidewallResolvePlayServices(): Promise<void>;
}
