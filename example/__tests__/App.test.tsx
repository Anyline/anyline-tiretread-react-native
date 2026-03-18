/**
 * @format
 */

import React, { act } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-config', () => ({
  TTR_LICENSE_KEY: 'test-license-key',
}));

jest.mock('@anyline/tire-tread-react-native-module', () => ({
  getResult: jest.fn(async () => ({
    ok: true,
    value: {
      measurementInfo: { status: 'Finished' },
      measurementMetadata: {},
      global: { value_mm: 5.2, value_inch: 0.205, value_inch_32nds: 7 },
      regions: [],
    },
  })),
  getSdkVersion: jest.fn(async () => '15.0.0'),
  initialize: jest.fn(async () => ({ ok: true, value: null })),
  scan: jest.fn(async () => ({
    kind: 'ScanCompleted',
    measurementUUID: 'measurement-uuid',
  })),
}), { virtual: true });

test('renders correctly', async () => {
  await act(async () => {
    ReactTestRenderer.create(<App />);
  });
});
