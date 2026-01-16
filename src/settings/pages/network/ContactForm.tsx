import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider } from '@/ui/primitives';
import { organizationService } from '@/network/services/entityService';
import type { Person, Organization, MatchStatus, VerificationStatus } from '@/network/types';

export interface ContactFormProps {
  contact?: Person;
  onSubmit: (contactData: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function ContactForm({ 
  contact, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: ContactFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const isEdit = !!contact;

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await organizationService.getAll();
        setOrganizations(orgs);
      } catch (error) {
        console.error('Failed to load organizations:', error);
      }
    };
    loadOrganizations();
  }, []);

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email || '');
      setPhone(contact.phone || '');
      setTitle(contact.title || '');
      setOrganizationId(contact.organizationId || '');
    }
  }, [contact]);

  const handleSubmit = () => {
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      title: title.trim() || undefined,
      organizationId: organizationId || undefined,
      matchStatus: contact?.matchStatus || 'unlinked',
      verificationStatus: contact?.verificationStatus || 'unverified',
    });
  };

  const handleDelete = () => {
    if (contact && onDelete) {
      onDelete(contact.id);
    }
  };

  const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0;

  return (
    <DrillDownView
      backLinkText="< Contacts"
      backPath="/settings/network/contacts"
      title={isEdit ? `${contact.firstName} ${contact.lastName}` : 'New contact'}
      submitLabel={isEdit ? 'Update' : 'Create'}
      isLoading={isLoading}
      isSubmitDisabled={!canSubmit}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      onDelete={isEdit ? handleDelete : undefined}
    >
      <FieldRow>
        <div>
          <FieldLabel>First name</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            autoFocus
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Last name</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
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
            placeholder="your.email@example.com"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Phone</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Title</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Logistics Manager"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Organization</FieldLabel>
          {organizations.length === 0 && (
            <FieldHint>Loading organizations...</FieldHint>
          )}
        </div>
        <FieldControl>
          <Select 
            value={organizationId} 
            onChange={(e) => setOrganizationId(e.target.value)}
            disabled={organizations.length === 0}
          >
            <option value="">Select an organization...</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </Select>
        </FieldControl>
      </FieldRow>
    </DrillDownView>
  );
}
