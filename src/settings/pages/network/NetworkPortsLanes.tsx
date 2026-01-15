import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, Input, Tag, VStack } from '@/ui/primitives';

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
`;

type Lane = { id: string; from: string; to: string; note?: string };

export function NetworkPortsLanes() {
  const [items, setItems] = useState<Lane[]>([
    { id: 'l1', from: 'Yantian (CNYTN)', to: 'Los Angeles (USLAX)', note: 'Peak season priority' },
    { id: 'l2', from: 'Ningbo (CNNGB)', to: 'Savannah (USSAV)' },
    { id: 'l3', from: 'Ho Chi Minh City (VNSGN)', to: 'Seattle (USSEA)', note: 'Avoid transshipments' },
  ]);
  const [draftFrom, setDraftFrom] = useState('');
  const [draftTo, setDraftTo] = useState('');

  const canAdd = useMemo(() => draftFrom.trim().length > 0 && draftTo.trim().length > 0, [draftFrom, draftTo]);

  return (
    <SettingsPageLayout title="Preferred Ports & Lanes" subtitle="Bias routing and carrier selection by defining preferred lanes.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Preferred lanes</CardTitle>
            <Button
              variant="primary"
              onClick={() => {
                if (!canAdd) return;
                setItems((prev) => [
                  ...prev,
                  { id: `l${prev.length + 1}`, from: draftFrom.trim(), to: draftTo.trim(), note: 'New' },
                ]);
                setDraftFrom('');
                setDraftTo('');
              }}
            >
              Add lane
            </Button>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Input placeholder="From (e.g. CNYTN)" value={draftFrom} onChange={(e) => setDraftFrom(e.target.value)} />
              <Input placeholder="To (e.g. USLAX)" value={draftTo} onChange={(e) => setDraftTo(e.target.value)} />
            </div>
          </CardBody>
          <Divider />
          <List>
            {items.map((l, idx) => (
              <React.Fragment key={l.id}>
                <Row>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>
                      {l.from} → {l.to}
                    </div>
                    {l.note ? <div style={{ marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>{l.note}</div> : null}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tag tone="accent">Preferred</Tag>
                    <Button variant="ghost" onClick={() => setItems((prev) => prev.filter((x) => x.id !== l.id))}>
                      Remove
                    </Button>
                  </div>
                </Row>
                {idx < items.length - 1 ? <Divider /> : null}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

