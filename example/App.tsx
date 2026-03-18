import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getResult,
  getSdkVersion,
  initialize,
  scan,
  type ScanOptions,
  type ScanOutcome,
  type SdkError,
  type TireTreadConfig,
  type TreadDepthResult,
} from '@anyline/tire-tread-react-native-module';
import Config from 'react-native-config';

const DEFAULT_CONFIG = require('./assets/config/sample_config_default.json') as TireTreadConfig;
const VERBOSE_SCAN_OPTIONS: ScanOptions = {
  enableDebugLogging: true,
};

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
};

function AppButton({ title, onPress, disabled, loading = false }: AppButtonProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading) && styles.buttonDisabled,
        pressed && !disabled && !loading && styles.buttonPressed,
      ]}
    >
      {loading ? <ActivityIndicator color="#FFFFFF" size="small" /> : null}
      <Text style={styles.buttonText}>{loading ? `${title}...` : title}</Text>
    </Pressable>
  );
}

function formatError(error: SdkError): string {
  return `${error.code}: ${error.message}`;
}

function formatNumber(value: number): string {
  return Number.isFinite(value) ? value.toFixed(2) : '-';
}

export default function App(): React.JSX.Element {
  const [sdkVersion, setSdkVersion] = React.useState<string>('loading...');
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [measurementUUID, setMeasurementUUID] = React.useState<string | null>(null);
  const [scanOutcome, setScanOutcome] = React.useState<ScanOutcome | null>(null);
  const [treadDepthResult, setTreadDepthResult] = React.useState<TreadDepthResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [isInitializing, setIsInitializing] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);
  const [isFetchingResult, setIsFetchingResult] = React.useState(false);
  const [initStatus, setInitStatus] = React.useState('Not initialised');
  const [scanStatus, setScanStatus] = React.useState('Not scanned');
  const [resultStatus, setResultStatus] = React.useState('No result requested');

  React.useEffect(() => {
    let mounted = true;
    getSdkVersion()
      .then((version) => {
        if (mounted) setSdkVersion(version || 'unknown');
      })
      .catch(() => {
        if (mounted) setSdkVersion('unknown');
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleInitPress = React.useCallback(async () => {
    if (isInitialized || isInitializing) return;

    setError(null);
    setIsInitializing(true);
    setInitStatus('Initialising...');

    try {
      const res = await initialize(Config.TTR_LICENSE_KEY || '');
      if (res.ok) {
        setIsInitialized(true);
        setInitStatus('Initialised');
        return;
      }
      setInitStatus(`Failed (${res.error.code})`);
      setError(formatError(res.error));
    } catch (_error) {
      setInitStatus('Failed (unexpected error)');
      setError('Unexpected init error');
    } finally {
      setIsInitializing(false);
    }
  }, [isInitialized, isInitializing]);

  const handleScanPress = React.useCallback(async () => {
    if (!isInitialized || isScanning) return;

    setError(null);
    setScanOutcome(null);
    setMeasurementUUID(null);
    setTreadDepthResult(null);
    setIsScanning(true);
    setScanStatus('Scanning...');
    setResultStatus('No result requested');

    try {
      const outcome = await scan(DEFAULT_CONFIG, VERBOSE_SCAN_OPTIONS);
      setScanOutcome(outcome);

      if (outcome.kind === 'ScanCompleted') {
        setMeasurementUUID(outcome.measurementUUID);
        setScanStatus('Scan completed');
        return;
      }

      if (outcome.kind === 'ScanFailed') {
        setScanStatus(`Failed (${outcome.error.code})`);
        setError(formatError(outcome.error));
        return;
      }

      setScanStatus('Scan aborted');
      setError('Scan was aborted');
    } catch (_error) {
      setScanStatus('Failed (unexpected error)');
      setError('Unexpected scan error');
    } finally {
      setIsScanning(false);
    }
  }, [isInitialized, isScanning]);

  const handleGetResultPress = React.useCallback(async () => {
    if (!measurementUUID || isFetchingResult) return;

    setError(null);
    setTreadDepthResult(null);
    setIsFetchingResult(true);
    setResultStatus('Fetching result...');

    try {
      const res = await getResult(measurementUUID);
      if (!res.ok) {
        setResultStatus(`Failed (${res.error.code})`);
        setError(formatError(res.error));
        return;
      }
      setTreadDepthResult(res.value);
      setResultStatus(`Loaded (${res.value.measurementInfo.status})`);
    } catch (_error) {
      setResultStatus('Failed (unexpected error)');
      setError('Unexpected result error');
    } finally {
      setIsFetchingResult(false);
    }
  }, [measurementUUID, isFetchingResult]);

  const canScan = isInitialized;
  const canFetchResult = isInitialized && !!measurementUUID;
  const isBusy = isInitializing || isScanning || isFetchingResult;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image
            source={require('./assets/anyline_logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />

          <View style={styles.actionBlock}>
            <AppButton
              title="Initialise"
              onPress={handleInitPress}
              disabled={isInitialized || isBusy}
              loading={isInitializing}
            />
            <Text style={styles.actionStatus}>{initStatus}</Text>
          </View>

          <View style={styles.actionBlock}>
            <AppButton
              title="Scan"
              onPress={handleScanPress}
              disabled={!canScan || isBusy}
              loading={isScanning}
            />
            <Text style={styles.actionStatus}>{scanStatus}</Text>
          </View>

          <View style={styles.actionBlock}>
            <AppButton
              title="Get Result"
              onPress={handleGetResultPress}
              disabled={!canFetchResult || isBusy}
              loading={isFetchingResult}
            />
            <Text style={styles.actionStatus}>{resultStatus}</Text>
          </View>

          {scanOutcome?.kind === 'ScanCompleted' ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Scan Summary</Text>
              <Text style={styles.valueText}>Measurement UUID: {scanOutcome.measurementUUID}</Text>
            </View>
          ) : null}

          {treadDepthResult ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Result</Text>
              <Text style={styles.cardSubtitle}>
                Status: {treadDepthResult.measurementInfo.status}
              </Text>
              {treadDepthResult.measurementMetadata?.movementDirection ? (
                <Text style={styles.valueText}>
                  Direction: {treadDepthResult.measurementMetadata.movementDirection}
                </Text>
              ) : null}
              <View style={styles.metricGrid}>
                <View style={styles.metricCell}>
                  <Text style={styles.metricLabel}>Global mm</Text>
                  <Text style={styles.metricValue}>{formatNumber(treadDepthResult.global.value_mm)}</Text>
                </View>
                <View style={styles.metricCell}>
                  <Text style={styles.metricLabel}>Global inch</Text>
                  <Text style={styles.metricValue}>{formatNumber(treadDepthResult.global.value_inch)}</Text>
                </View>
                <View style={styles.metricCell}>
                  <Text style={styles.metricLabel}>Global 1/32"</Text>
                  <Text style={styles.metricValue}>{formatNumber(treadDepthResult.global.value_inch_32nds)}</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>Regions</Text>
              {treadDepthResult.regions.map((region, index) => (
                <View key={`region-${index}`} style={styles.regionRow}>
                  <Text style={styles.regionName}>Region {index + 1}</Text>
                  <Text style={styles.regionValue}>
                    {region.available ? `${formatNumber(region.value_mm)} mm` : 'Unavailable'}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {error ? (
            <View style={styles.cardError}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
        </ScrollView>

        <Text style={styles.footer}>SDK Version: {sdkVersion}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screen: {
    flex: 1,
    position: 'relative',
  },
  content: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 80,
  },
  headerLogo: {
    width: '100%',
    height: 72,
    marginBottom: 8,
  },
  button: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#0099FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    backgroundColor: '#3D5F73',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  actionBlock: {
    gap: 8,
  },
  actionStatus: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.9,
  },
  card: {
    borderWidth: 1,
    borderColor: '#1E2A32',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#0B1116',
    gap: 4,
  },
  cardError: {
    borderWidth: 1,
    borderColor: '#F87171',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#2B1212',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  metricGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#22313C',
    borderRadius: 10,
    backgroundColor: '#0E161D',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  metricLabel: {
    color: '#B4C4CF',
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  regionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E2A32',
    borderRadius: 10,
    backgroundColor: '#0E161D',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  regionName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  regionValue: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 14,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
