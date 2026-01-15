import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Select, VStack } from '@/ui/primitives';

export function AdminCompany() {
  const [companyName, setCompanyName] = useState('Flexport');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [dateFormat, setDateFormat] = useState('mm-dd-yyyy');

  return (
    <SettingsPageLayout title="Company" subtitle="Workspace-level configuration used across the organization.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Company name</FieldLabel>
                <FieldHint>Displayed across documents and exports</FieldHint>
              </div>
              <FieldControl>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} aria-label="Company name" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Timezone</FieldLabel>
                <FieldHint>Default timezone for reporting and timestamps</FieldHint>
              </div>
              <FieldControl>
                <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} aria-label="Timezone">
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Date format</FieldLabel>
                <FieldHint>Used for exports and PDF generation</FieldHint>
              </div>
              <FieldControl>
                <Select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} aria-label="Date format">
                  <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                  <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </Select>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

