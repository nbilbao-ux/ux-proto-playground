import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider } from '@/ui/primitives';
import type { Organization, RelationshipType, MatchStatus, VerificationStatus, ConnectionStatus } from '@/network/types';

export interface OrganizationFormProps {
  organization?: Organization;
  onSubmit: (orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function OrganizationForm({ 
  organization, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: OrganizationFormProps) {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [relationshipType, setRelationshipType] = useState<RelationshipType>('supplier');

  const isEdit = !!organization;

  useEffect(() => {
    if (organization) {
      setName(organization.name);
      setDomain(organization.domain || '');
      setRelationshipType(organization.relationshipType || 'supplier');
    }
  }, [organization]);

  const handleSubmit = () => {
    onSubmit({
      name: name.trim(),
      domain: domain.trim() || undefined,
      relationshipType,
      tags: organization?.tags || [],
      matchStatus: organization?.matchStatus || 'unlinked',
      verificationStatus: organization?.verificationStatus || 'unverified',
      connectionStatus: organization?.connectionStatus || 'not_connected',
      matchedGlobalEntityId: organization?.matchedGlobalEntityId,
      matchedGlobalEntityHasAccount: organization?.matchedGlobalEntityHasAccount,
      address: organization?.address,
      governmentIds: organization?.governmentIds,
    });
  };

  const handleDelete = () => {
    if (organization && onDelete) {
      onDelete(organization.id);
    }
  };

  const canSubmit = name.trim().length > 0;

  return (
    <DrillDownView
      backLinkText="< Organizations"
      backPath="/settings/network/organizations"
      title={isEdit ? organization.name : 'New organization'}
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
            placeholder="Enter organization name"
            autoFocus
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Domain</FieldLabel>
          <FieldHint>Organization website domain</FieldHint>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Relationship type</FieldLabel>
        </div>
        <FieldControl>
          <Select 
            value={relationshipType} 
            onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
          >
            <option value="supplier">Supplier</option>
            <option value="carrier">Carrier</option>
            <option value="partner">Partner</option>
            <option value="client">Client</option>
            <option value="other">Other</option>
          </Select>
        </FieldControl>
      </FieldRow>
    </DrillDownView>
  );
}
