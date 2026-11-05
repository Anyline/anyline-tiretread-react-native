import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  sendCommentFeedback,
  sendShoulderWearFeedback,
  sendTreadDepthResultFeedback,
  type MeasurementInfo,
  type SdkResult,
  type ShoulderWear,
  type TreadDepthFeedbackRegion,
  type TreadDepthResult,
} from '@anyline/tire-tread-react-native-module';

import { soft, useTheme } from './DevEx';
import { SoftButton } from './explorer-ui';

/**
 * User corrected results (UCR) for a measurement, as in the Flutter example:
 * a "Feedback" row with one button per kind of feedback, each opening a
 * dialog. The outcome of every call is reported through `onMessage`.
 */

type Dialog = 'comment' | 'mm' | 'inch32' | 'shoulderWear';

const MM_PER_INCH = 25.4;

export function FeedbackSection({
  measurementUUID,
  result,
  onMessage,
}: {
  measurementUUID: string;
  result: TreadDepthResult;
  onMessage: (message: string) => void;
}): React.JSX.Element {
  const t = useTheme();
  const [dialog, setDialog] = React.useState<Dialog | null>(null);
  const [isSending, setIsSending] = React.useState(false);

  const run = React.useCallback(
    async (send: () => Promise<SdkResult<MeasurementInfo>>) => {
      setDialog(null);
      setIsSending(true);
      try {
        const res = await send();
        onMessage(res.ok ? 'Feedback sent' : `${res.error.code}: ${res.error.message}`);
      } catch (_error) {
        onMessage('Feedback failed (unexpected error)');
      } finally {
        setIsSending(false);
      }
    },
    [onMessage]
  );

  const regionCount = result.regions.length;
  const close = () => setDialog(null);

  return (
    <View style={styles.section}>
      <Text style={[styles.caption, { color: t.textTertiary }]}>FEEDBACK</Text>
      <View style={styles.buttons}>
        <SoftButton label="Comment" disabled={isSending} onPress={() => setDialog('comment')} />
        <SoftButton label="Values (mm)" disabled={isSending} onPress={() => setDialog('mm')} />
        <SoftButton label={'Values (1/32")'} disabled={isSending} onPress={() => setDialog('inch32')} />
        <SoftButton
          label="Shoulder wear (BETA)"
          disabled={isSending}
          onPress={() => setDialog('shoulderWear')}
        />
      </View>

      <CommentDialog
        visible={dialog === 'comment'}
        onCancel={close}
        onSend={(comment) => run(() => sendCommentFeedback(measurementUUID, comment))}
      />
      <ValuesDialog
        visible={dialog === 'mm' || dialog === 'inch32'}
        unit={dialog === 'inch32' ? 'inch32' : 'mm'}
        regionCount={regionCount}
        onCancel={close}
        onSend={(regions) => run(() => sendTreadDepthResultFeedback(measurementUUID, regions))}
      />
      <ShoulderWearDialog
        visible={dialog === 'shoulderWear'}
        left={result.regions[0]?.shoulder_wear}
        right={result.regions[regionCount - 1]?.shoulder_wear}
        onCancel={close}
        onSend={(left, right) =>
          run(() => sendShoulderWearFeedback(measurementUUID, { left, right }))
        }
      />
    </View>
  );
}

function FeedbackDialog({
  visible,
  title,
  onCancel,
  onSend,
  children,
}: {
  visible: boolean;
  title: string;
  onCancel: () => void;
  onSend: () => void;
  children: React.ReactNode;
}): React.JSX.Element {
  const t = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.sheet, { backgroundColor: t.cardSurface, borderColor: t.hairline }]}>
          <Text style={[styles.title, { color: t.brand }]}>{title}</Text>
          {children}
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={onCancel} style={styles.action}>
              <Text style={[styles.actionText, { color: t.brand }]}>Cancel</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={onSend} style={styles.action}>
              <Text style={[styles.actionText, styles.actionPrimary, { color: t.brand }]}>Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function CommentDialog({
  visible,
  onCancel,
  onSend,
}: {
  visible: boolean;
  onCancel: () => void;
  onSend: (comment: string) => void;
}): React.JSX.Element {
  const t = useTheme();
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (visible) setComment('');
  }, [visible]);

  return (
    <FeedbackDialog visible={visible} title="Comment" onCancel={onCancel} onSend={() => onSend(comment)}>
      <TextInput
        style={[styles.input, styles.multiline, { backgroundColor: t.inset, color: t.textPrimary }]}
        multiline
        placeholder="Your comment"
        placeholderTextColor={t.textTertiary}
        value={comment}
        onChangeText={setComment}
      />
    </FeedbackDialog>
  );
}

/**
 * One field per region of the result, left to right. An empty field is sent
 * as an unavailable region. The 1/32" values are converted to millimeters,
 * the only unit the feedback region takes.
 */
function ValuesDialog({
  visible,
  unit,
  regionCount,
  onCancel,
  onSend,
}: {
  visible: boolean;
  unit: 'mm' | 'inch32';
  regionCount: number;
  onCancel: () => void;
  onSend: (regions: TreadDepthFeedbackRegion[]) => void;
}): React.JSX.Element {
  const t = useTheme();
  const [values, setValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (visible) setValues(Array.from({ length: regionCount }, () => ''));
  }, [visible, regionCount]);

  const unitLabel = unit === 'mm' ? 'mm' : '/32"';

  const send = () => {
    const regions = values.map((text): TreadDepthFeedbackRegion => {
      const value = parseFloat(text.replace(',', '.'));
      if (text.trim() === '' || Number.isNaN(value)) {
        return { available: false, value_mm: 0 };
      }
      return {
        available: true,
        value_mm: unit === 'mm' ? value : (value / 32) * MM_PER_INCH,
      };
    });
    onSend(regions);
  };

  return (
    <FeedbackDialog
      visible={visible}
      title={`Tread depth feedback (${unitLabel})`}
      onCancel={onCancel}
      onSend={send}
    >
      <View style={styles.values}>
        {values.map((value, index) => (
          <View key={`region-${index}`} style={styles.value}>
            <TextInput
              style={[styles.input, styles.valueInput, { backgroundColor: t.inset, color: t.textPrimary }]}
              keyboardType="decimal-pad"
              textAlign="center"
              value={value}
              onChangeText={(text) =>
                setValues((current) => current.map((v, i) => (i === index ? text : v)))
              }
            />
            <Text style={[styles.valueLabel, { color: t.textSecondary }]}>
              R{index + 1} · {unitLabel}
            </Text>
          </View>
        ))}
      </View>
      <Text style={[styles.hint, { color: t.textTertiary }]}>
        Leave a field empty to send that region as unavailable.
      </Text>
    </FeedbackDialog>
  );
}

/** The value picked for one shoulder. 'none' sends no value (null). */
type Choice = 'worn' | 'notWorn' | 'none';

const CHOICES: { value: Choice; label: string }[] = [
  { value: 'worn', label: 'Worn' },
  { value: 'notWorn', label: 'Not worn' },
  { value: 'none', label: 'Unknown' },
];

function fromShoulderWear(shoulderWear: ShoulderWear | null | undefined): Choice {
  if (shoulderWear == null) return 'none';
  return shoulderWear.worn ? 'worn' : 'notWorn';
}

function toShoulderWear(choice: Choice): ShoulderWear | null {
  if (choice === 'none') return null;
  return { worn: choice === 'worn' };
}

/**
 * BETA. Both sides start from the estimates in the result, so a side the user
 * does not touch is sent as it was reported (the full state the user sees).
 * Sending with no side is allowed on purpose, so the example also shows the
 * INVALID_ARGUMENT error from the SDK.
 */
function ShoulderWearDialog({
  visible,
  left,
  right,
  onCancel,
  onSend,
}: {
  visible: boolean;
  left: ShoulderWear | null | undefined;
  right: ShoulderWear | null | undefined;
  onCancel: () => void;
  onSend: (left: ShoulderWear | null, right: ShoulderWear | null) => void;
}): React.JSX.Element {
  const t = useTheme();
  const [leftChoice, setLeftChoice] = React.useState<Choice>('none');
  const [rightChoice, setRightChoice] = React.useState<Choice>('none');

  React.useEffect(() => {
    if (visible) {
      setLeftChoice(fromShoulderWear(left));
      setRightChoice(fromShoulderWear(right));
    }
  }, [visible, left, right]);

  const noSide = leftChoice === 'none' && rightChoice === 'none';

  const sideRow = (label: string, value: Choice, onChange: (choice: Choice) => void) => (
    <View style={styles.side}>
      <Text style={[styles.sideLabel, { color: t.textPrimary }]}>{label}</Text>
      <View style={styles.choices}>
        {CHOICES.map((choice) => {
          const selected = choice.value === value;
          return (
            <Pressable
              key={choice.value}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onChange(choice.value)}
              style={[
                styles.choice,
                { borderColor: selected ? t.brand : t.hairline },
                selected && { backgroundColor: soft(t.brand) },
              ]}
            >
              <Text style={[styles.choiceText, { color: selected ? t.brand : t.textSecondary }]}>
                {choice.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <FeedbackDialog
      visible={visible}
      title="Shoulder wear feedback (BETA)"
      onCancel={onCancel}
      onSend={() => onSend(toShoulderWear(leftChoice), toShoulderWear(rightChoice))}
    >
      {sideRow('Left', leftChoice, setLeftChoice)}
      {sideRow('Right', rightChoice, setRightChoice)}
      {noSide ? (
        <Text style={[styles.hint, { color: t.textTertiary }]}>
          Pick Worn or Not worn for at least one side.
        </Text>
      ) : null}
    </FeedbackDialog>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 6,
  },
  caption: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sheet: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  values: {
    flexDirection: 'row',
    gap: 8,
  },
  value: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  valueInput: {
    alignSelf: 'stretch',
  },
  valueLabel: {
    fontSize: 12,
  },
  hint: {
    fontSize: 12,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sideLabel: {
    width: 40,
    fontSize: 13,
    fontWeight: '600',
  },
  choices: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  choice: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 7,
  },
  choiceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 15,
  },
  actionPrimary: {
    fontWeight: '700',
  },
});
