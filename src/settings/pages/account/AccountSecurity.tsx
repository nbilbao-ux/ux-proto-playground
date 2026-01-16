import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { SettingsFieldButton } from '@/settings/components/SettingsFieldButton';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldRow, FieldHint, FieldLabel, Input, Tag, VStack } from '@/ui/primitives';

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

const GoogleLogo = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
  margin-right: 8px;
`;

export function AccountSecurity() {
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
            <SettingsFieldButton
              title="Two-Factor Authentication"
              status="Status: Not Set"
              buttonLabel="Enable two-factor authentication"
              buttonVariant="secondary"
              modalTitle="Enable Two-Factor Authentication"
              modalContent={
                <VStack $gap={16}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Two-factor authentication adds an extra layer of security to your account by requiring a second verification step when you sign in.
                  </div>
                  <FieldRow>
                    <div>
                      <FieldLabel>Verification method</FieldLabel>
                      <FieldHint>Choose how you want to receive verification codes</FieldHint>
                    </div>
                    <FieldControl>
                      <select style={{ width: '100%', padding: '9px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'rgba(255,255,255,0.88)' }}>
                        <option>Authenticator app</option>
                        <option>SMS</option>
                      </select>
                    </FieldControl>
                  </FieldRow>
                </VStack>
              }
              modalFooter={(onClose) => (
                <>
                  <Button $variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => {
                    // Handle enable logic here
                    onClose();
                  }}>
                    Enable
                  </Button>
                </>
              )}
            />
            <SettingsFieldButton
              title="Password"
              status="Last changed: Dec 4, 2019"
              buttonLabel="Change password"
              buttonVariant="secondary"
              modalTitle="Change Password"
              modalContent={
                <VStack $gap={16}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Enter your current password and choose a new one.
                  </div>
                  <FieldRow>
                    <div>
                      <FieldLabel>Current password</FieldLabel>
                    </div>
                    <FieldControl>
                      <Input type="password" placeholder="Enter current password" />
                    </FieldControl>
                  </FieldRow>
                  <FieldRow>
                    <div>
                      <FieldLabel>New password</FieldLabel>
                      <FieldHint>Must be at least 8 characters</FieldHint>
                    </div>
                    <FieldControl>
                      <Input type="password" placeholder="Enter new password" />
                    </FieldControl>
                  </FieldRow>
                  <FieldRow>
                    <div>
                      <FieldLabel>Confirm new password</FieldLabel>
                    </div>
                    <FieldControl>
                      <Input type="password" placeholder="Confirm new password" />
                    </FieldControl>
                  </FieldRow>
                </VStack>
              }
              modalFooter={(onClose) => (
                <>
                  <Button $variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => {
                    // Handle password change logic here
                    onClose();
                  }}>
                    Change password
                  </Button>
                </>
              )}
            />
            <SettingsFieldButton
              title="Authenticate with Google"
              status="Status: Not Set"
              buttonLabel={
                <>
                  <GoogleLogo />
                  Link a Google Account
                </>
              }
              buttonVariant="secondary"
              modalTitle="Link Google Account"
              modalContent={
                <VStack $gap={16}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Link your Google account to enable single sign-on authentication. You'll be able to sign in using your Google credentials.
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                    <GoogleLogo style={{ marginRight: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>Google</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sign in with Google</div>
                    </div>
                  </div>
                </VStack>
              }
              modalFooter={(onClose) => (
                <>
                  <Button $variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => {
                    // Handle Google account linking logic here
                    onClose();
                  }}>
                    Link account
                  </Button>
                </>
              )}
            />
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
                        <Button $variant="secondary" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                          Revoke
                        </Button>
                      ) : (
                        <Button $variant="secondary" onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}>
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

