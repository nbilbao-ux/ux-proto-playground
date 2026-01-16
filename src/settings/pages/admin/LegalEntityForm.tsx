import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider, Toggle } from '@/ui/primitives';

export type LegalEntity = { 
  id: string; 
  name: string; 
  companyName: string;
  address: string;
  country: string; 
  isPrimary: boolean;
  status: 'Active' | 'Inactive';
};

export interface LegalEntityFormProps {
  entity?: LegalEntity;
  onSubmit: (entityData: Omit<LegalEntity, 'id'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function LegalEntityForm({ 
  entity, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: LegalEntityFormProps) {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('US');
  const [isPrimary, setIsPrimary] = useState(false);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const isEdit = !!entity;

  useEffect(() => {
    if (entity) {
      setName(entity.name);
      setCompanyName(entity.companyName);
      setAddress(entity.address);
      setCountry(entity.country);
      setIsPrimary(entity.isPrimary);
      setStatus(entity.status);
    }
  }, [entity]);

  const handleSubmit = () => {
    onSubmit({
      name: name.trim(),
      companyName: companyName.trim(),
      address: address.trim(),
      country: country.trim(),
      isPrimary,
      status,
    });
  };

  const handleDelete = () => {
    if (entity && onDelete) {
      onDelete(entity.id);
    }
  };

  const canSubmit = name.trim().length > 0 && companyName.trim().length > 0;

  return (
    <DrillDownView
      backLinkText="< Legal Entities"
      backPath="/settings/admin/legal-entities"
      title={isEdit ? entity.companyName : 'New legal entity'}
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
            placeholder="Enter entity name"
            autoFocus
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Company name</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Address</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Country</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country code (e.g., US, GB, NL)"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Primary entity</FieldLabel>
          <FieldHint>Mark as primary legal entity</FieldHint>
        </div>
        <FieldControl>
          <Toggle
            checked={isPrimary}
            onChange={setIsPrimary}
            aria-label="Primary entity"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Status</FieldLabel>
        </div>
        <FieldControl>
          <Select value={status} onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </FieldControl>
      </FieldRow>
    </DrillDownView>
  );
}
