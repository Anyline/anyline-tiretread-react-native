/**
 * @format
 */

import React, { act } from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-config', () => ({
  TTR_LICENSE_KEY: 'test-license-key',
  TTR_SIDEWALL_CLIENT_ID: 'test-sidewall-client-id',
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
  getWrapperVersion: jest.fn(async () => '15.3.0'),
  isDeviceSupported: jest.fn(async () => ({ ok: true, value: true })),
  initialize: jest.fn(async () => ({ ok: true, value: null })),
  scan: jest.fn(async () => ({
    kind: 'ScanCompleted',
    measurementUUID: 'measurement-uuid',
  })),
  TireSidewall: {
    scan: jest.fn(async () => ({ kind: 'aborted' })),
    isSupported: jest.fn(async () => ({ supported: true, userResolvable: false })),
    resolvePlayServices: jest.fn(async () => {}),
  },
}), { virtual: true });

test('renders the three numbered groups and both scanner cards', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    renderer = ReactTestRenderer.create(<App />);
  });

  const texts = renderer.root
    .findAllByType(Text)
    .map((node) => node.props.children)
    .filter((child): child is string => typeof child === 'string');

  for (const label of [
    'TireTread API Explorer',
    'SET UP',
    'Correlation ID',
    'SCAN',
    'RESULTS',
    'Tire Sidewall',
    'Tire Tread',
  ]) {
    expect(texts).toContain(label);
  }
});
