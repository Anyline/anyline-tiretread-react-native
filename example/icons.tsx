import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

/**
 * Anyline tire glyphs, brand mark and UI icons, rendered from single-color
 * PNGs so a single color prop tints them (tintColor). The PNGs are rendered
 * from the SVG sources in assets/icons/src/ at 48, 96 and 144 px (@1x, @2x, @3x).
 */

type IconProps = {
  color: string;
  size?: number;
};

function TintedIcon({
  source,
  color,
  size,
}: {
  source: ImageSourcePropType;
  color: string;
  size: number;
}): React.JSX.Element {
  return <Image source={source} style={{ width: size, height: size, tintColor: color }} />;
}

export function TireSidewallIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/tire_sidewall.png')} color={color} size={size} />;
}

export function TireTreadIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/tire_tread.png')} color={color} size={size} />;
}

export function AnylineMark({ color, size = 44 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/anyline_mark.png')} color={color} size={size} />;
}

export function CheckIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/check.png')} color={color} size={size} />;
}

export function ScanFrameIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/scan_frame.png')} color={color} size={size} />;
}

export function FocusIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/focus.png')} color={color} size={size} />;
}

export function DownloadIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/download.png')} color={color} size={size} />;
}

export function ErrorIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/error.png')} color={color} size={size} />;
}

export function ChevronIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/chevron.png')} color={color} size={size} />;
}

export function TuneIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/tune.png')} color={color} size={size} />;
}

export function LinkIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/link.png')} color={color} size={size} />;
}

export function RefreshIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <TintedIcon source={require('./assets/icons/refresh.png')} color={color} size={size} />;
}
