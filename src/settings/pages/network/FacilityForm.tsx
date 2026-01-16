import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider } from '@/ui/primitives';
import { facilityService, organizationService } from '@/network/services/entityService';
import type { Facility, Organization, FacilityType } from '@/network/types';

const AddressDisplay = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.76);
  padding: 8px;
  background: rgba(255,255,255,0.02);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
`;

export interface FacilityFormProps {
  facility?: Facility;
  onSubmit: (facilityData: Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function FacilityForm({ 
  facility, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: FacilityFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<FacilityType>('warehouse');
  const [organizationId, setOrganizationId] = useState('');
  const [ownershipType, setOwnershipType] = useState<'owned' | 'leased' | 'third_party'>('owned');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const isEdit = !!facility;

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
    if (facility) {
      setName(facility.name);
      setType(facility.type);
      setOrganizationId(facility.organizationId);
      setOwnershipType(facility.ownershipType);
    }
  }, [facility]);

  const handleSubmit = () => {
    onSubmit({
      name: name.trim(),
      type,
      organizationId,
      ownershipType,
      physicalLocationId: facility?.physicalLocationId,
      portId: facility?.portId,
      matchStatus: facility?.matchStatus || 'unlinked',
      verificationStatus: facility?.verificationStatus || 'unverified',
    });
  };

  const handleDelete = () => {
    if (facility && onDelete) {
      onDelete(facility.id);
    }
  };

  const canSubmit = name.trim().length > 0 && organizationId.length > 0;

  const getTypeDisplay = (type: FacilityType) => {
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getAddressDisplay = () => {
    if (!facility?.physicalLocation) return 'No address set';
    const loc = facility.physicalLocation;
    const parts = [
      loc.addressLine1,
      loc.city,
      loc.state,
      loc.postalCode,
      loc.country,
    ].filter(Boolean);
    return parts.join(', ') || 'No address set';
  };

  return (
    <DrillDownView
      backLinkText="< Facilities"
      backPath="/settings/network/facilities"
      title={isEdit ? `Edit ${facility.name}` : 'New facility'}
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
          <Select value={type} onChange={(e) => setType(e.target.value as FacilityType)}>
            <option value="warehouse">Warehouse</option>
            <option value="distribution_center">Distribution Center</option>
            <option value="office">Office</option>
            <option value="yard">Yard</option>
            <option value="terminal">Terminal</option>
            <option value="port">Port</option>
          </Select>
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

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Ownership</FieldLabel>
        </div>
        <FieldControl>
          <Select 
            value={ownershipType} 
            onChange={(e) => setOwnershipType(e.target.value as 'owned' | 'leased' | 'third_party')}
          >
            <option value="owned">Owned</option>
            <option value="leased">Leased</option>
            <option value="third_party">Third Party</option>
          </Select>
        </FieldControl>
      </FieldRow>

      {isEdit && facility?.physicalLocation && (
        <>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Address</FieldLabel>
              <FieldHint>Address is managed separately</FieldHint>
            </div>
            <FieldControl>
              <AddressDisplay>{getAddressDisplay()}</AddressDisplay>
            </FieldControl>
          </FieldRow>
        </>
      )}
    </DrillDownView>
  );
}
