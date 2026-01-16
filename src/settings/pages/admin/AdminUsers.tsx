import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation, Outlet, Navigate } from 'react-router-dom';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Checkbox, Divider, Input, Tag, VStack } from '@/ui/primitives';
import { BulkActionBar } from '@/network/components/BulkActionBar';
import { UserForm, type User } from './UserForm';

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

const Td = styled.td<{ $clickable?: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
  ${(p) => p.$clickable && `
    cursor: pointer;
    &:hover {
      background: rgba(255,255,255,0.02);
      color: rgba(106,167,255,0.95);
      text-decoration: underline;
      text-decoration-color: rgba(106,167,255,0.4);
      text-underline-offset: 3px;
    }
  `}
`;

const FilterBar = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 12px;
  align-items: center;
`;

function UsersList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Nina Bilbao', email: 'nina@company.com', role: 'Admin', status: 'Active' },
    { id: 'u2', name: 'Jordan Lee', email: 'jordan@company.com', role: 'Member', status: 'Active' },
    { id: 'u3', name: 'Sam Patel', email: 'sam@company.com', role: 'Member', status: 'Invited' },
  ]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchable = [user.name, user.email, user.role].join(' ').toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      return true;
    });
  }, [users, searchQuery]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredUsers.map(u => u.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleDownloadCSV = () => {
    // CSV download functionality not implemented for prototype
    console.log('Download CSV for selected users:', Array.from(selectedIds));
  };

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
          <FilterBar>
            <Input
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: 200 }}
              aria-label="Search users"
            />
          </FilterBar>
          <BulkActionBar
            selectedCount={selectedIds.size}
            onClearSelection={() => setSelectedIds(new Set())}
            actions={[
              {
                label: 'Download CSV',
                onClick: handleDownloadCSV,
                variant: 'ghost',
              },
            ]}
          />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th style={{ width: 40 }}>
                    <Checkbox
                      checked={selectedIds.size > 0 && selectedIds.size === filteredUsers.length}
                      onChange={handleSelectAll}
                      aria-label="Select all users"
                    />
                  </Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <Td>
                      <Checkbox
                        checked={selectedIds.has(u.id)}
                        onChange={(checked) => handleSelectOne(u.id, checked)}
                        aria-label={`Select ${u.name}`}
                      />
                    </Td>
                    <Td
                      $clickable
                      onClick={() => navigate(`/settings/admin/users/${u.id}`)}
                    >
                      {u.name}
                    </Td>
                    <Td>{u.email}</Td>
                    <Td>{u.role}</Td>
                    <Td>{u.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag tone="warning">Invited</Tag>}</Td>
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

function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, this would fetch from an API
  const [users] = useState<User[]>([
    { id: 'u1', name: 'Nina Bilbao', email: 'nina@company.com', role: 'Admin', status: 'Active' },
    { id: 'u2', name: 'Jordan Lee', email: 'jordan@company.com', role: 'Member', status: 'Active' },
    { id: 'u3', name: 'Sam Patel', email: 'sam@company.com', role: 'Member', status: 'Invited' },
  ]);

  const user = users.find((u) => u.id === id);

  if (!id) {
    return <Navigate to="/settings/admin/users" replace />;
  }

  if (!user) {
    return <Navigate to="/settings/admin/users" replace />;
  }

  const handleSubmit = async (userData: Omit<User, 'id'>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    navigate('/settings/admin/users');
  };

  const handleCancel = () => {
    navigate('/settings/admin/users');
  };

  const handleDelete = async (userId: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    navigate('/settings/admin/users');
  };

  return (
    <UserForm
      user={user}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}

export function AdminUsers() {
  return <Outlet />;
}

export { UsersList, UserEdit };

