import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Divider, Input, Tag, VStack } from '@/ui/primitives';

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

type User = { id: string; name: string; email: string; role: 'Member' | 'Admin'; status: 'Active' | 'Invited' };

export function AdminUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Nina Bilbao', email: 'nina@company.com', role: 'Admin', status: 'Active' },
    { id: 'u2', name: 'Jordan Lee', email: 'jordan@company.com', role: 'Member', status: 'Active' },
    { id: 'u3', name: 'Sam Patel', email: 'sam@company.com', role: 'Member', status: 'Invited' },
  ]);
  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <SettingsPageLayout title="Users" subtitle="Manage members, roles, and invitations for your workspace.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Input
                placeholder="Invite by email…"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                aria-label="Invite email"
                style={{ width: 260 }}
              />
              <Button
                $variant="primary"
                onClick={() => {
                  const email = inviteEmail.trim();
                  if (!email) return;
                  setUsers((prev) => [
                    ...prev,
                    { id: `u${prev.length + 1}`, name: 'Invited user', email, role: 'Member', status: 'Invited' },
                  ]);
                  setInviteEmail('');
                }}
              >
                Invite
              </Button>
            </div>
          </CardHeader>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                  <Th style={{ width: 120 }} />
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <Td>{u.name}</Td>
                    <Td>{u.email}</Td>
                    <Td>{u.role}</Td>
                    <Td>{u.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag tone="warning">Invited</Tag>}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      <Button $variant="ghost" onClick={() => setUsers((prev) => prev.filter((x) => x.id !== u.id))}>
                        Remove
                      </Button>
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

