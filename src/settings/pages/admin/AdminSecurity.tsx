import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  FieldControl,
  FieldHint,
  FieldLabel,
  FieldRow,
  Select,
  Toggle,
  VStack,
} from '@/ui/primitives';

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const DomainEntry = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-top: 12px;
`;

const DomainIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
`;

const DomainInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DomainName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
`;

const DomainTimestamp = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.60);
`;

const DomainActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: rgba(255, 255, 255, 0.76);
  cursor: pointer;
  font-size: 16px;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.88);
  }
`;

const AvailabilityStatus = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.60);
  margin-top: 4px;
`;

const Link = styled.a`
  color: rgba(106, 167, 255, 0.88);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export function AdminSecurity() {
  const [apiKeyCreation, setApiKeyCreation] = useState('all-members');
  const [modifyAgentGuidance, setModifyAgentGuidance] = useState('all-members');
  const [googleAuth, setGoogleAuth] = useState(true);
  const [emailPasskeyAuth, setEmailPasskeyAuth] = useState(true);
  const [improveAIFeatures, setImproveAIFeatures] = useState(false);

  const approvedDomains = [
    { domain: 'flexport.com', addedDate: 'Feb 14, 2020' },
  ];

  return (
    <SettingsPageLayout title="Security">
      <VStack $gap={14}>
        {/* Workspace access */}
        <Card>
          <CardHeader>
            <CardTitle>Workspace access</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <div style={{ padding: '12px 16px' }}>
              <FieldLabel style={{ marginBottom: 8 }}>Approved email domains</FieldLabel>
              <FieldHint style={{ marginBottom: 0 }}>
                Anyone with an email address at these domains is allowed to sign up for this workspace.{' '}
                <Link href="#" onClick={(e) => e.preventDefault()}>
                  Docs
                </Link>
              </FieldHint>
              <div style={{ marginTop: 16 }}>
                <SectionTitle>{approvedDomains.length} approved email domain</SectionTitle>
                {approvedDomains.map((item, index) => (
                  <DomainEntry key={index}>
                    <DomainIcon>@</DomainIcon>
                    <DomainInfo>
                      <DomainName>{item.domain}</DomainName>
                      <DomainTimestamp>Added {item.addedDate}</DomainTimestamp>
                    </DomainInfo>
                    <DomainActions>
                      <IconButton aria-label="Add domain">+</IconButton>
                      <IconButton aria-label="More options">⋯</IconButton>
                    </DomainActions>
                  </DomainEntry>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Workspace restrictions */}
        <Card>
          <CardHeader>
            <CardTitle>Workspace restrictions</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>New user invitations</FieldLabel>
                <FieldHint>Who can invite new members to the workspace</FieldHint>
                <AvailabilityStatus>Available on Basic</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Basic')}>
                  Upgrade to Basic
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>New team creation</FieldLabel>
                <FieldHint>Who can create new teams</FieldHint>
                <AvailabilityStatus>Available on Business</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Business')}>
                  Upgrade to Business
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Manage workspace labels</FieldLabel>
                <FieldHint>Who can create, update, and delete workspace labels</FieldHint>
                <AvailabilityStatus>Available on Business</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Business')}>
                  Upgrade to Business
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Manage workspace templates</FieldLabel>
                <FieldHint>Who can create, update, and delete workspace templates</FieldHint>
                <AvailabilityStatus>Available on Business</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Business')}>
                  Upgrade to Business
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>API key creation</FieldLabel>
                <FieldHint>Who can create API keys to interact with the Linear API on their behalf</FieldHint>
              </div>
              <FieldControl>
                <Select
                  value={apiKeyCreation}
                  onChange={(e) => setApiKeyCreation(e.target.value)}
                  aria-label="API key creation"
                >
                  <option value="all-members">All members</option>
                  <option value="admins-only">Admins only</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Modify agent guidance</FieldLabel>
                <FieldHint>Who can modify workspace-level agent guidance prompts</FieldHint>
              </div>
              <FieldControl>
                <Select
                  value={modifyAgentGuidance}
                  onChange={(e) => setModifyAgentGuidance(e.target.value)}
                  aria-label="Modify agent guidance"
                >
                  <option value="all-members">All members</option>
                  <option value="admins-only">Admins only</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Restrict file uploads</FieldLabel>
                <FieldHint>Only allow specific file types to be uploaded</FieldHint>
                <AvailabilityStatus>Available on Enterprise</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Enterprise')}>
                  Upgrade to Enterprise
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* Authentication methods */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication methods</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <div style={{ padding: '12px 16px' }}>
              <FieldHint style={{ marginBottom: 0 }}>
                Admins can always authenticate via Google and email/passkeys — even when disabled for members.
              </FieldHint>
            </div>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Google authentication</FieldLabel>
                <FieldHint>When enabled, this is available to all workspace members and guests</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={googleAuth} onChange={setGoogleAuth} aria-label="Google authentication" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Email & passkey authentication</FieldLabel>
                <FieldHint>When enabled, this is available to all workspace members and guests</FieldHint>
              </div>
              <FieldControl>
                <Toggle
                  checked={emailPasskeyAuth}
                  onChange={setEmailPasskeyAuth}
                  aria-label="Email & passkey authentication"
                />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>SAML & SCIM</FieldLabel>
                <FieldHint>Manage logins via an identity provider's SSO</FieldHint>
                <AvailabilityStatus>Available on Enterprise</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Enterprise')}>
                  Upgrade to Enterprise
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* Integrations & applications */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations & applications</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Review third-party applications</FieldLabel>
                <FieldHint>
                  Control which applications can be installed to your workspace.{' '}
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    Docs
                  </Link>
                </FieldHint>
                <AvailabilityStatus>Available on Enterprise</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Enterprise')}>
                  Upgrade to Enterprise
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Reduce personal information from support integrations</FieldLabel>
                <FieldHint>Personal information from support integrations won't be stored</FieldHint>
                <AvailabilityStatus>Available on Enterprise</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Enterprise')}>
                  Upgrade to Enterprise
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Prevent guests from interacting with agents in the workspace</FieldLabel>
                <FieldHint>Restrict agent invocation to full workspace members only</FieldHint>
                <AvailabilityStatus>Available on Basic</AvailabilityStatus>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Basic')}>
                  Upgrade to Basic
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* Data collection */}
        <Card>
          <CardHeader>
            <CardTitle>Data collection</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Improve AI features by sharing usage data</FieldLabel>
                <FieldHint>
                  Feedback on AI results is used to enhance functionality and will not be used to train models
                </FieldHint>
              </div>
              <FieldControl>
                <Toggle
                  checked={improveAIFeatures}
                  onChange={setImproveAIFeatures}
                  aria-label="Improve AI features by sharing usage data"
                />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>HIPAA compliance</FieldLabel>
                <FieldHint>
                  Enable privacy and security measures to ensure that Protected Health Information (PHI) is appropriately
                  safeguarded
                </FieldHint>
              </div>
              <FieldControl>
                <Button $variant="ghost" onClick={() => console.log('Upgrade to Enterprise')}>
                  Upgrade to Enterprise
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}
