import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  FieldControl,
  FieldHint,
  FieldLabel,
  FieldRow,
  Select,
  Toggle,
  VStack,
} from '@/ui/primitives';

export function ShipmentsOptimization() {
  const [optimizeCostVsSpeed, setOptimizeCostVsSpeed] = useState('balanced');
  const [autoUpgradeForRisk, setAutoUpgradeForRisk] = useState(true);
  const [preferDirect, setPreferDirect] = useState(false);

  return (
    <SettingsPageLayout title="Optimization" subtitle="Optimization policy used for suggested routing and mode decisions.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Policy</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Optimization goal</FieldLabel>
                <FieldHint>Choose how recommendations balance cost, speed, and reliability</FieldHint>
              </div>
              <FieldControl>
                <Select
                  value={optimizeCostVsSpeed}
                  onChange={(e) => setOptimizeCostVsSpeed(e.target.value)}
                  aria-label="Optimization goal"
                >
                  <option value="cost">Lowest cost</option>
                  <option value="balanced">Balanced</option>
                  <option value="speed">Fastest delivery</option>
                  <option value="reliability">Most reliable</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Auto-upgrade for risk</FieldLabel>
                <FieldHint>Upgrade service level when disruption probability exceeds a threshold</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={autoUpgradeForRisk} onChange={setAutoUpgradeForRisk} aria-label="Auto-upgrade for risk" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Prefer direct routes</FieldLabel>
                <FieldHint>Bias recommendations toward fewer handoffs, even if slightly more expensive</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={preferDirect} onChange={setPreferDirect} aria-label="Prefer direct routes" />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

