import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider } from '@/ui/primitives';

export type User = { 
  id: string; 
  name: string; 
  email: string; 
  role: 'Member' | 'Admin'; 
  status: 'Active' | 'Invited';
};

export interface UserFormProps {
  user?: User;
  onSubmit: (userData: Omit<User, 'id'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function UserForm({ 
  user, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Member' | 'Admin'>('Member');
  const [status, setStatus] = useState<'Active' | 'Invited'>('Active');

  const isEdit = !!user;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    }
  }, [user]);

  const handleSubmit = () => {
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      role,
      status,
    });
  };

  const handleDelete = () => {
    if (user && onDelete) {
      onDelete(user.id);
    }
  };

  const canSubmit = name.trim().length > 0 && email.trim().length > 0;

  return (
    <DrillDownView
      backLinkText="< Users"
      backPath="/settings/admin/users"
      title={isEdit ? user.name : 'New user'}
      submitLabel={isEdit ? 'Update' : 'Create'}
      isLoading={isLoading}
      isSubmitDisabled={!canSubmit}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      onDelete={isEdit ? handleDelete : undefined}
    >
      <FieldRow>
        <div>
          <FieldLabel>Name</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            autoFocus
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Email</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Role</FieldLabel>
        </div>
        <FieldControl>
          <Select value={role} onChange={(e) => setRole(e.target.value as 'Member' | 'Admin')}>
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </Select>
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Status</FieldLabel>
        </div>
        <FieldControl>
          <Select value={status} onChange={(e) => setStatus(e.target.value as 'Active' | 'Invited')}>
            <option value="Active">Active</option>
            <option value="Invited">Invited</option>
          </Select>
        </FieldControl>
      </FieldRow>
    </DrillDownView>
  );
}
