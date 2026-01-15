import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Card, CardBody, CardHeader, CardTitle, VStack } from '@/ui/primitives';
import { StatusBadge } from './StatusBadge';
import { organizationService } from '../services/entityService';
import type { Person, Organization } from '../types';

const Panel = styled.div`
  padding: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
`;

const InfoLabel = styled.span`
  color: var(--text-muted);
`;

const InfoValue = styled.span`
  color: rgba(255,255,255,0.88);
  font-weight: 500;
`;

interface ContactDetailPanelProps {
  contact: Person;
  onClose: () => void;
}

export function ContactDetailPanel({ contact, onClose }: ContactDetailPanelProps) {
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    if (contact.organizationId) {
      organizationService.getById(contact.organizationId).then(setOrganization);
    }
  }, [contact.organizationId]);

  return (
    <Panel>
      <VStack gap={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>
              {contact.firstName} {contact.lastName}
            </h2>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <StatusBadge type="match" status={contact.matchStatus} />
              <StatusBadge type="verification" status={contact.verificationStatus} />
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack gap={12}>
              {contact.email && (
                <InfoRow>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{contact.email}</InfoValue>
                </InfoRow>
              )}
              {contact.phone && (
                <InfoRow>
                  <InfoLabel>Phone</InfoLabel>
                  <InfoValue>{contact.phone}</InfoValue>
                </InfoRow>
              )}
              {contact.title && (
                <InfoRow>
                  <InfoLabel>Title</InfoLabel>
                  <InfoValue>{contact.title}</InfoValue>
                </InfoRow>
              )}
              {organization && (
                <InfoRow>
                  <InfoLabel>Organization</InfoLabel>
                  <InfoValue>{organization.name}</InfoValue>
                </InfoRow>
              )}
              {contact.matchedGlobalEntityId && (
                <InfoRow>
                  <InfoLabel>Matched Global Entity</InfoLabel>
                  <InfoValue>ID: {contact.matchedGlobalEntityId}</InfoValue>
                </InfoRow>
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Panel>
  );
}
