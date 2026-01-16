import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Tag, Toggle, VStack } from '@/ui/primitives';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const Th = styled.th`
  text-align: left;
  color: rgba(255,255,255,0.60);
  font-weight: 600;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
`;

type Session = { id: string; device: string; location: string; lastSeen: string; current?: boolean };

export function AccountSecurity() {
  const [mfa, setMfa] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([
    { id: 's1', device: 'MacBook Pro • Chrome', location: 'San Francisco, US', lastSeen: 'Active now', current: true },
    { id: 's2', device: 'iPhone • App', location: 'San Francisco, US', lastSeen: '2h ago' },
    { id: 's3', device: 'Windows • Edge', location: 'New York, US', lastSeen: '6d ago' },
  ]);

  const activeCount = useMemo(() => sessions.length, [sessions.length]);

  return (
    <SettingsPageLayout title="Security" subtitle="Secure access to your account and review active sessions.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Multi-factor authentication (MFA)</FieldLabel>
                <FieldHint>Require a second factor for login and sensitive actions</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={mfa} onChange={setMfa} aria-label="Enable MFA" />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active sessions</CardTitle>
            <Tag tone="accent">{activeCount} sessions</Tag>
          </CardHeader>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Device</Th>
                  <Th>Location</Th>
                  <Th>Last seen</Th>
                  <Th style={{ width: 140 }} />
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <Td>
                      {s.device} {s.current ? <Tag tone="success" style={{ marginLeft: 8 }}>Current</Tag> : null}
                    </Td>
                    <Td>{s.location}</Td>
                    <Td>{s.lastSeen}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      {s.current ? (
                        <Button $variant="ghost" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                          Revoke
                        </Button>
                      ) : (
                        <Button $variant="ghost" onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}>
                          Revoke
                        </Button>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

