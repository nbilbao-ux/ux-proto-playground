import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, Input, Tag, Toggle, VStack } from '@/ui/primitives';

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

type Rule = { id: string; name: string; match: string; behavior: string; enabled: boolean };

export function ShipmentsBuyersConsolidation() {
  const [rules, setRules] = useState<Rule[]>([
    { id: 'r1', name: 'Same supplier + destination', match: 'supplierId + shipTo', behavior: 'Consolidate within 5 days', enabled: true },
    { id: 'r2', name: 'Apparel POs', match: 'category=apparel', behavior: 'Consolidate within 3 days', enabled: true },
    { id: 'r3', name: 'High value', match: 'value > $250k', behavior: 'Never consolidate', enabled: false },
  ]);
  const [draftName, setDraftName] = useState('');

  return (
    <SettingsPageLayout title="Buyer's Consolidation" subtitle="Rules that group purchase orders into consolidated shipments.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Rules</CardTitle>
            <Button
              $variant="primary"
              onClick={() => {
                const name = (draftName || 'New rule').trim();
                setRules((prev) => [
                  ...prev,
                  { id: `r${prev.length + 1}`, name, match: '—', behavior: 'Consolidate within 7 days', enabled: true },
                ]);
                setDraftName('');
              }}
            >
              Add rule
            </Button>
          </CardHeader>
          <CardBody style={{ paddingTop: 12, paddingBottom: 12 }}>
            <Input placeholder="Name your next rule…" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
          </CardBody>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th style={{ width: 210 }}>Name</Th>
                  <Th>Match</Th>
                  <Th>Behavior</Th>
                  <Th style={{ width: 120 }}>Status</Th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.id}>
                    <Td>{r.name}</Td>
                    <Td>{r.match}</Td>
                    <Td>{r.behavior}</Td>
                    <Td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        {r.enabled ? <Tag tone="success">On</Tag> : <Tag>Off</Tag>}
                        <Toggle
                          checked={r.enabled}
                          onChange={(checked) =>
                            setRules((prev) => prev.map((x) => (x.id === r.id ? { ...x, enabled: checked } : x)))
                          }
                          aria-label={`Toggle rule ${r.name}`}
                        />
                      </div>
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

