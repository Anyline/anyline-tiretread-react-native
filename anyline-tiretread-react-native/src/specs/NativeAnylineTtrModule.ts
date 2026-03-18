import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import type { Heatmap } from '../generated/heatmap_payload';
import type {
  MeasurementInfo,
  TreadDepthResult,
  TreadDepthFeedbackRegion,
} from '../generated/result_payload';
import type { ScanOutcome } from '../generated/scan_outcome';
import type { SdkResult } from '../generated/sdk_result';

type InitializeArgs = {
  licenseKey: string;
  customTag: string | null;
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

export interface Spec extends TurboModule {
  initialize(options: InitializeArgs): Promise<SdkResult<null>>;
  scan(options: ScanArgs): Promise<ScanOutcome>;
  getResult(options: ResultArgs): Promise<SdkResult<TreadDepthResult>>;
  getHeatmap(options: ResultArgs): Promise<SdkResult<Heatmap>>;
  setTestingConfig(options: Object): Promise<void>;
  clearTestingConfig(): Promise<void>;
  sendCommentFeedback(options: CommentFeedbackArgs): Promise<SdkResult<MeasurementInfo>>;
  sendTreadDepthResultFeedback(options: TreadDepthFeedbackArgs): Promise<SdkResult<MeasurementInfo>>;
  sendTireIdFeedback(options: TireIdFeedbackArgs): Promise<SdkResult<MeasurementInfo>>;
  getSdkVersion(): Promise<string>;
  getWrapperVersion(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'AnylineTtrMobileWrapperReactNative'
);
