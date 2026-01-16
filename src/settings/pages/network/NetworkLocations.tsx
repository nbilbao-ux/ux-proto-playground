import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation, Outlet, Navigate } from 'react-router-dom';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Divider, Tag, VStack } from '@/ui/primitives';
import { LocationForm, type Location } from './LocationForm';
import { locationStore } from './locationStore';

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
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.02);
    
    &:first-child {
      color: rgba(106,167,255,0.95);
      text-decoration: underline;
      text-decoration-color: rgba(106,167,255,0.4);
      text-underline-offset: 3px;
    }
  }
`;

const ClickableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.02);
  }
`;

function LocationsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState<Location[]>([]);

  // Refresh list when pathname changes (e.g., navigating back from edit/create)
  useEffect(() => {
    setRows(locationStore.getAll());
  }, [location.pathname]);

  const handleRowClick = (location: Location) => {
    navigate(`/settings/network/locations/${location.id}`);
  };

  const handleCreate = () => {
    navigate('/settings/network/locations/new');
  };

  return (
    <SettingsPageLayout title="Locations" subtitle="Manage operational locations used across shipments, compliance, and routing.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <Button $variant="primary" onClick={handleCreate}>
              Add location
            </Button>
          </CardHeader>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Country</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <ClickableRow key={r.id} onClick={() => handleRowClick(r)}>
                    <Td>{r.name}</Td>
                    <Td>{r.type}</Td>
                    <Td>{r.country}</Td>
                    <Td>{r.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag>Draft</Tag>}</Td>
                  </ClickableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

function LocationCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (locationData: Omit<Location, 'id'>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    locationStore.create(locationData);
    setIsLoading(false);
    navigate('/settings/network/locations');
  };

  const handleCancel = () => {
    navigate('/settings/network/locations');
  };

  return (
    <LocationForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
}

function LocationEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  const location = id ? locationStore.getById(id) : undefined;

  if (!location) {
    return <Navigate to="/settings/network/locations" replace />;
  }

  const handleSubmit = async (locationData: Omit<Location, 'id'>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (id) {
      locationStore.update(id, locationData);
    }
    setIsLoading(false);
    navigate('/settings/network/locations');
  };

  const handleCancel = () => {
    navigate('/settings/network/locations');
  };

  const handleDelete = async (locationId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    locationStore.delete(locationId);
    setIsLoading(false);
    navigate('/settings/network/locations');
  };

  return (
    <LocationForm
      location={location}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}

export function NetworkLocations() {
  return <Outlet />;
}

export { LocationsList, LocationCreate, LocationEdit };

