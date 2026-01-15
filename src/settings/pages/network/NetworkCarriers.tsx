import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardHeader, CardTitle, Divider, Input, Tag, Toggle, VStack } from '@/ui/primitives';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
`;

type Carrier = { id: string; name: string; mode: 'Ocean' | 'Air' | 'Truck'; preferred: boolean };

export function NetworkCarriers() {
  const [carriers, setCarriers] = useState<Carrier[]>([
    { id: 'c1', name: 'Maersk', mode: 'Ocean', preferred: true },
    { id: 'c2', name: 'CMA CGM', mode: 'Ocean', preferred: false },
    { id: 'c3', name: 'Qatar Airways Cargo', mode: 'Air', preferred: true },
  ]);
  const [draft, setDraft] = useState('');

  return (
    <SettingsPageLayout title="Carriers" subtitle="Carrier preferences influence routing, tendering, and recommendations.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Carrier preferences</CardTitle>
            <Button
              variant="primary"
              onClick={() => {
                const name = draft.trim();
                if (!name) return;
                setCarriers((prev) => [...prev, { id: `c${prev.length + 1}`, name, mode: 'Ocean', preferred: false }]);
                setDraft('');
              }}
            >
              Add carrier
            </Button>
          </CardHeader>
          <div style={{ padding: 12 }}>
            <Input placeholder="New carrier name…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          </div>
          <Divider />
          {carriers.map((c, idx) => (
            <React.Fragment key={c.id}>
              <Row>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>{c.name}</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>Mode: {c.mode}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {c.preferred ? <Tag tone="accent">Preferred</Tag> : <Tag>Standard</Tag>}
                  <Toggle
                    checked={c.preferred}
                    onChange={(checked) => setCarriers((prev) => prev.map((x) => (x.id === c.id ? { ...x, preferred: checked } : x)))}
                    aria-label={`Toggle preferred carrier ${c.name}`}
                  />
                  <Button variant="ghost" onClick={() => setCarriers((prev) => prev.filter((x) => x.id !== c.id))}>
                    Remove
                  </Button>
                </div>
              </Row>
              {idx < carriers.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

