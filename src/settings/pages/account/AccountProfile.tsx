import React, { useState, useRef } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Select, Button, HStack, VStack } from '@/ui/primitives';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarPreview = styled.div<{ $imageUrl?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${(p) => (p.$imageUrl ? `url(${p.$imageUrl})` : 'rgba(255,255,255,0.05)')};
  background-size: cover;
  background-position: center;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 24px;
  flex-shrink: 0;
`;

const FileInput = styled.input`
  display: none;
`;

export function AccountProfile() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    const first = firstName.charAt(0).toUpperCase();
    const last = lastName.charAt(0).toUpperCase();
    return first && last ? `${first}${last}` : first || last || '?';
  };

  return (
    <SettingsPageLayout 
      title="Personal Info" 
      subtitle="Control the settings and attributes of your account."
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardBody style={{ padding: 0 }}>
          <FieldRow>
            <div>
              <FieldLabel>Profile Picture</FieldLabel>
              <FieldHint>Upload a photo to personalize your account</FieldHint>
            </div>
            <FieldControl>
              <AvatarContainer>
                <AvatarPreview $imageUrl={profilePicture || undefined}>
                  {!profilePicture && getInitials()}
                </AvatarPreview>
                <VStack gap={8}>
                  <Button variant="ghost" onClick={handleAvatarClick} type="button">
                    {profilePicture ? 'Change' : 'Upload'}
                  </Button>
                  {profilePicture && (
                    <Button 
                      variant="ghost" 
                      onClick={() => setProfilePicture(null)} 
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
                  aria-label="Profile picture upload"
                />
              </AvatarContainer>
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>First name</FieldLabel>
              <FieldHint>Your given name</FieldHint>
            </div>
            <FieldControl>
              <Input 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="Enter first name"
                aria-label="First name" 
              />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Last name</FieldLabel>
              <FieldHint>Your family name</FieldHint>
            </div>
            <FieldControl>
              <Input 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Enter last name"
                aria-label="Last name" 
              />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Phone number</FieldLabel>
              <FieldHint>Your contact phone number</FieldHint>
            </div>
            <FieldControl>
              <Input 
                type="tel"
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                placeholder="+1 (555) 123-4567"
                aria-label="Phone number" 
              />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Email Address</FieldLabel>
              <FieldHint>Your primary email address</FieldHint>
            </div>
            <FieldControl>
              <Input 
                type="email"
                value={emailAddress} 
                onChange={(e) => setEmailAddress(e.target.value)} 
                placeholder="your.email@example.com"
                aria-label="Email address" 
              />
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Preferred Language</FieldLabel>
              <FieldHint>Select your preferred language for the interface</FieldHint>
            </div>
            <FieldControl>
              <Select 
                value={preferredLanguage} 
                onChange={(e) => setPreferredLanguage(e.target.value)} 
                aria-label="Preferred language"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="pt">Portuguese</option>
              </Select>
            </FieldControl>
          </FieldRow>
          <Divider />
          <FieldRow>
            <div>
              <FieldLabel>Title</FieldLabel>
              <FieldHint>Your job title or role</FieldHint>
            </div>
            <FieldControl>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Supply Chain Manager"
                aria-label="Title" 
              />
            </FieldControl>
          </FieldRow>
        </CardBody>
      </Card>
    </SettingsPageLayout>
  );
}

