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

type Entity = { 
  id: string; 
  name: string; 
  companyName: string;
  address: string;
  country: string; 
  isPrimary: boolean;
  status: 'Active' | 'Inactive' 
};

export function AdminLegalEntities() {
  const [rows, setRows] = useState<Entity[]>([
    { 
      id: 'e1', 
      name: 'Flexport International LLC', 
      companyName: 'Flexport International LLC',
      address: '123 Main Street, San Francisco, CA 94105',
      country: 'US', 
      isPrimary: true,
      status: 'Active' 
    },
    { 
      id: 'e2', 
      name: 'Flexport UK Ltd', 
      companyName: 'Flexport UK Ltd',
      address: '456 Fleet Street, London, EC4Y 1HT',
      country: 'GB', 
      isPrimary: false,
      status: 'Active' 
    },
    { 
      id: 'e3', 
      name: 'Flexport EU BV', 
      companyName: 'Flexport EU BV',
      address: '789 Business Park, Amsterdam, 1012 AB',
      country: 'NL', 
      isPrimary: false,
      status: 'Inactive' 
    },
  ]);
  const [draft, setDraft] = useState('');

  return (
    <SettingsPageLayout title="Legal Entities" subtitle="Entities used for contracts, billing, compliance, and reporting.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Entities</CardTitle>
            <Button
              $variant="primary"
              onClick={() => {
                const name = draft.trim();
                if (!name) return;
                setRows((prev) => [...prev, { 
                  id: `e${prev.length + 1}`, 
                  name, 
                  companyName: name,
                  address: '',
                  country: '—', 
                  isPrimary: false,
                  status: 'Active' 
                }]);
                setDraft('');
              }}
            >
              Add entity
            </Button>
          </CardHeader>
          <div style={{ padding: 12 }}>
            <Input placeholder="New entity name…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          </div>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Company Name</Th>
                  <Th>Address</Th>
                  <Th>Country</Th>
                  <Th style={{ width: 120 }}>Primary</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                  <Th style={{ width: 120 }} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <Td>{r.companyName}</Td>
                    <Td>{r.address}</Td>
                    <Td>{r.country}</Td>
                    <Td>{r.isPrimary ? <Tag tone="accent">Primary</Tag> : '—'}</Td>
                    <Td>{r.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag>Inactive</Tag>}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      <Button $variant="ghost" onClick={() => {
                        // TODO: Implement edit functionality
                        console.log('Edit entity:', r.id);
                      }}>
                        Edit
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

