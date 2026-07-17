import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
  useColorScheme,
} from 'react-native';

/**
 * Small presentational toolkit for the API Explorer screen: cards, chips,
 * numbered group headers, and simple config rows. Colors follow the Anyline
 * design-system tokens and adapt to light/dark via useTheme().
 */

export type Theme = {
  brand: string;
  correlation: string;
  success: string;
  danger: string;
  cardSurface: string;
  pageBg: string;
  inset: string;
  hairline: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  onAccent: string;
};

const light: Theme = {
  brand: '#0099FF',
  correlation: '#5246E0',
  success: '#00A37A',
  danger: '#D70015',
  cardSurface: '#FFFFFF',
  pageBg: '#EEF0F3',
  inset: '#F0F1F4',
  hairline: 'rgba(60,60,67,0.15)',
  textPrimary: '#0B0B0C',
  textSecondary: 'rgba(60,60,67,0.86)',
  textTertiary: 'rgba(60,60,67,0.55)',
  onAccent: '#FFFFFF',
};

const dark: Theme = {
  brand: '#0A9DFF',
  correlation: '#A09DF6',
  success: '#2EE0AB',
  danger: '#FF453A',
  cardSurface: '#1C1C1E',
  pageBg: '#000000',
  inset: '#2C2C2E',
  hairline: '#38383A',
  textPrimary: '#FAFAFA',
  textSecondary: 'rgba(255,255,255,0.82)',
  textTertiary: 'rgba(255,255,255,0.52)',
  onAccent: '#FFFFFF',
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}

/** Accent at ~12% alpha for soft status/chip backgrounds (6-digit hex only). */
export function soft(color: string): string {
  return color.length === 7 ? `${color}1F` : color;
}

type GroupHeaderProps = {
  number: number;
  title: string;
  hint?: string;
  trailing?: React.ReactNode;
};

export function GroupHeader({ number, title, hint, trailing }: GroupHeaderProps): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={styles.group}>
      <View style={[styles.num, { backgroundColor: t.textPrimary }]}>
        <Text style={[styles.numText, { color: t.cardSurface }]}>{number}</Text>
      </View>
      <Text style={[styles.groupLabel, { color: t.textSecondary }]}>{title.toUpperCase()}</Text>
      <View style={styles.spacer} />
      {hint ? <Text style={[styles.groupHint, { color: t.textTertiary }]}>{hint}</Text> : null}
      {trailing}
    </View>
  );
}

type SectionCardProps = {
  title?: string;
  subtitle?: string;
  leading?: React.ReactNode;
  status?: React.ReactNode;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  subtitle,
  leading,
  status,
  children,
}: SectionCardProps): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.cardSurface, borderColor: t.hairline }]}>
      <View style={styles.cardPad}>
        {title || status || leading ? (
          <View style={styles.cardHead}>
            {leading}
            <View style={styles.spacer}>
              {title ? <Text style={[styles.cardTitle, { color: t.textPrimary }]}>{title}</Text> : null}
              {subtitle ? (
                <Text style={[styles.cardSubtitle, { color: t.textTertiary }]}>{subtitle}</Text>
              ) : null}
            </View>
            {status}
          </View>
        ) : null}
        {children}
      </View>
    </View>
  );
}

type StatusChipProps = {
  text: string;
  color: string;
  icon?: React.ReactNode;
};

export function StatusChip({ text, color, icon }: StatusChipProps): React.JSX.Element {
  return (
    <View style={[styles.chip, { backgroundColor: soft(color) }]}>
      {icon}
      <Text style={[styles.chipText, { color }]}>{text}</Text>
    </View>
  );
}

export function MutedChip({ text }: { text: string }): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={[styles.mutedChip, { borderColor: t.hairline }]}>
      <Text style={[styles.mutedChipText, { color: t.textTertiary }]}>{text}</Text>
    </View>
  );
}

type SwitchRowProps = {
  label: string;
  sub?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchRow({ label, sub, value, onValueChange }: SwitchRowProps): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={styles.switchRow}>
      <View style={styles.spacer}>
        <Text style={[styles.fieldLabel, { color: t.textPrimary }]}>{label}</Text>
        {sub ? <Text style={[styles.subText, { color: t.textTertiary }]}>{sub}</Text> : null}
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined';
  icon?: React.ReactNode;
};

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'filled',
  icon,
}: PrimaryButtonProps): React.JSX.Element {
  const t = useTheme();
  const accent = t.brand;
  const outlined = variant === 'outlined';
  const inactive = disabled || loading;
  const contentColor = outlined ? accent : t.onAccent;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [
        styles.btn,
        outlined
          ? { borderRadius: 12, borderWidth: 1.5, borderColor: accent, backgroundColor: 'transparent' }
          : { backgroundColor: accent },
        inactive && styles.btnInactive,
        pressed && !inactive && styles.btnPressed,
      ]}
    >
      {loading ? <ActivityIndicator color={contentColor} size="small" /> : icon}
      <Text style={[outlined ? styles.btnTextOutlined : styles.btnText, { color: contentColor }]}>
        {loading ? `${title}...` : title}
      </Text>
    </Pressable>
  );
}

type MetricTileProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function MetricTile({ label, value, highlight = false }: MetricTileProps): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={[styles.metric, { backgroundColor: highlight ? soft(t.brand) : t.inset }]}>
      <Text style={[styles.metricLabel, { color: highlight ? t.brand : t.textTertiary }]}>
        {label.toUpperCase()}
      </Text>
      <Text style={[styles.metricValue, { color: highlight ? t.brand : t.textPrimary }]}>{value}</Text>
    </View>
  );
}

/** Transient bottom banner for error messages (snackbar-style). */
export function Toast({ message }: { message: string }): React.JSX.Element {
  return (
    <View style={styles.toast} pointerEvents="none">
      <Text style={styles.toastText} numberOfLines={3}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 4,
    gap: 8,
  },
  num: {
    width: 22,
    height: 22,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    fontSize: 12,
    fontWeight: '800',
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.0,
  },
  groupHint: {
    fontSize: 11,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  cardPad: {
    padding: 16,
    gap: 12,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  cardSubtitle: {
    fontSize: 12.5,
    marginTop: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  mutedChip: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mutedChipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
  btn: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  btnInactive: {
    opacity: 0.4,
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  btnTextOutlined: {
    fontSize: 14,
    fontWeight: '700',
  },
  metric: {
    flex: 1,
    borderRadius: 13,
    padding: 13,
    alignItems: 'flex-start',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toastText: {
    color: '#FAFAFA',
    fontSize: 14,
    fontWeight: '600',
  },
});
