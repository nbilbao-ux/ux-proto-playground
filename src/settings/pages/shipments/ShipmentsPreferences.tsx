import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Select, Toggle, VStack } from '@/ui/primitives';

export function ShipmentsPreferences() {
  const [defaultMode, setDefaultMode] = useState('ocean-fcl');
  const [autoCreateDocs, setAutoCreateDocs] = useState(true);
  const [defaultIncoterm, setDefaultIncoterm] = useState('fob');

  return (
    <SettingsPageLayout title="Shipments Preferences" subtitle="Default behaviors applied when creating and tracking shipments.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Defaults</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Default shipping mode</FieldLabel>
                <FieldHint>Pre-select a mode when creating new shipments</FieldHint>
              </div>
              <FieldControl>
                <Select value={defaultMode} onChange={(e) => setDefaultMode(e.target.value)} aria-label="Default shipping mode">
                  <option value="ocean-fcl">Ocean • FCL</option>
                  <option value="ocean-lcl">Ocean • LCL</option>
                  <option value="air">Air</option>
                  <option value="truck">Truck</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Default Incoterm</FieldLabel>
                <FieldHint>Used for quoting and standardized reporting</FieldHint>
              </div>
              <FieldControl>
                <Select value={defaultIncoterm} onChange={(e) => setDefaultIncoterm(e.target.value)} aria-label="Default Incoterm">
                  <option value="exw">EXW</option>
                  <option value="fob">FOB</option>
                  <option value="cif">CIF</option>
                  <option value="dap">DAP</option>
                  <option value="ddp">DDP</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Auto-create document checklist</FieldLabel>
                <FieldHint>Create a standard checklist (B/L, commercial invoice, packing list)</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={autoCreateDocs} onChange={setAutoCreateDocs} aria-label="Auto-create document checklist" />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

