import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, HStack, Tag, VStack } from '@/ui/primitives';
import { StatusBadge } from './StatusBadge';
import { InviteToConnectModal } from './InviteToConnectModal';
import { InviteToJoinModal } from './InviteToJoinModal';
import { canInviteToConnect, canInviteToJoin } from '../services/invitationService';
import { personService } from '../services/entityService';
import { facilityService } from '../services/entityService';
import type { Organization, Person, Facility } from '../types';

const Panel = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 650;
  color: rgba(255,255,255,0.88);
  margin-bottom: 12px;
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

interface OrganizationDetailPanelProps {
  organization: Organization;
  onClose: () => void;
  onUpdate: () => void;
}

export function OrganizationDetailPanel({
  organization,
  onClose,
  onUpdate,
}: OrganizationDetailPanelProps) {
  const [contacts, setContacts] = useState<Person[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isInviteConnectOpen, setIsInviteConnectOpen] = useState(false);
  const [isInviteJoinOpen, setIsInviteJoinOpen] = useState(false);

  useEffect(() => {
    loadRelatedData();
  }, [organization.id]);

  const loadRelatedData = async () => {
    try {
      const [allContacts, allFacilities] = await Promise.all([
        personService.getAll(),
        facilityService.getAll(),
      ]);

      setContacts(allContacts.filter(c => c.organizationId === organization.id));
      setFacilities(allFacilities.filter(f => f.organizationId === organization.id));
    } catch (error) {
      console.error('Failed to load related data:', error);
    }
  };

  const handleInviteSuccess = () => {
    onUpdate();
    loadRelatedData();
  };

  return (
    <Panel>
      <VStack gap={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>
              {organization.name}
            </h2>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <StatusBadge type="match" status={organization.matchStatus} />
              <StatusBadge type="verification" status={organization.verificationStatus} />
              <StatusBadge type="connection" status={organization.connectionStatus} />
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
              <InfoRow>
                <InfoLabel>Domain</InfoLabel>
                <InfoValue>{organization.domain || '—'}</InfoValue>
              </InfoRow>
              {organization.address && (
                <>
                  <InfoRow>
                    <InfoLabel>Address</InfoLabel>
                    <InfoValue>
                      {[
                        organization.address.addressLine1,
                        organization.address.city,
                        organization.address.state,
                        organization.address.postalCode,
                        organization.address.country,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </InfoValue>
                  </InfoRow>
                </>
              )}
              <InfoRow>
                <InfoLabel>Relationship Type</InfoLabel>
                <InfoValue>
                  {organization.relationshipType
                    ? organization.relationshipType.charAt(0).toUpperCase() + organization.relationshipType.slice(1)
                    : '—'}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Tags</InfoLabel>
                <InfoValue>
                  <HStack gap={4}>
                    {organization.tags.length > 0 ? (
                      organization.tags.map((tag) => (
                        <Tag
                          key={tag}
                          tone={tag === 'preferred' ? 'accent' : tag === 'approved' ? 'success' : 'danger'}
                        >
                          {tag}
                        </Tag>
                      ))
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </HStack>
                </InfoValue>
              </InfoRow>
              {organization.matchedGlobalEntityId && (
                <InfoRow>
                  <InfoLabel>Matched Global Entity</InfoLabel>
                  <InfoValue>ID: {organization.matchedGlobalEntityId}</InfoValue>
                </InfoRow>
              )}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack gap={8}>
              {canInviteToConnect(organization) && (
                <Button variant="primary" onClick={() => setIsInviteConnectOpen(true)}>
                  Invite to Connect
                </Button>
              )}
              {canInviteToJoin(organization) && (
                <Button variant="primary" onClick={() => setIsInviteJoinOpen(true)}>
                  Invite to Join
                </Button>
              )}
              {!canInviteToConnect(organization) && !canInviteToJoin(organization) && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {organization.connectionStatus === 'connected'
                    ? 'Already connected'
                    : 'Match organization first to enable invitations'}
                </div>
              )}
            </VStack>
          </CardBody>
        </Card>

        {contacts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Contacts ({contacts.length})</CardTitle>
            </CardHeader>
            <CardBody>
              <VStack gap={8}>
                {contacts.map((contact) => (
                  <div key={contact.id} style={{ padding: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                    <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
                      {contact.firstName} {contact.lastName}
                    </div>
                    {contact.email && (
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                        {contact.email}
                      </div>
                    )}
                  </div>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}

        {facilities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Facilities ({facilities.length})</CardTitle>
            </CardHeader>
            <CardBody>
              <VStack gap={8}>
                {facilities.map((facility) => (
                  <div key={facility.id} style={{ padding: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                    <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>{facility.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                      {facility.type.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>

      <InviteToConnectModal
        isOpen={isInviteConnectOpen}
        onClose={() => setIsInviteConnectOpen(false)}
        organization={organization}
        onSuccess={handleInviteSuccess}
      />

      <InviteToJoinModal
        isOpen={isInviteJoinOpen}
        onClose={() => setIsInviteJoinOpen(false)}
        organization={organization}
        onSuccess={handleInviteSuccess}
      />
    </Panel>
  );
}
