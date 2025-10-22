/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {
  initialize,
  scanWithEvents,
  getResult,
  getHeatMap,
  isDeviceSupported,
  type CameraDirection,
  type ScanEvent,
} from 'anyline-ttr-mobile-wrapper-react-native';

const defaultConfig = JSON.stringify(
  require('./assets/config/sample_config_default.json')
);
const defaultImperialConfig = JSON.stringify(
  require('./assets/config/sample_config_default_imperial.json')
);

const LICENSE_KEY = 'LDQwhwLCeSvqWgeW97PttJinPmHM40bLUAvmT38Q4CU';

export default function App() {
  const [initResult, setInitResult] = React.useState<string | undefined>();
  const [scanResult, setScanResult] = React.useState<string | undefined>();
  const [reportResult, setReportResult] = React.useState<string | undefined>();
  const [heatmapUrl, setHeatmapUrl] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [scanDirection, setScanDirection] = React.useState<CameraDirection | undefined>();
  const [lastCameraMove, setLastCameraMove] = React.useState<'LEFT' | 'RIGHT' | undefined>();
  const [cameraMoveCount, setCameraMoveCount] = React.useState({ left: 0, right: 0 });
  const wiggleAnim = React.useRef(new Animated.Value(0)).current;
  const flashAnim = React.useRef(new Animated.Value(0)).current;

  const startWiggleAnimation = React.useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggleAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleAnim, {
          toValue: -1,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [wiggleAnim]);

  const startFlashAnimation = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(flashAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(flashAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [flashAnim]);

  React.useEffect(() => {
    if (isProcessing) {
      startWiggleAnimation();
    } else {
      wiggleAnim.stopAnimation();
      wiggleAnim.setValue(0);
    }
  }, [isProcessing, startWiggleAnimation, wiggleAnim]);

  const handleCameraLeft = React.useCallback(() => {
    console.log('Camera moved LEFT');
    setLastCameraMove('LEFT');
    setCameraMoveCount(prev => ({ ...prev, left: prev.left + 1 }));
    startFlashAnimation();
  }, [startFlashAnimation]);

  const handleCameraRight = React.useCallback(() => {
    console.log('Camera moved RIGHT');
    setLastCameraMove('RIGHT');
    setCameraMoveCount(prev => ({ ...prev, right: prev.right + 1 }));
    startFlashAnimation();
  }, [startFlashAnimation]);

  const handleInitPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      setError('Camera permission denied');
      return;
    }

    isDeviceSupported()
      .then((compatible) => {
        if (compatible) {
          initialize(LICENSE_KEY)
            .then((response) => {
              setInitResult(response);
              setError(undefined);
            })
            .catch((e) => {
              setError('Initialization failed: ' + e.message);
              setInitResult(undefined);
            });
        } else {
          setError(
            'Minimum iOS version required is 16.4 or Android device is not supported'
          );
        }
      })
      .catch((e) => {
        setError('Device support check failed: ' + e.message);
        return;
      });
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'App needs access to your camera so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const handleScanPress = async (config: string) => {
    console.log('=== handleScanPress called ===');
    if (!initResult) {
      console.log('ERROR: Not initialized');
      setError('Please initialize first');
      return;
    }
    console.log('Clearing previous results...');
    setScanResult(undefined);
    setReportResult(undefined);
    setHeatmapUrl(undefined);
    setScanDirection(undefined);
    setLastCameraMove(undefined);
    setCameraMoveCount({ left: 0, right: 0 });
    console.log('Calling scanWithEvents...');
    scanWithEvents(
      config,
      undefined,
      (event: ScanEvent) => {
        console.log('Event received:', event);
        if (event.type === 'scanStarted' && event.cameraDirection) {
          setScanDirection(event.cameraDirection);
        }
      },
      handleCameraLeft,
      handleCameraRight
    )
      .then(({measurementUUID, cameraDirection}) => {
        console.log('Scan SUCCESS:', measurementUUID, cameraDirection);
        setScanResult(measurementUUID);
        setScanDirection(cameraDirection);
        setError(undefined);
      })
      .catch((e) => {
        console.log('Scan FAILED:', e);
        setError('Scanning failed: ' + e.message);
        setScanResult(undefined);
        setScanDirection(undefined);
      });
  };

  const handleReportPress = () => {
    if (!scanResult) {
      setError('Please scan first');
      return;
    }
    setIsProcessing(true);
    getResult(scanResult)
      .then((response) => {
        setReportResult(response);
        setError(undefined);
      })
      .catch((e) => {
        setError('Getting report failed: ' + e.message);
        setReportResult(undefined);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleHeatmapPress = () => {
    if (!scanResult) {
      setError('Please scan first');
      return;
    }
    setIsProcessing(true);
    getHeatMap(scanResult)
      .then((response) => {
        setHeatmapUrl(response);
        setError(undefined);
      })
      .catch((e) => {
        setError('Getting heatmap failed: ' + e.message);
        setHeatmapUrl(undefined);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const wiggleInterpolate = wiggleAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  const flashOpacity = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {/* Camera Direction Indicator */}
      {(cameraMoveCount.left > 0 || cameraMoveCount.right > 0) && (
        <View style={styles.directionIndicator}>
          <Text style={styles.directionTitle}>Camera Movement:</Text>
          <View style={styles.directionRow}>
            <Animated.View
              style={[
                styles.directionBox,
                lastCameraMove === 'LEFT' && { opacity: flashOpacity }
              ]}
            >
              <Text style={styles.arrow}>{'←'}</Text>
              <Text style={styles.directionLabel}>LEFT</Text>
              <Text style={styles.directionCount}>{cameraMoveCount.left}</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.directionBox,
                lastCameraMove === 'RIGHT' && { opacity: flashOpacity }
              ]}
            >
              <Text style={styles.arrow}>{'→'}</Text>
              <Text style={styles.directionLabel}>RIGHT</Text>
              <Text style={styles.directionCount}>{cameraMoveCount.right}</Text>
            </Animated.View>
          </View>
          {lastCameraMove && (
            <Text style={styles.lastMoveText}>
              Last move: {lastCameraMove}
            </Text>
          )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Initialize" onPress={handleInitPress} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Scan Tire Tread Default UX"
          onPress={() => handleScanPress(defaultConfig)}
          disabled={!initResult}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Scan Tire Tread Default UX Imperial"
          onPress={() => handleScanPress(defaultImperialConfig)}
          disabled={!initResult}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Report"
          onPress={handleReportPress}
          disabled={!scanResult}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Heatmap"
          onPress={handleHeatmapPress}
          disabled={!scanResult}
        />
      </View>
      {isProcessing && (
        <Animated.Image
          source={require('./assets/images/happy_tire.png')}
          style={[
            styles.image,
            {
              transform: [{ rotate: wiggleInterpolate }],
            },
          ]}
        />
      )}
      <Text style={styles.text}>{`Init Result: ${initResult}`}</Text>
      <Text style={styles.text}>{`MeasurementUuid: ${scanResult}`}</Text>
      {scanDirection && (
        <Text style={styles.text}>{`Camera Direction: ${scanDirection}`}</Text>
      )}
      <Text style={styles.text}>{`Scan Result: ${reportResult}`}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {heatmapUrl && (
        <View style={styles.heatmapContainer}>
          <Text style={styles.heatmapTitle}>Heatmap:</Text>
          <Image
            source={{ uri: heatmapUrl }}
            style={styles.heatmapImage}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  text: {
    marginVertical: 10,
    color: 'blue',
  },
  errorText: {
    marginVertical: 10,
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  heatmapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  heatmapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  heatmapImage: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  directionIndicator: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
  },
  directionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  directionRow: {
    flexDirection: 'row',
    gap: 20,
  },
  directionBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    minWidth: 100,
  },
  arrow: {
    fontSize: 32,
    marginBottom: 5,
  },
  directionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  directionCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  lastMoveText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
