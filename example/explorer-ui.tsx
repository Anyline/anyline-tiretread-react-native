import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { soft, useTheme } from './DevEx';
import { AnylineMark, CheckIcon, ChevronIcon, ErrorIcon, LinkIcon, TuneIcon } from './icons';

/**
 * Presentational building blocks for the API Explorer screen (App.tsx). These
 * are screen-specific compositions of the DevEx toolkit — the header, the
 * set-up rows, the scanner badges/chips, the config picker, etc. Kept out of
 * App.tsx so that file reads as SDK config + handlers + screen assembly.
 */

export function Header(): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={[styles.header, { borderBottomColor: t.hairline }]}>
      <AnylineMark color={t.textPrimary} size={26} />
      <View style={styles.headerTitles}>
        <Text style={[styles.headerTitle, { color: t.textPrimary }]}>TireTread API Explorer</Text>
        <Text style={[styles.headerSubtitle, { color: t.textTertiary }]}>
          Try every SDK option, end to end
        </Text>
      </View>
    </View>
  );
}

function MonoBadge({ value }: { value: string }): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={[styles.monoBadge, { backgroundColor: t.inset }]}>
      <Text style={[styles.monoBadgeText, { color: t.textSecondary }]}>{value}</Text>
    </View>
  );
}

export function MetaRow({ label, value }: { label: string; value: string }): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={styles.metaRow}>
      <Text style={[styles.metaLabel, { color: t.textSecondary }]}>{label}</Text>
      <MonoBadge value={value} />
    </View>
  );
}

export function Hairline(): React.JSX.Element {
  const t = useTheme();
  return <View style={[styles.hairline, { backgroundColor: t.hairline }]} />;
}

export function SoftButton({
  label,
  busy = false,
  disabled = false,
  onPress,
}: {
  label: string;
  busy?: boolean;
  disabled?: boolean;
  onPress: () => void;
}): React.JSX.Element {
  const t = useTheme();
  const inactive = busy || disabled;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.softBtn,
        { backgroundColor: soft(t.brand) },
        inactive && { opacity: 0.5 },
        pressed && !inactive && { opacity: 0.7 },
      ]}
    >
      {busy ? (
        <ActivityIndicator size="small" color={t.brand} />
      ) : (
        <Text style={[styles.softBtnText, { color: t.brand }]}>{label}</Text>
      )}
    </Pressable>
  );
}

function StepCircle({ done }: { done: boolean }): React.JSX.Element {
  const t = useTheme();
  return (
    <View
      style={[
        styles.stepCircle,
        done
          ? { backgroundColor: t.success }
          : { backgroundColor: t.inset, borderWidth: 1, borderColor: t.hairline },
      ]}
    >
      {done ? <CheckIcon color={t.onAccent} size={15} /> : null}
    </View>
  );
}

export function SetupRow({
  done,
  title,
  detail,
  detailColor,
  button,
}: {
  done: boolean;
  title: string;
  detail: string;
  detailColor: string;
  button: React.ReactNode;
}): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={styles.setupRow}>
      <StepCircle done={done} />
      <View style={styles.grow}>
        <Text style={[styles.setupTitle, { color: t.textPrimary }]}>{title}</Text>
        <Text style={[styles.setupDetail, { color: detailColor }]}>{detail}</Text>
      </View>
      {button}
    </View>
  );
}

export function StatusLine({ text, isError }: { text: string; isError: boolean }): React.JSX.Element {
  const t = useTheme();
  const color = isError ? t.danger : t.success;
  return (
    <View style={styles.statusLine}>
      {isError ? <ErrorIcon color={color} size={15} /> : <CheckIcon color={color} size={15} />}
      <Text style={[styles.statusLineText, { color }]}>{text}</Text>
    </View>
  );
}

export function ScannerBadge({
  color,
  children,
}: {
  color?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const t = useTheme();
  const accent = color ?? t.brand;
  return <View style={[styles.badge, { backgroundColor: soft(accent) }]}>{children}</View>;
}

export function AttachedChip(): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={[styles.attachedChip, { backgroundColor: soft(t.correlation) }]}>
      <LinkIcon color={t.correlation} size={13} />
      <Text style={[styles.attachedChipText, { color: t.correlation }]}>correlationId attached</Text>
    </View>
  );
}

export function TireWidthField({
  value,
  fromSidewall,
  onChange,
}: {
  value: number | null;
  fromSidewall: boolean;
  onChange: (value: number | null) => void;
}): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={styles.widthRow}>
      <View style={styles.grow}>
        <Text style={[styles.widthLabel, { color: t.textSecondary }]}>Tire width (mm)</Text>
        {fromSidewall ? (
          <Text style={[styles.fromSidewall, { color: t.brand }]}>from sidewall</Text>
        ) : null}
      </View>
      <TextInput
        style={[styles.widthInput, { backgroundColor: t.inset, color: t.textPrimary }]}
        keyboardType="number-pad"
        placeholder="—"
        placeholderTextColor={t.textTertiary}
        textAlign="right"
        value={value != null ? String(value) : ''}
        onChangeText={(text) => {
          const parsed = parseInt(text.replace(/[^0-9]/g, ''), 10);
          onChange(Number.isNaN(parsed) ? null : parsed);
        }}
      />
    </View>
  );
}

export function MonoField({ label, value }: { label: string; value: string }): React.JSX.Element {
  const t = useTheme();
  return (
    <View>
      <Text style={[styles.fieldLabel, { color: t.textTertiary }]}>{label}</Text>
      <Text style={[styles.codeBlock, { color: t.textSecondary, backgroundColor: t.inset }]}>{value}</Text>
    </View>
  );
}

export function SidewallResultRow({
  imageBase64,
  size,
  width,
}: {
  imageBase64: string;
  size: string | null;
  width: number | null;
}): React.JSX.Element {
  const t = useTheme();
  return (
    <View style={styles.sidewallRow}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
        style={[styles.sidewallImage, { backgroundColor: t.inset }]}
        resizeMode="cover"
      />
      <View style={styles.grow}>
        <Text style={[styles.fieldLabel, { color: t.textTertiary }]}>DETECTED SIZE</Text>
        <Text style={[styles.detectedSize, { color: t.textPrimary }]}>{size ?? '—'}</Text>
        {width != null ? (
          <View style={[styles.handoffChip, { backgroundColor: soft(t.brand) }]}>
            <Text style={[styles.handoffChipText, { color: t.brand }]}>
              Width {width} mm sent to Tread
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function JsonDisclosure({ json }: { json: string }): React.JSX.Element {
  const t = useTheme();
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen((prev) => !prev)}
        style={styles.disclosureHeader}
      >
        <Text style={[styles.disclosureTitle, { color: t.textTertiary }]}>Result JSON</Text>
        <View style={{ transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
          <ChevronIcon color={t.textTertiary} size={16} />
        </View>
      </Pressable>
      {open ? (
        <Text style={[styles.codeBlock, { color: t.textSecondary, backgroundColor: t.inset }]}>
          {json}
        </Text>
      ) : null}
    </View>
  );
}

export function SelectField({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (index: number) => void;
}): React.JSX.Element {
  const t = useTheme();
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <Text style={[styles.selectLabel, { color: t.textSecondary }]}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen(true)}
        style={[styles.selectBox, { backgroundColor: t.inset }]}
      >
        <TuneIcon color={t.textTertiary} size={16} />
        <Text style={[styles.selectValue, styles.grow, { color: t.textSecondary }]} numberOfLines={1}>
          {value}
        </Text>
        <View style={styles.selectChevron}>
          <ChevronIcon color={t.textTertiary} size={16} />
        </View>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
          <View style={[styles.modalSheet, { backgroundColor: t.cardSurface, borderColor: t.hairline }]}>
            {options.map((option, index) => {
              const active = option === value;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  onPress={() => {
                    onSelect(index);
                    setOpen(false);
                  }}
                  style={styles.modalItem}
                >
                  {active ? (
                    <CheckIcon color={t.brand} size={16} />
                  ) : (
                    <View style={styles.modalItemSpacer} />
                  )}
                  <Text style={[styles.modalItemText, { color: active ? t.brand : t.textPrimary }]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitles: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  monoBadge: {
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  monoBadgeText: {
    fontSize: 12,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
  hairline: {
    height: 1,
  },
  softBtn: {
    minHeight: 34,
    minWidth: 74,
    borderRadius: 9,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  softBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  setupTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  setupDetail: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusLineText: {
    fontSize: 12.5,
    fontWeight: '600',
    flexShrink: 1,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  codeBlock: {
    fontSize: 11,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    borderRadius: 10,
    padding: 11,
  },
  sidewallRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  sidewallImage: {
    width: 90,
    height: 120,
    borderRadius: 12,
  },
  detectedSize: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 3,
  },
  disclosureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disclosureTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  attachedChip: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  attachedChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  selectLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  selectValue: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  selectChevron: {
    transform: [{ rotate: '90deg' }],
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalSheet: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 6,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  modalItemText: {
    fontSize: 15,
    flexShrink: 1,
  },
  modalItemSpacer: {
    width: 16,
  },
  widthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  widthLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  fromSidewall: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  widthInput: {
    width: 88,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  handoffChip: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 7,
  },
  handoffChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
