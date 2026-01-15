import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, Input, Muted, Tag, VStack } from '@/ui/primitives';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
`;

type Partner = { id: string; name: string; type: 'Broker' | '3PL' | 'Forwarder'; status: 'Connected' | 'Pending' };

export function NetworkPartners() {
  const [partners, setPartners] = useState<Partner[]>([
    { id: 'p1', name: 'Customs Broker Co.', type: 'Broker', status: 'Connected' },
    { id: 'p2', name: 'Last Mile 3PL', type: '3PL', status: 'Pending' },
  ]);
  const [draft, setDraft] = useState('');

  return (
    <SettingsPageLayout title="Partners" subtitle="Manage partner organizations and connection status.">
      <VStack gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Connections</CardTitle>
            <Button
              variant="primary"
              onClick={() => {
                const name = draft.trim();
                if (!name) return;
                setPartners((prev) => [...prev, { id: `p${prev.length + 1}`, name, type: 'Forwarder', status: 'Pending' }]);
                setDraft('');
              }}
            >
              Add partner
            </Button>
          </CardHeader>
          <CardBody style={{ paddingTop: 12, paddingBottom: 12 }}>
            <Input placeholder="New partner name…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          </CardBody>
          <Divider />
          {partners.map((p, idx) => (
            <React.Fragment key={p.id}>
              <Row>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 650, color: 'rgba(255,255,255,0.88)' }}>{p.name}</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>Type: {p.type}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {p.status === 'Connected' ? <Tag tone="success">Connected</Tag> : <Tag tone="warning">Pending</Tag>}
                  <Button variant="ghost" onClick={() => setPartners((prev) => prev.filter((x) => x.id !== p.id))}>
                    Remove
                  </Button>
                </div>
              </Row>
              {idx < partners.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design note</CardTitle>
          </CardHeader>
          <CardBody>
            <Muted>
              This page is a good place to prototype connection states (connected / pending / error), ownership, and audit
              surface.
            </Muted>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

