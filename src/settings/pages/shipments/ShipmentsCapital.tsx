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
  Input,
  Toggle,
  VStack,
} from '@/ui/primitives';

export function ShipmentsCapital() {
  const [enabled, setEnabled] = useState(false);
  const [defaultTerms, setDefaultTerms] = useState('30');
  const [autoApproveUnder, setAutoApproveUnder] = useState('50000');

  return (
    <SettingsPageLayout title="Capital" subtitle="Funding and payment preferences applied to eligible shipments.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Capital program</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Enable Capital</FieldLabel>
                <FieldHint>Allow pre-approved shipment funding when available</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={enabled} onChange={setEnabled} aria-label="Enable Capital" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Default net terms (days)</FieldLabel>
                <FieldHint>Applied to new funding requests</FieldHint>
              </div>
              <FieldControl>
                <Input value={defaultTerms} onChange={(e) => setDefaultTerms(e.target.value)} aria-label="Default net terms" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Auto-approve requests under</FieldLabel>
                <FieldHint>Requests below this amount will be auto-approved (prototype setting)</FieldHint>
              </div>
              <FieldControl>
                <Input
                  value={autoApproveUnder}
                  onChange={(e) => setAutoApproveUnder(e.target.value)}
                  aria-label="Auto-approve threshold"
                />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

