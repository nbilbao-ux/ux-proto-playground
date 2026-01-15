import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Divider, Input, Tag, VStack } from '@/ui/primitives';

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

type Location = { id: string; name: string; type: 'Warehouse' | 'Port' | 'Office'; country: string; status: 'Active' | 'Draft' };

export function NetworkLocations() {
  const [rows, setRows] = useState<Location[]>([
    { id: 'loc1', name: 'LA Warehouse', type: 'Warehouse', country: 'US', status: 'Active' },
    { id: 'loc2', name: 'Shenzhen Hub', type: 'Warehouse', country: 'CN', status: 'Active' },
    { id: 'loc3', name: 'Rotterdam', type: 'Port', country: 'NL', status: 'Draft' },
  ]);

  const [draftName, setDraftName] = useState('');

  return (
    <SettingsPageLayout title="Locations" subtitle="Manage operational locations used across shipments, compliance, and routing.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <Button
              variant="primary"
              onClick={() => {
                const name = draftName.trim();
                if (!name) return;
                setRows((prev) => [
                  ...prev,
                  { id: `loc${prev.length + 1}`, name, type: 'Warehouse', country: 'US', status: 'Draft' },
                ]);
                setDraftName('');
              }}
            >
              Add location
            </Button>
          </CardHeader>
          <div style={{ padding: 12 }}>
            <Input placeholder="New location name…" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
          </div>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Country</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                  <Th style={{ width: 120 }} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <Td>{r.name}</Td>
                    <Td>{r.type}</Td>
                    <Td>{r.country}</Td>
                    <Td>{r.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag>Draft</Tag>}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      <Button variant="ghost" onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}>
                        Remove
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

