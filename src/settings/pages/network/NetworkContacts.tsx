import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Checkbox, Input, Select, VStack } from '@/ui/primitives';
import { InviteContactModal } from '@/network/components/InviteContactModal';
import { BulkActionBar } from '@/network/components/BulkActionBar';
import { EmptyState } from '@/network/components/EmptyState';
import { StatusBadge } from '@/network/components/StatusBadge';
import { personService, organizationService } from '@/network/services/entityService';
import type { Person, Organization, MatchStatus, VerificationStatus } from '@/network/types';

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

const FilterBar = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export function NetworkContacts() {
  const [contacts, setContacts] = useState<Person[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrganization, setFilterOrganization] = useState<string>('all');
  const [filterMatchStatus, setFilterMatchStatus] = useState<MatchStatus | 'all'>('all');
  const [filterVerificationStatus, setFilterVerificationStatus] = useState<VerificationStatus | 'all'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [contactsData, orgsData] = await Promise.all([
        personService.getAll(),
        organizationService.getAll(),
      ]);
      setContacts(contactsData);
      setOrganizations(orgsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchable = [
          contact.firstName,
          contact.lastName,
          contact.email,
          contact.phone,
          organizations.find(o => o.id === contact.organizationId)?.name,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      // Status filters
      if (filterOrganization !== 'all' && contact.organizationId !== filterOrganization) return false;
      if (filterMatchStatus !== 'all' && contact.matchStatus !== filterMatchStatus) return false;
      if (filterVerificationStatus !== 'all' && contact.verificationStatus !== filterVerificationStatus) return false;

      return true;
    });
  }, [contacts, organizations, searchQuery, filterOrganization, filterMatchStatus, filterVerificationStatus]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredContacts.map(c => c.id)));
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


  const getOrganizationName = (orgId?: string) => {
    if (!orgId) return '—';
    const org = organizations.find(o => o.id === orgId);
    return org?.name || '—';
  };

  return (
    <SettingsPageLayout
      title="Contacts"
      subtitle="Manage contacts and people in your network directory."
    >
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <Button $variant="primary" onClick={() => setIsAddModalOpen(true)}>
              Invite Contact
            </Button>
          </CardHeader>

          <FilterBar>
            <Input
              placeholder="Search by name, email, phone, organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: 200 }}
              aria-label="Search contacts"
            />
            <FilterGroup>
              <Select
                value={filterOrganization}
                onChange={(e) => setFilterOrganization(e.target.value)}
                style={{ width: 180 }}
                aria-label="Filter by organization"
              >
                <option value="all">All organizations</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </Select>
              <Select
                value={filterMatchStatus}
                onChange={(e) => setFilterMatchStatus(e.target.value as MatchStatus | 'all')}
                style={{ width: 140 }}
                aria-label="Filter by match status"
              >
                <option value="all">All match status</option>
                <option value="matched">Matched</option>
                <option value="unlinked">Unlinked</option>
                <option value="needs_review">Needs Review</option>
              </Select>
              <Select
                value={filterVerificationStatus}
                onChange={(e) => setFilterVerificationStatus(e.target.value as VerificationStatus | 'all')}
                style={{ width: 140 }}
                aria-label="Filter by verification status"
              >
                <option value="all">All verification</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
                <option value="needs_review">Needs Review</option>
              </Select>
            </FilterGroup>
          </FilterBar>

          <BulkActionBar
            selectedCount={selectedIds.size}
            onClearSelection={() => setSelectedIds(new Set())}
            actions={[]}
          />

          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
          ) : filteredContacts.length === 0 ? (
            <EmptyState
              title={contacts.length === 0 ? 'No contacts yet' : 'No contacts match your filters'}
              description={
                contacts.length === 0
                  ? 'Start building your network by adding contacts.'
                  : 'Try adjusting your search or filters.'
              }
              primaryAction={
                contacts.length === 0
                  ? {
                      label: 'Invite Contact',
                      onClick: () => setIsAddModalOpen(true),
                    }
                  : undefined
              }
            />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <Th style={{ width: 40 }}>
                      <Checkbox
                        checked={selectedIds.size > 0 && selectedIds.size === filteredContacts.length}
                        onChange={handleSelectAll}
                        aria-label="Select all contacts"
                      />
                    </Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Organization</Th>
                    <Th>Match</Th>
                    <Th>Verification</Th>
                    <Th style={{ width: 120 }} />
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <Td>
                        <Checkbox
                          checked={selectedIds.has(contact.id)}
                          onChange={(checked) => handleSelectOne(contact.id, checked)}
                          aria-label={`Select ${contact.firstName} ${contact.lastName}`}
                        />
                      </Td>
                      <Td>
                        <div style={{ fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>
                          {contact.firstName} {contact.lastName}
                        </div>
                        {contact.title && (
                          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                            {contact.title}
                          </div>
                        )}
                      </Td>
                      <Td>{contact.email || '—'}</Td>
                      <Td>{contact.phone || '—'}</Td>
                      <Td>{getOrganizationName(contact.organizationId)}</Td>
                      <Td>
                        <StatusBadge type="match" status={contact.matchStatus} />
                      </Td>
                      <Td>
                        <StatusBadge type="verification" status={contact.verificationStatus} />
                      </Td>
                      <Td style={{ textAlign: 'right' }}>
                        <Button
                          $variant="ghost"
                          style={{ fontSize: 11, padding: '6px 8px' }}
                          onClick={() => {
                            // TODO: Open detail panel
                          }}
                        >
                          View
                        </Button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </VStack>

      <InviteContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />
    </SettingsPageLayout>
  );
}
