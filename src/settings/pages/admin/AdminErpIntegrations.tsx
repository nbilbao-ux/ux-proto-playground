import React from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Muted, Tag, VStack } from '@/ui/primitives';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

type Integration = { id: string; name: string; status: 'Connected' | 'Not connected'; desc: string };

const INTEGRATIONS: Integration[] = [
  { id: 'i1', name: 'NetSuite', status: 'Not connected', desc: 'Sync vendors, POs, and invoices.' },
  { id: 'i2', name: 'SAP', status: 'Not connected', desc: 'Sync master data and financial documents.' },
  { id: 'i3', name: 'Oracle', status: 'Connected', desc: 'Sync vendors and invoice exports.' },
  { id: 'i4', name: 'Dynamics 365', status: 'Not connected', desc: 'Sync finance and procurement entities.' },
];

export function AdminErpIntegrations() {
  return (
    <SettingsPageLayout title="ERP Integrations" subtitle="Connect and manage enterprise integrations for data synchronization.">
      <VStack gap={14}>
        <Grid>
          {INTEGRATIONS.map((i) => (
            <Card key={i.id}>
              <CardHeader>
                <CardTitle>{i.name}</CardTitle>
                {i.status === 'Connected' ? <Tag tone="success">Connected</Tag> : <Tag>Not connected</Tag>}
              </CardHeader>
              <CardBody>
                <Muted>{i.desc}</Muted>
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant={i.status === 'Connected' ? 'ghost' : 'primary'}>
                    {i.status === 'Connected' ? 'Manage' : 'Connect'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </VStack>
    </SettingsPageLayout>
  );
}

