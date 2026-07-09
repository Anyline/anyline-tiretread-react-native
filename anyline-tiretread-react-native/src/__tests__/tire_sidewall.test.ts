// The native-module factory must be self-contained: ESM imports are hoisted
// above any module-scope `const`, so the factory cannot reference an outer
// variable. We read the jest.fn handles back off NativeModules after import.
jest.mock('react-native', () => ({
  NativeModules: {
    AnylineTtrMobileWrapperReactNative: {
      tireSidewallScan: jest.fn(),
      tireSidewallIsSupported: jest.fn(),
      tireSidewallResolvePlayServices: jest.fn(),
    },
  },
  Platform: {
    OS: 'ios',
    select: (obj: { ios?: unknown; default?: unknown }) =>
      obj.ios ?? obj.default,
  },
}));

import { NativeModules } from 'react-native';
import { TireSidewall } from '../index';
import type { TireSidewallConfig } from '../generated/tire_sidewall';

const mockNative = (
  NativeModules as unknown as {
    AnylineTtrMobileWrapperReactNative: {
      tireSidewallScan: jest.Mock;
      tireSidewallIsSupported: jest.Mock;
      tireSidewallResolvePlayServices: jest.Mock;
    };
  }
).AnylineTtrMobileWrapperReactNative;

describe('TireSidewall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('scan() stringifies the config and forwards the clientId', async () => {
    mockNative.tireSidewallScan.mockResolvedValue({ kind: 'aborted' });
    const config: TireSidewallConfig = {
      correlationId: 'c0ffee00-c0ff-4ee0-b0ba-c0ffee0000ff',
      texts: { alignTire: 'Align the tire' },
    };

    const outcome = await TireSidewall.scan({ clientId: 'client-123', config });

    expect(mockNative.tireSidewallScan).toHaveBeenCalledWith({
      clientId: 'client-123',
      configJson: JSON.stringify(config),
    });
    expect(outcome).toEqual({ kind: 'aborted' });
  });

  it('scan() passes configJson: null when no config is provided', async () => {
    mockNative.tireSidewallScan.mockResolvedValue({ kind: 'aborted' });

    await TireSidewall.scan({ clientId: 'client-123' });

    expect(mockNative.tireSidewallScan).toHaveBeenCalledWith({
      clientId: 'client-123',
      configJson: null,
    });
  });

  it('isSupported() delegates to the native module', async () => {
    const support = { supported: false, userResolvable: true };
    mockNative.tireSidewallIsSupported.mockResolvedValue(support);

    await expect(TireSidewall.isSupported()).resolves.toEqual(support);
    expect(mockNative.tireSidewallIsSupported).toHaveBeenCalledTimes(1);
  });

  it('resolvePlayServices() delegates to the native module', async () => {
    mockNative.tireSidewallResolvePlayServices.mockResolvedValue(undefined);

    await TireSidewall.resolvePlayServices();

    expect(mockNative.tireSidewallResolvePlayServices).toHaveBeenCalledTimes(1);
  });
});
