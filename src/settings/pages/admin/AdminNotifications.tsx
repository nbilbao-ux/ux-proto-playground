import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Select, Toggle, VStack } from '@/ui/primitives';

export function AdminNotifications() {
  const [incidentEmails, setIncidentEmails] = useState(true);
  const [maintenanceEmails, setMaintenanceEmails] = useState(true);
  const [severity, setSeverity] = useState('high');

  return (
    <SettingsPageLayout title="Notifications" subtitle="Workspace-wide notifications for incidents and system events.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>System events</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Incident emails</FieldLabel>
                <FieldHint>Send emails to admins when platform incidents occur</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={incidentEmails} onChange={setIncidentEmails} aria-label="Incident emails" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Maintenance emails</FieldLabel>
                <FieldHint>Planned maintenance notifications and release communications</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={maintenanceEmails} onChange={setMaintenanceEmails} aria-label="Maintenance emails" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Minimum incident severity</FieldLabel>
                <FieldHint>Only notify on incidents at or above this severity</FieldHint>
              </div>
              <FieldControl>
                <Select value={severity} onChange={(e) => setSeverity(e.target.value)} aria-label="Minimum incident severity">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </Select>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

