import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation, Outlet, Navigate } from 'react-router-dom';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, Input, Tag, Toggle, VStack } from '@/ui/primitives';
import { ConsolidationRuleForm, type ConsolidationRule } from './ConsolidationRuleForm';

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
      color: rgba(106,167,255,0.95);
      text-decoration: underline;
      text-decoration-color: rgba(106,167,255,0.4);
      text-underline-offset: 3px;
    }
  `}
`;

function ConsolidationRulesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rules, setRules] = useState<ConsolidationRule[]>([
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
                    <Td
                      $clickable
                      onClick={() => navigate(`/settings/shipments/buyers-consolidation/${r.id}`)}
                    >
                      {r.name}
                    </Td>
                    <Td>{r.match}</Td>
                    <Td>{r.behavior}</Td>
                    <Td>
                      <div 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}
                        onClick={(e) => e.stopPropagation()}
                      >
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

function ConsolidationRuleEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, this would fetch from an API
  const [rules] = useState<ConsolidationRule[]>([
    { id: 'r1', name: 'Same supplier + destination', match: 'supplierId + shipTo', behavior: 'Consolidate within 5 days', enabled: true },
    { id: 'r2', name: 'Apparel POs', match: 'category=apparel', behavior: 'Consolidate within 3 days', enabled: true },
    { id: 'r3', name: 'High value', match: 'value > $250k', behavior: 'Never consolidate', enabled: false },
  ]);

  const rule = rules.find((r) => r.id === id);

  if (!id) {
    return <Navigate to="/settings/shipments/buyers-consolidation" replace />;
  }

  if (!rule) {
    return <Navigate to="/settings/shipments/buyers-consolidation" replace />;
  }

  const handleSubmit = async (ruleData: Omit<ConsolidationRule, 'id'>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    navigate('/settings/shipments/buyers-consolidation');
  };

  const handleCancel = () => {
    navigate('/settings/shipments/buyers-consolidation');
  };

  const handleDelete = async (ruleId: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    navigate('/settings/shipments/buyers-consolidation');
  };

  return (
    <ConsolidationRuleForm
      rule={rule}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}

export function ShipmentsBuyersConsolidation() {
  return <Outlet />;
}

export { ConsolidationRulesList, ConsolidationRuleEdit };

