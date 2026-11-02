// The native-module factory must be self-contained: ESM imports are hoisted
// above any module-scope `const`, so the factory cannot reference an outer
// variable. We read the jest.fn handles back off NativeModules after import.
jest.mock('react-native', () => ({
  NativeModules: {
    AnylineTtrMobileWrapperReactNative: {
      initialize: jest.fn(),
    },
  },
  Platform: {
    OS: 'ios',
    select: (obj: { ios?: unknown; default?: unknown }) =>
      obj.ios ?? obj.default,
  },
}));

import { NativeModules } from 'react-native';
import { initialize } from '../index';

const mockNative = (
  NativeModules as unknown as {
    AnylineTtrMobileWrapperReactNative: {
      initialize: jest.Mock;
    };
  }
).AnylineTtrMobileWrapperReactNative;

describe('initialize', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNative.initialize.mockResolvedValue({ ok: true, value: null });
  });

  it('defaults the options when none are provided', async () => {
    await initialize('license');

    expect(mockNative.initialize).toHaveBeenCalledWith({
      licenseKey: 'license',
      customTag: null,
      uploadTimeoutMillis: null,
      shoulderWearEnabled: null,
    });
  });

  it('forwards shoulderWearEnabled', async () => {
    await initialize('license', { shoulderWearEnabled: true });

    expect(mockNative.initialize).toHaveBeenCalledWith(
      expect.objectContaining({ shoulderWearEnabled: true })
    );
  });
});
