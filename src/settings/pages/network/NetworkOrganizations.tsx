import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Checkbox, Input, Select, Tag, VStack } from '@/ui/primitives';
import { InviteOrganizationModal } from '@/network/components/InviteOrganizationModal';
import { BulkActionBar } from '@/network/components/BulkActionBar';
import { EmptyState } from '@/network/components/EmptyState';
import { InviteToConnectModal } from '@/network/components/InviteToConnectModal';
import { InviteToJoinModal } from '@/network/components/InviteToJoinModal';
import { organizationService, personService } from '@/network/services/entityService';
import { invitationService } from '@/network/services/invitationService';
import type { Organization, RelationshipType, RelationshipTag, Person, Invitation } from '@/network/types';

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

const SortableTh = styled(Th)`
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 24px;
  
  &:hover {
    color: rgba(255,255,255,0.80);
    background-color: rgba(255,255,255,0.03);
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    opacity: 0.3;
  }
  
  &[data-sort-direction="asc"]::after {
    border-bottom: 6px solid rgba(255,255,255,0.60);
    border-top: none;
    opacity: 1;
  }
  
  &[data-sort-direction="desc"]::after {
    border-top: 6px solid rgba(255,255,255,0.60);
    border-bottom: none;
    opacity: 1;
  }
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

export function NetworkOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [contacts, setContacts] = useState<Person[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inviteOrg, setInviteOrg] = useState<Organization | null>(null);
  const [inviteType, setInviteType] = useState<'connect' | 'join' | null>(null);
  const [resendingInviteId, setResendingInviteId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRelationshipType, setFilterRelationshipType] = useState<RelationshipType | 'all'>('all');
  const [filterTag, setFilterTag] = useState<RelationshipTag | 'all'>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterContactCount, setFilterContactCount] = useState<string>('all');

  // Sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    setLoading(true);
    try {
      const [orgsData, contactsData, invitationsData] = await Promise.all([
        organizationService.getAll(),
        personService.getAll(),
        invitationService.getAll(),
      ]);
      setOrganizations(orgsData);
      setContacts(contactsData);
      setInvitations(invitationsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryContact = (orgId: string) => {
    const orgContacts = contacts.filter(c => c.organizationId === orgId);
    return orgContacts.length > 0 ? orgContacts[0] : null;
  };

  const getContactCount = (orgId: string) => {
    // Count actual contacts
    const actualContacts = contacts.filter(c => c.organizationId === orgId).length;
    
    // Count pending invitation emails for this organization
    const pendingInvitations = invitations.filter(
      inv => inv.entityType === 'organization' && 
             inv.entityId === orgId && 
             inv.status === 'pending' &&
             inv.invitedEmail
    );
    
    // Count unique email addresses from invitations
    const uniqueInviteEmails = new Set(
      pendingInvitations.map(inv => inv.invitedEmail?.toLowerCase()).filter(Boolean)
    );
    
    return actualContacts + uniqueInviteEmails.size;
  };
  
  const getPendingInvitations = (orgId: string): Invitation[] => {
    return invitations.filter(
      inv => inv.entityType === 'organization' && 
             inv.entityId === orgId && 
             inv.status === 'pending'
    );
  };

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      // Search filter - includes company name, address, and primary contact
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const primaryContact = getPrimaryContact(org.id);
        const searchable = [
          org.name,
          org.domain,
          org.address?.city,
          org.address?.country,
          org.address?.addressLine1,
          org.address?.state,
          org.governmentIds?.map(id => id.value).join(' '),
          primaryContact?.firstName,
          primaryContact?.lastName,
          primaryContact?.email,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      // Relationship filter
      if (filterRelationshipType !== 'all' && org.relationshipType !== filterRelationshipType) return false;
      
      // Tag filter
      if (filterTag !== 'all' && !org.tags.includes(filterTag)) return false;
      
      // Country filter
      if (filterCountry !== 'all' && org.address?.country !== filterCountry) return false;
      
      // Contact count filter
      if (filterContactCount !== 'all') {
        const contactCount = getContactCount(org.id);
        switch (filterContactCount) {
          case 'none':
            if (contactCount !== 0) return false;
            break;
          case '1-5':
            if (contactCount < 1 || contactCount > 5) return false;
            break;
          case '6-10':
            if (contactCount < 6 || contactCount > 10) return false;
            break;
          case '11-15':
            if (contactCount < 11 || contactCount > 15) return false;
            break;
          case '16-20':
            if (contactCount < 16 || contactCount > 20) return false;
            break;
          case '20+':
            if (contactCount <= 20) return false;
            break;
        }
      }

      return true;
    });
  }, [organizations, contacts, invitations, searchQuery, filterRelationshipType, filterTag, filterCountry, filterContactCount]);

  const sortedOrganizations = useMemo(() => {
    if (!sortColumn) return filteredOrganizations;

    const sorted = [...filteredOrganizations].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortColumn) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'address':
          aValue = getAddressDisplay(a).toLowerCase();
          bValue = getAddressDisplay(b).toLowerCase();
          break;
        case 'relationship':
          aValue = getRelationshipTypeDisplay(a.relationshipType).toLowerCase();
          bValue = getRelationshipTypeDisplay(b.relationshipType).toLowerCase();
          break;
        case 'tags':
          aValue = a.tags.join(', ').toLowerCase();
          bValue = b.tags.join(', ').toLowerCase();
          break;
        case 'contacts':
          aValue = getContactCount(a.id);
          bValue = getContactCount(b.id);
          break;
        case 'primaryContact':
          const aContact = getPrimaryContact(a.id);
          const bContact = getPrimaryContact(b.id);
          aValue = aContact ? `${aContact.firstName} ${aContact.lastName}`.toLowerCase() : '';
          bValue = bContact ? `${bContact.firstName} ${bContact.lastName}`.toLowerCase() : '';
          break;
        default:
          return 0;
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Compare values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // String comparison
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredOrganizations, sortColumn, sortDirection, contacts, invitations]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredOrganizations.map(o => o.id)));
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

  const handleBulkTagPreferred = async () => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(
        ids.map(id => {
          const org = organizations.find(o => o.id === id);
          if (org && !org.tags.includes('preferred')) {
            return organizationService.update(id, {
              tags: [...org.tags, 'preferred'],
            });
          }
          return Promise.resolve();
        })
      );
      await loadOrganizations();
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Failed to update tags:', error);
    }
  };

  const handleBulkRemovePreferred = async () => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(
        ids.map(id => {
          const org = organizations.find(o => o.id === id);
          if (org && org.tags.includes('preferred')) {
            return organizationService.update(id, {
              tags: org.tags.filter(t => t !== 'preferred'),
            });
          }
          return Promise.resolve();
        })
      );
      await loadOrganizations();
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Failed to update tags:', error);
    }
  };

  const getAddressDisplay = (org: Organization) => {
    if (!org.address) return '—';
    const parts = [
      org.address.addressLine1,
      org.address.addressLine2,
      org.address.city,
      org.address.state,
      org.address.postalCode,
      org.address.country,
    ].filter(Boolean);
    return parts.join(', ') || '—';
  };

  const getRelationshipTypeDisplay = (type?: RelationshipType) => {
    if (!type) return '—';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getPendingInvitation = (orgId: string): Invitation | null => {
    return invitations.find(
      inv => inv.entityType === 'organization' && 
             inv.entityId === orgId && 
             inv.status === 'pending'
    ) || null;
  };

  const handleResendInvite = async (org: Organization) => {
    const pendingInv = getPendingInvitation(org.id);
    if (!pendingInv) return;

    setResendingInviteId(pendingInv.id);
    try {
      await invitationService.resend(pendingInv.id);
      await loadOrganizations();
    } catch (error) {
      console.error('Failed to resend invitation:', error);
    } finally {
      setResendingInviteId(null);
    }
  };

  return (
    <SettingsPageLayout
      title="Organizations"
      subtitle="Manage your organization directory. Match and connect with partners in the Global Network."
    >
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
            <Button $variant="primary" onClick={() => setIsAddModalOpen(true)}>
              Invite
            </Button>
          </CardHeader>

          <FilterBar>
            <Input
              placeholder="Search by company name, address, contact name/email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: 200 }}
              aria-label="Search organizations"
            />
            <FilterGroup>
              <Select
                value={filterRelationshipType}
                onChange={(e) => setFilterRelationshipType(e.target.value as RelationshipType | 'all')}
                style={{ width: 140 }}
                aria-label="Filter by relationship type"
              >
                <option value="all">All relationships</option>
                <option value="supplier">Supplier</option>
                <option value="carrier">Carrier</option>
                <option value="partner">Partner</option>
                <option value="client">Client</option>
                <option value="other">Other</option>
              </Select>
              <Select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value as RelationshipTag | 'all')}
                style={{ width: 140 }}
                aria-label="Filter by tag"
              >
                <option value="all">All tags</option>
                <option value="preferred">Preferred</option>
                <option value="approved">Approved</option>
                <option value="blocked">Blocked</option>
              </Select>
              <Select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                style={{ width: 140 }}
                aria-label="Filter by country"
              >
                <option value="all">All countries</option>
                {Array.from(new Set(organizations.map(org => org.address?.country).filter(Boolean)))
                  .sort()
                  .map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
              </Select>
              <Select
                value={filterContactCount}
                onChange={(e) => setFilterContactCount(e.target.value)}
                style={{ width: 140 }}
                aria-label="Filter by contact count"
              >
                <option value="all">All contact counts</option>
                <option value="none">No contacts</option>
                <option value="1-5">1-5 contacts</option>
                <option value="6-10">6-10 contacts</option>
                <option value="11-15">11-15 contacts</option>
                <option value="16-20">16-20 contacts</option>
                <option value="20+">20+ contacts</option>
              </Select>
            </FilterGroup>
          </FilterBar>

          <BulkActionBar
            selectedCount={selectedIds.size}
            onClearSelection={() => setSelectedIds(new Set())}
            actions={[
              {
                label: 'Tag as Preferred',
                onClick: handleBulkTagPreferred,
                variant: 'ghost',
              },
              {
                label: 'Remove Preferred',
                onClick: handleBulkRemovePreferred,
                variant: 'ghost',
              },
            ]}
          />

          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
          ) : filteredOrganizations.length === 0 ? (
            <EmptyState
              title={organizations.length === 0 ? 'No organizations yet' : 'No organizations match your filters'}
              description={
                organizations.length === 0
                  ? 'Start building your network by adding organizations.'
                  : 'Try adjusting your search or filters.'
              }
              primaryAction={
                organizations.length === 0
                  ? {
                      label: 'Invite',
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
                        checked={selectedIds.size > 0 && selectedIds.size === sortedOrganizations.length}
                        onChange={handleSelectAll}
                        aria-label="Select all organizations"
                      />
                    </Th>
                    <SortableTh
                      onClick={() => handleSort('name')}
                      data-sort-direction={sortColumn === 'name' ? sortDirection : undefined}
                    >
                      Company Name
                    </SortableTh>
                    <SortableTh
                      onClick={() => handleSort('address')}
                      data-sort-direction={sortColumn === 'address' ? sortDirection : undefined}
                    >
                      Address
                    </SortableTh>
                    <SortableTh
                      onClick={() => handleSort('relationship')}
                      data-sort-direction={sortColumn === 'relationship' ? sortDirection : undefined}
                    >
                      Relationship
                    </SortableTh>
                    <SortableTh
                      onClick={() => handleSort('tags')}
                      data-sort-direction={sortColumn === 'tags' ? sortDirection : undefined}
                    >
                      Tags
                    </SortableTh>
                    <SortableTh
                      onClick={() => handleSort('contacts')}
                      data-sort-direction={sortColumn === 'contacts' ? sortDirection : undefined}
                      style={{ textAlign: 'center' }}
                    >
                      Contacts
                    </SortableTh>
                    <SortableTh
                      onClick={() => handleSort('primaryContact')}
                      data-sort-direction={sortColumn === 'primaryContact' ? sortDirection : undefined}
                    >
                      Primary Contact
                    </SortableTh>
                    <Th style={{ width: 120 }}>Invite</Th>
                    <Th style={{ width: 140 }} />
                  </tr>
                </thead>
                <tbody>
                  {sortedOrganizations.map((org) => {
                    const primaryContact = getPrimaryContact(org.id);
                    const pendingInv = getPendingInvitation(org.id);
                    const pendingInvs = getPendingInvitations(org.id);
                    const showResendButton = org.connectionStatus === 'pending_invite' && pendingInv !== null;
                    const hasPendingInvites = pendingInvs.length > 0;
                    
                    return (
                      <tr key={org.id}>
                        <Td>
                          <Checkbox
                            checked={selectedIds.has(org.id)}
                            onChange={(checked) => handleSelectOne(org.id, checked)}
                            aria-label={`Select ${org.name}`}
                          />
                        </Td>
                        <Td>
                          <div style={{ fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>{org.name}</div>
                        </Td>
                        <Td>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.70)' }}>
                            {getAddressDisplay(org)}
                          </div>
                        </Td>
                        <Td>{getRelationshipTypeDisplay(org.relationshipType)}</Td>
                        <Td>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {org.tags.map((tag) => (
                              <Tag key={tag} tone={tag === 'preferred' ? 'accent' : tag === 'approved' ? 'success' : 'danger'}>
                                {tag}
                              </Tag>
                            ))}
                            {org.tags.length === 0 && <span style={{ color: 'var(--text-muted)' }}>—</span>}
                          </div>
                        </Td>
                        <Td>
                          <div style={{ textAlign: 'center', fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>
                            {getContactCount(org.id)}
                          </div>
                        </Td>
                        <Td>
                          {primaryContact ? (
                            <div>
                              <div style={{ fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>
                                {primaryContact.firstName} {primaryContact.lastName}
                              </div>
                              {primaryContact.email && (
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                                  {primaryContact.email}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>—</span>
                          )}
                        </Td>
                        <Td>
                          {hasPendingInvites ? (
                            <Tag tone="warning">Pending</Tag>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>—</span>
                          )}
                        </Td>
                        <Td style={{ textAlign: 'right' }}>
                          {showResendButton && (
                            <Button
                              $variant="ghost"
                              style={{ fontSize: 11, padding: '6px 8px' }}
                              onClick={() => handleResendInvite(org)}
                              disabled={resendingInviteId === pendingInv?.id}
                            >
                              {resendingInviteId === pendingInv?.id ? 'Sending...' : 'Resend Invite'}
                            </Button>
                          )}
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </VStack>

      <InviteOrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          loadOrganizations();
        }}
      />

      {inviteOrg && inviteType === 'connect' && (
        <InviteToConnectModal
          isOpen={true}
          onClose={() => {
            setInviteOrg(null);
            setInviteType(null);
          }}
          organization={inviteOrg}
          onSuccess={() => {
            loadOrganizations();
            setInviteOrg(null);
            setInviteType(null);
          }}
        />
      )}

      {inviteOrg && inviteType === 'join' && (
        <InviteToJoinModal
          isOpen={true}
          onClose={() => {
            setInviteOrg(null);
            setInviteType(null);
          }}
          organization={inviteOrg}
          onSuccess={() => {
            loadOrganizations();
            setInviteOrg(null);
            setInviteType(null);
          }}
        />
      )}
    </SettingsPageLayout>
  );
}
