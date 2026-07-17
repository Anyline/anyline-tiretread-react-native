import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  getResult,
  getSdkVersion,
  getWrapperVersion,
  initialize,
  isDeviceSupported,
  scan,
  TireSidewall,
  type ScanOptions,
  type SdkError,
  type TireTreadConfig,
  type TreadDepthResult,
  type TswScanOutcome,
} from '@anyline/tire-tread-react-native-module';
import Config from 'react-native-config';

import { prettyJson, sizeFromResultJson, tireWidthFromResultJson } from './sidewall';

import {
  GroupHeader,
  MetricTile,
  MutedChip,
  PrimaryButton,
  SectionCard,
  StatusChip,
  SwitchRow,
  type Theme,
  Toast,
  useTheme,
} from './DevEx';
import {
  CheckIcon,
  DownloadIcon,
  FocusIcon,
  LinkIcon,
  RefreshIcon,
  ScanFrameIcon,
  TireSidewallIcon,
  TireTreadIcon,
} from './icons';
import { uuidV4 } from './uuid';
import {
  AttachedChip,
  Hairline,
  Header,
  JsonDisclosure,
  MetaRow,
  MonoField,
  ScannerBadge,
  SelectField,
  SetupRow,
  SidewallResultRow,
  SoftButton,
  StatusLine,
  TireWidthField,
} from './explorer-ui';

// Scan-config JSONs bundled with the example. The empty option runs with the
// SDK defaults; the picker in the Tire Tread card selects the base config.
const CONFIGS: { label: string; config: TireTreadConfig | null }[] = [
  { label: 'Default config', config: null },
  {
    label: 'classic_appearance.json',
    config: require('./assets/config/classic_appearance.json') as TireTreadConfig,
  },
  {
    label: 'full_config.json',
    config: require('./assets/config/full_config.json') as TireTreadConfig,
  },
  {
    label: 'slow_imperial.json',
    config: require('./assets/config/slow_imperial.json') as TireTreadConfig,
  },
  {
    label: 'tire_width_input_test.json',
    config: require('./assets/config/tire_width_input_test.json') as TireTreadConfig,
  },
];
const VERBOSE_SCAN_OPTIONS: ScanOptions = {
  enableDebugLogging: true,
};

// RN's SafeAreaView does not inset for the Android status bar (and Android 15
// draws edge-to-edge), so pad the top by the status-bar height there.
const ANDROID_STATUS_BAR = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

function formatError(error: SdkError): string {
  return `${error.code}: ${error.message}`;
}

function formatNumber(value: number): string {
  return Number.isFinite(value) ? value.toFixed(2) : '-';
}

function buildTreadConfig(
  base: TireTreadConfig,
  correlationId: string | null,
  tireWidth: number | null,
): TireTreadConfig {
  let config = base;
  if (correlationId) {
    config = { ...config, additionalContext: { ...(config.additionalContext ?? {}), correlationId } };
  }
  if (tireWidth != null) {
    config = { ...config, scanConfig: { ...(config.scanConfig ?? {}), tireWidth } };
  }
  return config;
}

type StatusDetail = { text: string; color: string };

function deviceSupportDetail(t: Theme, checked: boolean, supported: boolean): StatusDetail {
  if (!checked) return { text: 'Not checked yet', color: t.textTertiary };
  if (supported) return { text: 'Device is supported', color: t.success };
  return { text: 'Device is not supported', color: t.danger };
}

function initDetail(t: Theme, initializing: boolean, initialized: boolean, failed: boolean): StatusDetail {
  if (initializing) return { text: 'Initializing…', color: t.textTertiary };
  if (initialized) return { text: 'Initialized · ready to scan', color: t.success };
  if (failed) return { text: 'Initialization failed', color: t.danger };
  return { text: 'Not initialized yet', color: t.textTertiary };
}

export default function App(): React.JSX.Element {
  const t = useTheme();
  const scheme = useColorScheme();

  const [sdkVersion, setSdkVersion] = React.useState('…');
  const [pluginVersion, setPluginVersion] = React.useState('…');

  const [includeCorrelationId, setIncludeCorrelationId] = React.useState(true);
  const [correlationId, setCorrelationId] = React.useState(uuidV4);

  const [configIndex, setConfigIndex] = React.useState(0);
  const [tireWidth, setTireWidth] = React.useState<number | null>(null);
  const [tireWidthFromSidewall, setTireWidthFromSidewall] = React.useState(false);

  const [isCheckingSupport, setIsCheckingSupport] = React.useState(false);
  const [supportChecked, setSupportChecked] = React.useState(false);
  const [deviceSupported, setDeviceSupported] = React.useState(false);

  const [isInitializing, setIsInitializing] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [initFailed, setInitFailed] = React.useState(false);

  const [sidewallSupported, setSidewallSupported] = React.useState(true);
  const [isSidewallScanning, setIsSidewallScanning] = React.useState(false);
  const [sidewallStatus, setSidewallStatus] = React.useState('');
  const [sidewallIsError, setSidewallIsError] = React.useState(false);
  const [sidewallOutcome, setSidewallOutcome] = React.useState<TswScanOutcome | null>(null);

  const [isScanning, setIsScanning] = React.useState(false);
  const [treadStatus, setTreadStatus] = React.useState('');
  const [treadIsError, setTreadIsError] = React.useState(false);
  const [measurementUUID, setMeasurementUUID] = React.useState<string | null>(null);

  const [isFetchingResult, setIsFetchingResult] = React.useState(false);
  const [resultStatus, setResultStatus] = React.useState('');
  const [resultIsError, setResultIsError] = React.useState(false);
  const [treadDepthResult, setTreadDepthResult] = React.useState<TreadDepthResult | null>(null);

  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    getSdkVersion()
      .then((v: string) => {
        if (mounted) setSdkVersion(v || 'unknown');
      })
      .catch(() => {
        if (mounted) setSdkVersion('unknown');
      });
    getWrapperVersion()
      .then((v: string) => {
        if (mounted) setPluginVersion(v || 'unknown');
      })
      .catch(() => {
        if (mounted) setPluginVersion('unknown');
      });
    TireSidewall.isSupported()
      .then((s: { supported: boolean }) => {
        if (mounted) setSidewallSupported(s.supported);
      })
      .catch(() => {});
    return () => {
      mounted = false;
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const handleDeviceSupportPress = React.useCallback(async () => {
    if (isCheckingSupport) return;
    setIsCheckingSupport(true);
    try {
      const res = await isDeviceSupported();
      if (res.ok) {
        setDeviceSupported(res.value);
      } else {
        setDeviceSupported(false);
        showToast(formatError(res.error));
      }
      setSupportChecked(true);
    } catch (_error) {
      setDeviceSupported(false);
      setSupportChecked(true);
      showToast('Unexpected error checking device support');
    } finally {
      setIsCheckingSupport(false);
    }
  }, [isCheckingSupport, showToast]);

  const handleInitPress = React.useCallback(async () => {
    if (isInitializing) return;
    setIsInitializing(true);
    setInitFailed(false);
    try {
      const res = await initialize(Config.TTR_LICENSE_KEY || '');
      if (res.ok) {
        setIsInitialized(true);
        return;
      }
      setInitFailed(true);
      showToast(formatError(res.error));
    } catch (_error) {
      setInitFailed(true);
      showToast('Unexpected init error');
    } finally {
      setIsInitializing(false);
    }
  }, [isInitializing, showToast]);

  const handleScanPress = React.useCallback(async () => {
    if (!isInitialized || isScanning) return;
    setTreadStatus('');
    setMeasurementUUID(null);
    setTreadDepthResult(null);
    setResultStatus('');
    setIsScanning(true);
    try {
      const base = CONFIGS[configIndex].config ?? {};
      const config = buildTreadConfig(base, includeCorrelationId ? correlationId : null, tireWidth);
      const outcome = await scan(config, VERBOSE_SCAN_OPTIONS);
      if (outcome.kind === 'ScanCompleted') {
        setMeasurementUUID(outcome.measurementUUID);
        setTreadStatus('Scan completed');
        setTreadIsError(false);
        return;
      }
      if (outcome.kind === 'ScanFailed') {
        setTreadStatus(`Scan failed (${outcome.error.code})`);
        setTreadIsError(true);
        showToast(formatError(outcome.error));
        return;
      }
      setTreadStatus('Scan aborted');
      setTreadIsError(true);
    } catch (_error) {
      setTreadStatus('Scan failed (unexpected error)');
      setTreadIsError(true);
      showToast('Unexpected scan error');
    } finally {
      setIsScanning(false);
    }
  }, [
    isInitialized,
    isScanning,
    showToast,
    includeCorrelationId,
    correlationId,
    configIndex,
    tireWidth,
  ]);

  const handleGetResultPress = React.useCallback(async () => {
    if (!measurementUUID || isFetchingResult) return;
    setTreadDepthResult(null);
    setResultStatus('');
    setIsFetchingResult(true);
    try {
      const res = await getResult(measurementUUID);
      if (!res.ok) {
        setResultStatus(`Failed (${res.error.code})`);
        setResultIsError(true);
        showToast(formatError(res.error));
        return;
      }
      setTreadDepthResult(res.value);
      setResultStatus(`Loaded · ${res.value.measurementInfo.status}`);
      setResultIsError(false);
    } catch (_error) {
      setResultStatus('Failed (unexpected error)');
      setResultIsError(true);
      showToast('Unexpected result error');
    } finally {
      setIsFetchingResult(false);
    }
  }, [measurementUUID, isFetchingResult, showToast]);

  const handleSidewallScanPress = React.useCallback(async () => {
    if (isSidewallScanning) return;
    setSidewallOutcome(null);
    setSidewallStatus('');
    setIsSidewallScanning(true);
    try {
      // The sidewall scanner is standalone: it needs no initialize() and is
      // authed by its own cloud API client ID rather than the TTR license key.
      const outcome = await TireSidewall.scan({
        clientId: Config.TTR_SIDEWALL_CLIENT_ID || '',
        config: includeCorrelationId ? { correlationId } : undefined,
      });
      setSidewallOutcome(outcome);
      if (outcome.kind === 'completed') {
        const detectedWidth = tireWidthFromResultJson(outcome.resultJson);
        if (detectedWidth != null) {
          setTireWidth(detectedWidth);
          setTireWidthFromSidewall(true);
        }
        setSidewallStatus(`Completed · lighting ${outcome.lighting ?? 'n/a'}`);
        setSidewallIsError(false);
        return;
      }
      if (outcome.kind === 'failed') {
        setSidewallStatus(`Failed (${outcome.error?.code ?? 'UNKNOWN'})`);
        setSidewallIsError(true);
        if (outcome.error) showToast(formatError(outcome.error));
        return;
      }
      setSidewallStatus('Sidewall scan aborted');
      setSidewallIsError(true);
    } catch (_error) {
      setSidewallStatus('Failed (unexpected error)');
      setSidewallIsError(true);
      showToast('Unexpected sidewall scan error');
    } finally {
      setIsSidewallScanning(false);
    }
  }, [isSidewallScanning, showToast, includeCorrelationId, correlationId]);

  const support = deviceSupportDetail(t, supportChecked, deviceSupported);
  const init = initDetail(t, isInitializing, isInitialized, initFailed);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.pageBg }]}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={t.pageBg}
      />
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <GroupHeader
          number={1}
          title="Set up"
          trailing={
            isInitialized ? (
              <StatusChip text="Complete" color={t.success} icon={<CheckIcon color={t.success} size={13} />} />
            ) : undefined
          }
        />
        <SectionCard>
          <MetaRow label="TTR SDK version" value={sdkVersion} />
          <Hairline />
          <MetaRow label="TTR React Native Plugin Version" value={pluginVersion} />
          <Hairline />
          <SetupRow
            done={supportChecked && deviceSupported}
            title="Check device support"
            detail={support.text}
            detailColor={support.color}
            button={
              <SoftButton
                label={supportChecked ? 'Re-check' : 'Check'}
                busy={isCheckingSupport}
                onPress={handleDeviceSupportPress}
              />
            }
          />
          <Hairline />
          <SetupRow
            done={isInitialized}
            title="Initialize SDK"
            detail={init.text}
            detailColor={init.color}
            button={
              <SoftButton
                label={isInitialized ? 'Re-init' : 'Initialize'}
                busy={isInitializing}
                onPress={handleInitPress}
              />
            }
          />
        </SectionCard>

        <SectionCard
          title="Correlation ID"
          subtitle="Links one sidewall + one tread scan as a pair. Applies to both scanners below."
          leading={
            <ScannerBadge color={t.correlation}>
              <LinkIcon color={t.correlation} size={24} />
            </ScannerBadge>
          }
          status={<MutedChip text="Optional" />}
        >
          <SwitchRow
            label="Include correlationId"
            value={includeCorrelationId}
            onValueChange={setIncludeCorrelationId}
          />
          {includeCorrelationId ? (
            <View style={styles.correlationRow}>
              <Text
                style={[styles.codeBlock, styles.grow, { color: t.textSecondary, backgroundColor: t.inset }]}
              >
                {correlationId}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setCorrelationId(uuidV4())}
                style={styles.refreshBtn}
              >
                <RefreshIcon color={t.correlation} size={20} />
              </Pressable>
            </View>
          ) : null}
        </SectionCard>

        <GroupHeader number={2} title="Scan" hint="Two independent scanners" />
        <SectionCard
          title="Tire Sidewall"
          subtitle="Reads tire size markings off the sidewall"
          leading={
            <ScannerBadge>
              <TireSidewallIcon color={t.brand} size={24} />
            </ScannerBadge>
          }
          status={
            sidewallSupported ? (
              <StatusChip text="Supported" color={t.success} />
            ) : (
              <StatusChip text="Not supported" color={t.danger} />
            )
          }
        >
          {includeCorrelationId ? <AttachedChip /> : null}
          <PrimaryButton
            title="Scan Tire Sidewall"
            icon={<FocusIcon color={t.onAccent} />}
            onPress={handleSidewallScanPress}
            loading={isSidewallScanning}
          />
          {sidewallStatus ? <StatusLine text={sidewallStatus} isError={sidewallIsError} /> : null}
          {sidewallOutcome?.kind === 'completed' ? (
            <>
              <SidewallResultRow
                imageBase64={sidewallOutcome.imageBase64}
                size={sizeFromResultJson(sidewallOutcome.resultJson)}
                width={tireWidthFromResultJson(sidewallOutcome.resultJson)}
              />
              <JsonDisclosure json={prettyJson(sidewallOutcome.resultJson)} />
            </>
          ) : null}
        </SectionCard>
        <SectionCard
          title="Tire Tread"
          subtitle="Measures tread depth across the tire"
          leading={
            <ScannerBadge>
              <TireTreadIcon color={t.brand} size={24} />
            </ScannerBadge>
          }
          status={
            isInitialized ? <StatusChip text="Ready" color={t.success} /> : <MutedChip text="Init required" />
          }
        >
          {includeCorrelationId ? <AttachedChip /> : null}
          <SelectField
            label="Scan config (JSON)"
            value={CONFIGS[configIndex].label}
            options={CONFIGS.map((c) => c.label)}
            onSelect={setConfigIndex}
          />
          <TireWidthField
            value={tireWidth}
            fromSidewall={tireWidthFromSidewall}
            onChange={(v) => {
              setTireWidth(v);
              setTireWidthFromSidewall(false);
            }}
          />
          <PrimaryButton
            title="Scan"
            icon={<ScanFrameIcon color={t.onAccent} />}
            onPress={handleScanPress}
            disabled={!isInitialized}
            loading={isScanning}
          />
          {treadStatus ? <StatusLine text={treadStatus} isError={treadIsError} /> : null}
          {measurementUUID ? <MonoField label="MEASUREMENT UUID" value={measurementUUID} /> : null}
        </SectionCard>

        <GroupHeader number={3} title="Results" hint="From the Tread scan above" />
        <SectionCard>
          <PrimaryButton
            title="Get Result"
            variant="outlined"
            icon={<DownloadIcon color={t.brand} />}
            onPress={handleGetResultPress}
            disabled={!isInitialized || !measurementUUID}
            loading={isFetchingResult}
          />
          {resultStatus ? <StatusLine text={resultStatus} isError={resultIsError} /> : null}
          {treadDepthResult ? (
            <>
              {treadDepthResult.measurementMetadata?.movementDirection ? (
                <Text style={[styles.caption, { color: t.textTertiary }]}>
                  Direction: {treadDepthResult.measurementMetadata.movementDirection}
                </Text>
              ) : null}
              <View style={styles.metricRow}>
                <MetricTile label="Global mm" value={formatNumber(treadDepthResult.global.value_mm)} highlight />
                <MetricTile label="Global in" value={formatNumber(treadDepthResult.global.value_inch)} />
                <MetricTile label={'1/32"'} value={formatNumber(treadDepthResult.global.value_inch_32nds)} />
              </View>
              {treadDepthResult.regions.map((region, index) => (
                <View
                  key={`region-${index}`}
                  style={[styles.regionRow, { backgroundColor: t.inset }]}
                >
                  <Text style={[styles.regionName, { color: t.textPrimary }]}>Region {index + 1}</Text>
                  <Text style={[styles.regionValue, { color: t.textSecondary }]}>
                    {region.available ? `${formatNumber(region.value_mm)} mm` : 'Unavailable'}
                  </Text>
                </View>
              ))}
            </>
          ) : null}
        </SectionCard>
      </ScrollView>
      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ANDROID_STATUS_BAR,
  },
  content: {
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 40,
  },
  grow: {
    flex: 1,
  },
  codeBlock: {
    fontSize: 11,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    borderRadius: 10,
    padding: 11,
  },
  correlationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  refreshBtn: {
    padding: 8,
  },
  caption: {
    fontSize: 12,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 8,
  },
  regionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  regionName: {
    fontSize: 13,
    fontWeight: '600',
  },
  regionValue: {
    fontSize: 13,
  },
});
