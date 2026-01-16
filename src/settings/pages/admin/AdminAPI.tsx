import React from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, Divider, FieldControl, FieldHint, FieldRow, VStack } from '@/ui/primitives';

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const SectionDescription = styled(FieldHint)`
  margin-bottom: 0;
  line-height: 1.5;
`;

const EmptyStateText = styled.div`
  font-size: 13px;
  color: var(--text-muted);
`;

const Link = styled.a`
  color: var(--primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export function AdminAPI() {
  return (
    <SettingsPageLayout title="API" subtitle="Manage API credentials, webhooks, and API keys for accessing Flexport's public API endpoints.">
      <VStack $gap={14}>
        {/* API Credentials Section */}
        <Card>
          <CardBody style={{ padding: 0 }}>
            <div style={{ padding: '14px 16px' }}>
              <SectionTitle>API Credentials</SectionTitle>
              <SectionDescription>
                API Credentials represent the new OAuth 2.0 approach for securing access to public API endpoints at Flexport. While API Keys remain a reliable method, they grant access to all API endpoints without the ability to selectively disable access to specific endpoints.
              </SectionDescription>
            </div>
            <Divider />
            <FieldRow>
              <EmptyStateText>No API credentials yet</EmptyStateText>
              <FieldControl>
                <Button
                  $variant="secondary"
                  onClick={() => {
                    // TODO: Implement creation flow
                    console.log('Create API Credential clicked');
                  }}
                >
                  + New API Credential
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* Webhooks Section */}
        <Card>
          <CardBody style={{ padding: 0 }}>
            <div style={{ padding: '14px 16px' }}>
              <SectionTitle>Webhooks</SectionTitle>
              <SectionDescription>
                We have developed webhooks so you can get instant updates on your purchase orders. The Flexport PO webhooks are available at its endpoint of:{' '}
                <Link href="https://apidocs.flexport.com/v3/tag/Milestones#section/PurchaseOrder-Events" target="_blank" rel="noopener noreferrer">
                  https://apidocs.flexport.com/v3/tag/Milestones#section/PurchaseOrder-Events
                </Link>
                . To integrate with our webhooks, follow these steps.
              </SectionDescription>
            </div>
            <Divider />
            <FieldRow>
              <EmptyStateText>No webhooks yet</EmptyStateText>
              <FieldControl>
                <Button
                  $variant="secondary"
                  onClick={() => {
                    // TODO: Implement creation flow
                    console.log('Create Webhook clicked');
                  }}
                >
                  + New webhook
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* API Keys Section */}
        <Card>
          <CardBody style={{ padding: 0 }}>
            <div style={{ padding: '14px 16px' }}>
              <SectionTitle>API Keys</SectionTitle>
              <SectionDescription>
                To create an API key, you will need an active client app account. The process is similar to creating API credentials.
              </SectionDescription>
            </div>
            <Divider />
            <FieldRow>
              <EmptyStateText>No API keys have been created yet</EmptyStateText>
              <FieldControl>
                <Button
                  $variant="secondary"
                  onClick={() => {
                    // TODO: Implement creation flow
                    console.log('Create API Key clicked');
                  }}
                >
                  + New API Key
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}
