import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider } from '@/ui/primitives';

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 9px 10px;
  outline: none;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: rgba(106,167,255,0.45);
    box-shadow: 0 0 0 4px rgba(106,167,255,0.14);
  }

  &::placeholder { color: var(--text-faint); }
`;

export type Location = { 
  id: string; 
  name: string; 
  type: 'Warehouse' | 'Port' | 'Office' | 'Yard' | 'Terminal' | 'Distribution Center'; 
  country: string; 
  status: 'Active' | 'Draft';
  description?: string;
};

export interface LocationFormProps {
  location?: Location;
  onSubmit: (location: Omit<Location, 'id'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function LocationForm({ 
  location, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: LocationFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<Location['type']>('Warehouse');
  const [country, setCountry] = useState('US');
  const [status, setStatus] = useState<Location['status']>('Active');
  const [description, setDescription] = useState('');

  const isEdit = !!location;

  useEffect(() => {
    if (location) {
      setName(location.name);
      setType(location.type);
      setCountry(location.country);
      setStatus(location.status);
      setDescription(location.description || '');
    }
  }, [location]);

  const handleSubmit = () => {
    onSubmit({
      name: name.trim(),
      type,
      country,
      status,
      description: description.trim() || undefined,
    });
  };

  const handleDelete = () => {
    if (location && onDelete) {
      onDelete(location.id);
    }
  };

  const canSubmit = name.trim().length > 0;

  return (
    <DrillDownView
      backLinkText="< Locations"
      backPath="/settings/network/locations"
      title={isEdit ? `Edit ${location.name}` : 'New location'}
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
            placeholder="Add a descriptive name..."
            autoFocus
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Type</FieldLabel>
        </div>
        <FieldControl>
          <Select value={type} onChange={(e) => setType(e.target.value as Location['type'])}>
            <option value="Warehouse">Warehouse</option>
            <option value="Distribution Center">Distribution Center</option>
            <option value="Office">Office</option>
            <option value="Yard">Yard</option>
            <option value="Terminal">Terminal</option>
            <option value="Port">Port</option>
          </Select>
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Country</FieldLabel>
          <FieldHint>ISO country code</FieldHint>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country code (e.g., US, CN, NL)"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Status</FieldLabel>
        </div>
        <FieldControl>
          <Select value={status} onChange={(e) => setStatus(e.target.value as Location['status'])}>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </Select>
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Description</FieldLabel>
        </div>
        <FieldControl>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description, location details, or notes..."
          />
        </FieldControl>
      </FieldRow>
    </DrillDownView>
  );
}
