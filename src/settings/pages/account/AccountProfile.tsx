import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Select, Toggle } from '@/ui/primitives';

export function AccountProfile() {
  const [defaultHome, setDefaultHome] = useState('active-issues');
  const [displayFullNames, setDisplayFullNames] = useState(true);
  const [firstDay, setFirstDay] = useState('monday');
  const [convertEmoticons, setConvertEmoticons] = useState(true);

  return (
    <SettingsPageLayout title="Preferences" subtitle="General preferences for how settings behave for your account.">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardBody style={{ padding: 0 }}>
          <FieldRow>
            <div>
              <FieldLabel>Default home view</FieldLabel>
              <FieldHint>Select which view to display when launching the app</FieldHint>
            </div>
            <FieldControl>
              <Select value={defaultHome} onChange={(e) => setDefaultHome(e.target.value)} aria-label="Default home view">
                <option value="active-issues">Active shipments</option>
                <option value="exceptions">Exceptions</option>
                <option value="network">Network</option>
                <option value="admin">Administration</option>
              </Select>
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Display full names</FieldLabel>
              <FieldHint>Show full names instead of shorter usernames</FieldHint>
            </div>
            <FieldControl>
              <Toggle checked={displayFullNames} onChange={setDisplayFullNames} aria-label="Display full names" />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>First day of the week</FieldLabel>
              <FieldHint>Used for date pickers and reporting</FieldHint>
            </div>
            <FieldControl>
              <Select value={firstDay} onChange={(e) => setFirstDay(e.target.value)} aria-label="First day of week">
                <option value="monday">Monday</option>
                <option value="sunday">Sunday</option>
                <option value="saturday">Saturday</option>
              </Select>
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Convert text emoticons into emojis</FieldLabel>
              <FieldHint>Strings like :) will be converted automatically</FieldHint>
            </div>
            <FieldControl>
              <Toggle checked={convertEmoticons} onChange={setConvertEmoticons} aria-label="Convert emoticons" />
            </FieldControl>
          </FieldRow>
        </CardBody>
      </Card>
    </SettingsPageLayout>
  );
}

