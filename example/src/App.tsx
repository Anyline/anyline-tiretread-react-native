import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import {
  initTireTread,
  startTireTreadScanActivity,
  getTreadDepthReportResult,
  isMinimumIOSVersionForTTR,
} from 'anyline-ttr-mobile-wrapper-react-native';

const portugeseConfig = JSON.stringify(
  require('./assets/config/sample_config_portugese.json')
);
const defaultConfig = JSON.stringify(
  require('./assets/config/sample_config_default.json')
);
const defaultImperialConfig = JSON.stringify(
  require('./assets/config/sample_config_default_imperial.json')
);
const noUXConfig = JSON.stringify(
  require('./assets/config/sample_config_no_ux.json')
);

export default function App() {
  const [initResult, setInitResult] = React.useState<string | undefined>();
  const [scanResult, setScanResult] = React.useState<string | undefined>();
  const [reportResult, setReportResult] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const wiggleAnim = React.useRef(new Animated.Value(0)).current;

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

  React.useEffect(() => {
    if (isProcessing) {
      startWiggleAnimation();
    } else {
      wiggleAnim.stopAnimation();
      wiggleAnim.setValue(0);
    }
  }, [isProcessing, startWiggleAnimation, wiggleAnim]);

  const handleInitPress = () => {
    if (isMinimumIOSVersionForTTR()) {
      initTireTread('license_key')
        .then((response) => {
          setInitResult(response);
          setError(undefined);
        })
        .catch((e) => {
          setError('Initialization failed: ' + e.message);
          setInitResult(undefined);
        });
    } else {
      setError('Minimum iOS version required is 16.4');
    }
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
    if (!initResult) {
      setError('Please initialize first');
      return;
    }
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      setError('Camera permission denied');
      return;
    }
    startTireTreadScanActivity(config)
      .then((response) => {
        setScanResult(response);
        setError(undefined);
      })
      .catch((e) => {
        setError('Scanning failed: ' + e.message);
        setScanResult(undefined);
      });
  };

  const handleReportPress = () => {
    if (!scanResult) {
      setError('Please scan first');
      return;
    }
    setIsProcessing(true);
    getTreadDepthReportResult(scanResult)
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

  const wiggleInterpolate = wiggleAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  return (
    <View style={styles.container}>
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
          title="Scan Tire Tread No UX"
          onPress={() => handleScanPress(noUXConfig)}
          disabled={!initResult}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Scan Tire Tread Portugese UX"
          onPress={() => handleScanPress(portugeseConfig)}
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
      <Text style={styles.text}>{`Scan Result: ${reportResult}`}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
});
