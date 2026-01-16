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

type Entity = { id: string; name: string; country: string; status: 'Active' | 'Inactive' };

export function AdminLegalEntities() {
  const [rows, setRows] = useState<Entity[]>([
    { id: 'e1', name: 'Flexport International LLC', country: 'US', status: 'Active' },
    { id: 'e2', name: 'Flexport UK Ltd', country: 'GB', status: 'Active' },
    { id: 'e3', name: 'Flexport EU BV', country: 'NL', status: 'Inactive' },
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
                setRows((prev) => [...prev, { id: `e${prev.length + 1}`, name, country: '—', status: 'Active' }]);
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
                  <Th>Name</Th>
                  <Th>Country</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                  <Th style={{ width: 120 }} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <Td>{r.name}</Td>
                    <Td>{r.country}</Td>
                    <Td>{r.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag>Inactive</Tag>}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      <Button $variant="ghost" onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}>
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

