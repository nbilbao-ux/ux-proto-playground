import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Divider, Input, Tag, VStack } from '@/ui/primitives';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
`;

type Supplier = { id: string; name: string; country: string; tier: 'Preferred' | 'Standard' };

export function NetworkSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 's1', name: 'Shenzhen Textiles Co.', country: 'CN', tier: 'Preferred' },
    { id: 's2', name: 'Saigon Footwear Ltd', country: 'VN', tier: 'Standard' },
    { id: 's3', name: 'Monterrey Components', country: 'MX', tier: 'Standard' },
  ]);
  const [draft, setDraft] = useState('');

  return (
    <SettingsPageLayout title="Suppliers" subtitle="Supplier directory used for purchase orders, compliance, and routing.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Supplier directory</CardTitle>
            <Button
              $variant="primary"
              onClick={() => {
                const name = draft.trim();
                if (!name) return;
                setSuppliers((prev) => [...prev, { id: `s${prev.length + 1}`, name, country: '—', tier: 'Standard' }]);
                setDraft('');
              }}
            >
              Add supplier
            </Button>
          </CardHeader>
          <div style={{ padding: 12 }}>
            <Input placeholder="New supplier name…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          </div>
          <Divider />
          {suppliers.map((s, idx) => (
            <React.Fragment key={s.id}>
              <Row>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>{s.name}</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>Country: {s.country}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {s.tier === 'Preferred' ? <Tag tone="accent">Preferred</Tag> : <Tag>Standard</Tag>}
                  <Button $variant="ghost" onClick={() => setSuppliers((prev) => prev.filter((x) => x.id !== s.id))}>
                    Remove
                  </Button>
                </div>
              </Row>
              {idx < suppliers.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

