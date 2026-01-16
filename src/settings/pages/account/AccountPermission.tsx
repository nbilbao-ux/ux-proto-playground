import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  FieldControl,
  FieldHint,
  FieldLabel,
  FieldRow,
  Muted,
  Select,
  Toggle,
  VStack,
} from '@/ui/primitives';

export function AccountPermission() {
  const [role, setRole] = useState('member');
  const [allowApiTokens, setAllowApiTokens] = useState(false);
  const [defaultScope, setDefaultScope] = useState('read-only');

  return (
    <SettingsPageLayout
      title="Permission"
      subtitle="Control how your account is allowed to interact with company data and APIs."
      headerRight={<Button $variant="ghost">Request elevated access</Button>}
    >
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Role and access</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Workspace role</FieldLabel>
                <FieldHint>Determines what you can see and manage across the app</FieldHint>
              </div>
              <FieldControl>
                <Select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Workspace role">
                  <option value="member">Member</option>
                  <option value="power-user">Power user</option>
                  <option value="admin">Admin</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Allow personal API tokens</FieldLabel>
                <FieldHint>Enable creation of personal tokens (audit logged)</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={allowApiTokens} onChange={setAllowApiTokens} aria-label="Allow API tokens" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Default token scope</FieldLabel>
                <FieldHint>Applied to new tokens; can be overridden per token</FieldHint>
              </div>
              <FieldControl>
                <Select value={defaultScope} onChange={(e) => setDefaultScope(e.target.value)} aria-label="Default token scope">
                  <option value="read-only">Read only</option>
                  <option value="read-write">Read / write</option>
                  <option value="admin">Admin operations</option>
                </Select>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardBody>
            <Muted>
              This is a prototype surface for permission concepts (role clarity, token governance, auditability). It does not
              persist changes.
            </Muted>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

