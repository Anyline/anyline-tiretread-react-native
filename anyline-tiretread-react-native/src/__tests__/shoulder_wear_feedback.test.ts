// The native-module factory must be self-contained: ESM imports are hoisted
// above any module-scope `const`, so the factory cannot reference an outer
// variable. We read the jest.fn handles back off NativeModules after import.
jest.mock('react-native', () => ({
  NativeModules: {
    AnylineTtrMobileWrapperReactNative: {
      sendShoulderWearFeedback: jest.fn(),
    },
  },
  Platform: {
    OS: 'ios',
    select: (obj: { ios?: unknown; default?: unknown }) =>
      obj.ios ?? obj.default,
  },
}));

import { NativeModules } from 'react-native';
import { sendShoulderWearFeedback } from '../index';

const mockNative = (
  NativeModules as unknown as {
    AnylineTtrMobileWrapperReactNative: {
      sendShoulderWearFeedback: jest.Mock;
    };
  }
).AnylineTtrMobileWrapperReactNative;

describe('sendShoulderWearFeedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNative.sendShoulderWearFeedback.mockResolvedValue({
      ok: true,
      value: { measurementUUID: 'uuid', status: 'Completed' },
    });
  });

  it('forwards both sides', async () => {
    await sendShoulderWearFeedback('uuid', {
      left: { worn: true },
      right: { worn: false },
    });

    expect(mockNative.sendShoulderWearFeedback).toHaveBeenCalledWith({
      measurementUUID: 'uuid',
      leftWorn: true,
      rightWorn: false,
    });
  });

  it('sends null for a side that is left out', async () => {
    await sendShoulderWearFeedback('uuid', { right: { worn: true } });

    expect(mockNative.sendShoulderWearFeedback).toHaveBeenCalledWith({
      measurementUUID: 'uuid',
      leftWorn: null,
      rightWorn: true,
    });
  });

  it('sends null for a side passed as null', async () => {
    await sendShoulderWearFeedback('uuid', {
      left: { worn: false },
      right: null,
    });

    expect(mockNative.sendShoulderWearFeedback).toHaveBeenCalledWith({
      measurementUUID: 'uuid',
      leftWorn: false,
      rightWorn: null,
    });
  });
});
