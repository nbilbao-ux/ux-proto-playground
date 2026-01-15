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
} from '@/ui/primitives';

export function AccountNotifications() {
  const [shipmentAlerts, setShipmentAlerts] = useState(true);
  const [exceptionAlerts, setExceptionAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [digestDay, setDigestDay] = useState('monday');

  return (
    <SettingsPageLayout title="Notifications" subtitle="Choose what updates you receive and how frequently.">
      <Card>
        <CardHeader>
          <CardTitle>Delivery</CardTitle>
        </CardHeader>
        <CardBody style={{ padding: 0 }}>
          <FieldRow>
            <div>
              <FieldLabel>Shipment status alerts</FieldLabel>
              <FieldHint>Milestones and ETA changes for shipments you follow</FieldHint>
            </div>
            <FieldControl>
              <Toggle checked={shipmentAlerts} onChange={setShipmentAlerts} aria-label="Shipment alerts" />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Exception alerts</FieldLabel>
              <FieldHint>High-signal disruptions and compliance issues</FieldHint>
            </div>
            <FieldControl>
              <Toggle checked={exceptionAlerts} onChange={setExceptionAlerts} aria-label="Exception alerts" />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Weekly digest</FieldLabel>
              <FieldHint>Summary of activity and suggested actions</FieldHint>
            </div>
            <FieldControl>
              <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} aria-label="Weekly digest" />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Digest day</FieldLabel>
              <FieldHint>Day of the week to send the summary</FieldHint>
            </div>
            <FieldControl>
              <Select value={digestDay} onChange={(e) => setDigestDay(e.target.value)} aria-label="Digest day">
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </Select>
            </FieldControl>
          </FieldRow>
        </CardBody>
      </Card>
    </SettingsPageLayout>
  );
}

