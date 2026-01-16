import React, { useState, useRef } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Select, VStack, Button } from '@/ui/primitives';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoPreview = styled.div<{ $imageUrl?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: ${(p) => (p.$imageUrl ? `url(${p.$imageUrl})` : 'rgba(255,255,255,0.05)')};
  background-size: cover;
  background-position: center;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
  flex-shrink: 0;
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 9px 10px;
  outline: none;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: rgba(106,167,255,0.45);
    box-shadow: 0 0 0 4px rgba(106,167,255,0.14);
  }

  &::placeholder { color: var(--text-faint); }
`;

const DangerZoneTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255,92,122,0.95);
  margin-bottom: 4px;
`;

const DangerZoneHint = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-muted);
`;

export function AdminCompany() {
  const [companyName, setCompanyName] = useState('Flexport');
  const [logo, setLogo] = useState<string | null>(null);
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [dateFormat, setDateFormat] = useState('mm-dd-yyyy');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadData = () => {
    // Placeholder for download functionality
    console.log('Download data');
  };

  const handleDeleteAccount = () => {
    // Placeholder for delete account functionality
    console.log('Schedule outreach with AM to delete account');
  };

  return (
    <SettingsPageLayout title="Company" subtitle="Workspace-level configuration used across the organization.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Company name</FieldLabel>
                <FieldHint>Displayed across documents and exports</FieldHint>
              </div>
              <FieldControl>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} aria-label="Company name" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Logo</FieldLabel>
                <FieldHint>Upload your company logo</FieldHint>
              </div>
              <FieldControl>
                <LogoContainer>
                  <LogoPreview $imageUrl={logo || undefined}>
                    {!logo && 'Logo'}
                  </LogoPreview>
                  <ButtonContainer>
                    <VStack $gap={8}>
                      <Button $variant="secondary" onClick={handleLogoClick} type="button" style={{ width: '100px' }}>
                        {logo ? 'Change' : 'Upload'}
                      </Button>
                      {logo && (
                        <Button 
                          $variant="secondary" 
                          onClick={() => setLogo(null)} 
                          type="button"
                          style={{ fontSize: 12, padding: '4px 8px' }}
                        >
                          Remove
                        </Button>
                      )}
                    </VStack>
                    <FileInput
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      aria-label="Logo upload"
                    />
                  </ButtonContainer>
                </LogoContainer>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Website</FieldLabel>
                <FieldHint>Your company website URL</FieldHint>
              </div>
              <FieldControl>
                <Input 
                  type="url"
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)} 
                  placeholder="https://example.com"
                  aria-label="Website" 
                />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Address</FieldLabel>
                <FieldHint>Primary legal entity address</FieldHint>
              </div>
              <FieldControl>
                <Textarea 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Enter address"
                  aria-label="Address" 
                />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Timezone</FieldLabel>
                <FieldHint>The default is inherited from the primary legal entity location</FieldHint>
              </div>
              <FieldControl>
                <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} aria-label="Timezone">
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Date format</FieldLabel>
                <FieldHint>The default is inherited from the primary legal entity location and what is customary there</FieldHint>
              </div>
              <FieldControl>
                <Select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} aria-label="Date format">
                  <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                  <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </Select>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <DangerZoneTitle>Delete account</DangerZoneTitle>
                <DangerZoneHint>Schedule outreach with AM to permanently delete your account.</DangerZoneHint>
              </div>
              <FieldControl>
                <Button $variant="danger" onClick={handleDeleteAccount} type="button">
                  Delete account
                </Button>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Download your data</FieldLabel>
                <FieldHint>Download a copy of your account data</FieldHint>
              </div>
              <FieldControl>
                <Button $variant="secondary" onClick={handleDownloadData} type="button">
                  Download
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

