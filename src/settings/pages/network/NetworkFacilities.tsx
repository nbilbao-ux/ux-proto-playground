import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation, Outlet, Navigate } from 'react-router-dom';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Checkbox, Input, Select, VStack } from '@/ui/primitives';
import { AddFacilityModal } from '@/network/components/AddFacilityModal';
import { BulkActionBar } from '@/network/components/BulkActionBar';
import { EmptyState } from '@/network/components/EmptyState';
import { StatusBadge } from '@/network/components/StatusBadge';
import { facilityService, organizationService } from '@/network/services/entityService';
import { FacilityForm } from './FacilityForm';
import type { Facility, Organization, MatchStatus, FacilityType } from '@/network/types';

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

const Td = styled.td<{ $clickable?: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
  ${(p) => p.$clickable && `
    cursor: pointer;
    &:hover {
      background: rgba(255,255,255,0.02);
      
      div {
        color: rgba(106,167,255,0.95);
        text-decoration: underline;
        text-decoration-color: rgba(106,167,255,0.4);
        text-underline-offset: 3px;
      }
    }
  `}
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

function FacilitiesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FacilityType | 'all'>('all');
  const [filterOrganization, setFilterOrganization] = useState<string>('all');
  const [filterMatchStatus, setFilterMatchStatus] = useState<MatchStatus | 'all'>('all');

  useEffect(() => {
    loadData();
  }, [location.pathname]); // Refresh when pathname changes (e.g., navigating back from edit)

  const loadData = async () => {
    setLoading(true);
    try {
      const [facilitiesData, orgsData] = await Promise.all([
        facilityService.getAll(),
        organizationService.getAll(),
      ]);
      setFacilities(facilitiesData);
      setOrganizations(orgsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchable = [
          facility.name,
          facility.type,
          organizations.find(o => o.id === facility.organizationId)?.name,
          facility.physicalLocation?.city,
          facility.physicalLocation?.country,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      // Status filters
      if (filterType !== 'all' && facility.type !== filterType) return false;
      if (filterOrganization !== 'all' && facility.organizationId !== filterOrganization) return false;
      if (filterMatchStatus !== 'all' && facility.matchStatus !== filterMatchStatus) return false;

      return true;
    });
  }, [facilities, organizations, searchQuery, filterType, filterOrganization, filterMatchStatus]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredFacilities.map(f => f.id)));
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

  const handleAddSuccess = (facility: Facility) => {
    loadData();
  };

  const getOrganizationName = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    return org?.name || '—';
  };

  const getAddressDisplay = (facility: Facility) => {
    if (!facility.physicalLocation) return '—';
    const loc = facility.physicalLocation;
    return [loc.city, loc.state, loc.country].filter(Boolean).join(', ') || loc.addressLine1 || '—';
  };

  const getTypeDisplay = (type: FacilityType) => {
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <SettingsPageLayout
      title="Facilities & Locations"
      subtitle="Manage operational locations: warehouses, distribution centers, offices, and ports."
      wide
    >
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Facilities</CardTitle>
            <Button $variant="primary" onClick={() => setIsAddModalOpen(true)}>
              Add Facility
            </Button>
          </CardHeader>

          <FilterBar>
            <Input
              placeholder="Search by name, address, organization, port code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: 200 }}
              aria-label="Search facilities"
            />
            <FilterGroup>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FacilityType | 'all')}
                style={{ width: 180 }}
                aria-label="Filter by type"
              >
                <option value="all">All types</option>
                <option value="warehouse">Warehouse</option>
                <option value="distribution_center">Distribution Center</option>
                <option value="office">Office</option>
                <option value="yard">Yard</option>
                <option value="terminal">Terminal</option>
                <option value="port">Port</option>
              </Select>
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
            </FilterGroup>
          </FilterBar>

          <BulkActionBar
            selectedCount={selectedIds.size}
            onClearSelection={() => setSelectedIds(new Set())}
            actions={[]}
          />

          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
          ) : filteredFacilities.length === 0 ? (
            <EmptyState
              title={facilities.length === 0 ? 'No facilities yet' : 'No facilities match your filters'}
              description={
                facilities.length === 0
                  ? 'Start building your network by adding facilities and locations.'
                  : 'Try adjusting your search or filters.'
              }
              primaryAction={
                facilities.length === 0
                  ? {
                      label: 'Add Facility',
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
                        checked={selectedIds.size > 0 && selectedIds.size === filteredFacilities.length}
                        onChange={handleSelectAll}
                        aria-label="Select all facilities"
                      />
                    </Th>
                    <Th>Name</Th>
                    <Th>Type</Th>
                    <Th>Address</Th>
                    <Th>Organization</Th>
                    <Th>Ownership</Th>
                    <Th>Match</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFacilities.map((facility) => (
                    <tr key={facility.id}>
                      <Td>
                        <Checkbox
                          checked={selectedIds.has(facility.id)}
                          onChange={(checked) => handleSelectOne(facility.id, checked)}
                          aria-label={`Select ${facility.name}`}
                        />
                      </Td>
                      <Td
                        $clickable
                        onClick={() => navigate(`/settings/network/facilities/${facility.id}`)}
                      >
                        <div style={{ fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>{facility.name}</div>
                      </Td>
                      <Td>{getTypeDisplay(facility.type)}</Td>
                      <Td>{getAddressDisplay(facility)}</Td>
                      <Td>{getOrganizationName(facility.organizationId)}</Td>
                      <Td>
                        {facility.ownershipType === 'owned' ? 'Owned' : facility.ownershipType === 'leased' ? 'Leased' : 'Third Party'}
                      </Td>
                      <Td>
                        <StatusBadge type="match" status={facility.matchStatus} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </VStack>

      <AddFacilityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </SettingsPageLayout>
  );
}

function FacilityEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [facility, setFacility] = useState<Facility | undefined>(undefined);

  useEffect(() => {
    const loadFacility = async () => {
      if (!id) return;
      try {
        const facilities = await facilityService.getAll();
        const found = facilities.find((f) => f.id === id);
        setFacility(found);
      } catch (error) {
        console.error('Failed to load facility:', error);
      }
    };
    loadFacility();
  }, [id]);

  if (!id) {
    return <Navigate to="/settings/network/facilities" replace />;
  }

  if (!facility) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading...
      </div>
    );
  }

  const handleSubmit = async (facilityData: Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, this would call facilityService.update(id, facilityData)
    setIsLoading(false);
    navigate('/settings/network/facilities');
  };

  const handleCancel = () => {
    navigate('/settings/network/facilities');
  };

  const handleDelete = async (facilityId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, this would call facilityService.delete(facilityId)
    setIsLoading(false);
    navigate('/settings/network/facilities');
  };

  return (
    <FacilityForm
      facility={facility}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}

export function NetworkFacilities() {
  return <Outlet />;
}

export { FacilitiesList, FacilityEdit };
