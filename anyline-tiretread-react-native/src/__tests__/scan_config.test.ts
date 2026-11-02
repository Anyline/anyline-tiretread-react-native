// The native-module factory must be self-contained: ESM imports are hoisted
// above any module-scope `const`, so the factory cannot reference an outer
// variable. We read the jest.fn handles back off NativeModules after import.
jest.mock('react-native', () => ({
  NativeModules: {
    AnylineTtrMobileWrapperReactNative: {
      scan: jest.fn(),
    },
  },
  Platform: {
    OS: 'ios',
    select: (obj: { ios?: unknown; default?: unknown }) =>
      obj.ios ?? obj.default,
  },
}));

import { NativeModules } from 'react-native';
import { scan, type TireTreadConfig } from '../index';

const mockNative = (
  NativeModules as unknown as {
    AnylineTtrMobileWrapperReactNative: {
      scan: jest.Mock;
    };
  }
).AnylineTtrMobileWrapperReactNative;

describe('scan config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNative.scan.mockResolvedValue({ kind: 'Canceled' });
  });

  it('passes the Neon distance texts to the SDK', async () => {
    const config: TireTreadConfig = {
      uiConfig: {
        distanceIndicatorConfig: {
          textKeepDistanceMetric: 'a',
          textKeepDistanceImperial: 'b',
          textKeepDistanceSuffixMetric: 'c',
          textKeepDistanceSuffixImperial: '',
          textIncorrectDistance: 'e',
        },
      },
    };

    await scan(config);

    const { configJson } = mockNative.scan.mock.calls[0][0];
    expect(JSON.parse(configJson).uiConfig.distanceIndicatorConfig).toEqual({
      textKeepDistanceMetric: 'a',
      textKeepDistanceImperial: 'b',
      textKeepDistanceSuffixMetric: 'c',
      textKeepDistanceSuffixImperial: '',
      textIncorrectDistance: 'e',
    });
  });
});
