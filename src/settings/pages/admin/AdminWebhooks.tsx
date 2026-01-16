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

type Hook = { id: string; endpoint: string; event: string; status: 'Active' | 'Paused' };

export function AdminWebhooks() {
  const [hooks, setHooks] = useState<Hook[]>([
    { id: 'w1', endpoint: 'https://example.com/webhooks/shipments', event: 'shipment.updated', status: 'Active' },
    { id: 'w2', endpoint: 'https://example.com/webhooks/billing', event: 'invoice.created', status: 'Paused' },
  ]);

  const [endpoint, setEndpoint] = useState('');
  const [event, setEvent] = useState('shipment.updated');

  return (
    <SettingsPageLayout title="Webhooks" subtitle="Send events to external systems. Use this page to prototype key governance patterns.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Create webhook</CardTitle>
            <Button
              $variant="primary"
              onClick={() => {
                const ep = endpoint.trim();
                if (!ep) return;
                setHooks((prev) => [...prev, { id: `w${prev.length + 1}`, endpoint: ep, event, status: 'Active' }]);
                setEndpoint('');
              }}
            >
              Add
            </Button>
          </CardHeader>
          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 220px', gap: 12 }}>
            <Input placeholder="Endpoint URL" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} aria-label="Webhook endpoint" />
            <Input placeholder="Event (e.g. shipment.updated)" value={event} onChange={(e) => setEvent(e.target.value)} aria-label="Webhook event" />
          </div>
          <Divider />
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Endpoint</Th>
                  <Th>Event</Th>
                  <Th style={{ width: 140 }}>Status</Th>
                  <Th style={{ width: 140 }} />
                </tr>
              </thead>
              <tbody>
                {hooks.map((h) => (
                  <tr key={h.id}>
                    <Td>{h.endpoint}</Td>
                    <Td>{h.event}</Td>
                    <Td>{h.status === 'Active' ? <Tag tone="success">Active</Tag> : <Tag tone="warning">Paused</Tag>}</Td>
                    <Td style={{ textAlign: 'right' }}>
                      <Button $variant="ghost" onClick={() => setHooks((prev) => prev.filter((x) => x.id !== h.id))}>
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

