/**
 * @format
 */

import React, { act } from 'react';
import ReactTestRenderer from 'react-test-renderer';

import {
  GroupHeader,
  MetricTile,
  MutedChip,
  PrimaryButton,
  SectionCard,
  StatusChip,
  SwitchRow,
} from '../DevEx';

test('DevEx components render', async () => {
  await act(async () => {
    ReactTestRenderer.create(
      <>
        <GroupHeader number={1} title="Set up" hint="prerequisites" />
        <SectionCard title="Card" subtitle="subtitle" status={<StatusChip text="Optional" color="#5246E0" />}>
          <SwitchRow label="Toggle" sub="note" value={true} onValueChange={() => {}} />
          <PrimaryButton title="Do it" onPress={() => {}} />
          <PrimaryButton title="Secondary" variant="outlined" onPress={() => {}} loading />
          <MutedChip text="Init required" />
          <MetricTile label="Global mm" value="5.20" highlight />
        </SectionCard>
      </>,
    );
  });
});
