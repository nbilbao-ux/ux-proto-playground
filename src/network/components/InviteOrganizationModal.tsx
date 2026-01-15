import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Button, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Modal, Select, VStack, Tag } from '@/ui/primitives';
import { invitationService } from '../services/invitationService';
import { personService } from '../services/entityService';
import { organizationService } from '../services/entityService';
import type { Person, Organization } from '../types';

interface InviteOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface EmailPill {
  email: string;
  name?: string; // Name if contact is known
  isValid: boolean;
  isKnown: boolean;
}

const CompoundInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  min-height: 40px;

  &:focus-within {
    border-color: rgba(106,167,255,0.45);
    box-shadow: 0 0 0 4px rgba(106,167,255,0.14);
  }
`;

const PillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  align-items: center;
`;

const EmailPill = styled(Tag)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  padding: 4px 8px;
`;

const RemovePillButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  font-size: 14px;
  line-height: 1;
  opacity: 0.7;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 1;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  color: rgba(255,255,255,0.88);
  padding: 0;

  &::placeholder {
    color: var(--text-faint);
  }
`;

const AccordionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.88);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;

  &:hover {
    color: rgba(106,167,255,0.95);
  }

  &:focus {
    outline: none;
  }
`;

const AccordionIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 16px;
  transition: transform 0.2s;
  transform: rotate(${(p) => (p.$isOpen ? '180deg' : '0deg')});
  display: inline-block;
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${(p) => (p.$isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

// Common countries list
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CN', name: 'China' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'MX', name: 'Mexico' },
  { code: 'DK', name: 'Denmark' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'TH', name: 'Thailand' },
  { code: 'ID', name: 'Indonesia' },
];

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function InviteOrganizationModal({
  isOpen,
  onClose,
  onSuccess,
}: InviteOrganizationModalProps) {
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [orgName, setOrgName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailPills, setEmailPills] = useState<EmailPill[]>([]);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  const [existingContacts, setExistingContacts] = useState<Person[]>([]);
  const [existingOrgs, setExistingOrgs] = useState<Organization[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadExistingData();
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const loadExistingData = async () => {
    try {
      const [contacts, orgs] = await Promise.all([
        personService.getAll(),
        organizationService.getAll(),
      ]);
      setExistingContacts(contacts);
      setExistingOrgs(orgs);
    } catch (error) {
      console.error('Failed to load existing data:', error);
    }
  };

  // Check if email belongs to a known contact
  const findKnownContact = (email: string): Person | null => {
    const emailLower = email.toLowerCase().trim();
    return existingContacts.find(
      contact => contact.email?.toLowerCase() === emailLower
    ) || null;
  };

  // Check if email domain matches existing organization
  const findKnownOrganization = (email: string): Organization | null => {
    const emailLower = email.toLowerCase().trim();
    const domain = emailLower.split('@')[1];
    if (!domain) return null;
    
    return existingOrgs.find(
      org => org.domain?.toLowerCase() === domain
    ) || null;
  };

  const handleEmailInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddEmail();
    } else if (e.key === 'Backspace' && emailInput === '' && emailPills.length > 0) {
      // Remove last pill if input is empty and backspace is pressed
      handleRemoveEmail(emailPills[emailPills.length - 1].email);
    }
  };

  const handleAddEmail = () => {
    const trimmed = emailInput.trim();
    if (!trimmed) return;

    // Check if already added
    if (emailPills.some(pill => pill.email.toLowerCase() === trimmed.toLowerCase())) {
      setEmailInput('');
      return;
    }

    // Validate email format
    if (!isValidEmail(trimmed)) {
      // Still add but mark as invalid
      const newPill: EmailPill = {
        email: trimmed,
        isValid: false,
        isKnown: false,
      };
      setEmailPills([...emailPills, newPill]);
      setEmailInput('');
      return;
    }

    // Check if contact is known
    const knownContact = findKnownContact(trimmed);
    const knownOrg = findKnownOrganization(trimmed);
    
    const newPill: EmailPill = {
      email: trimmed,
      name: knownContact ? `${knownContact.firstName} ${knownContact.lastName}` : undefined,
      isValid: true,
      isKnown: !!knownContact || !!knownOrg,
    };

    setEmailPills([...emailPills, newPill]);
    setEmailInput('');
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailPills(emailPills.filter(pill => pill.email !== emailToRemove));
  };

  const handleSubmit = async () => {
    const validPills = emailPills.filter(pill => pill.isValid);
    if (!orgName.trim() || validPills.length === 0) return;

    setLoading(true);
    try {
      // Create organization with known details
      const createdOrg = await organizationService.create({
        name: orgName,
        address: (address && country) ? {
          id: `loc_${Date.now()}`,
          addressLine1: address,
          city: '',
          country: country,
        } : undefined,
        tags: [],
        matchStatus: 'unlinked',
        verificationStatus: 'unverified',
        connectionStatus: 'not_connected',
      });
      
      // Note: Phone number would typically be stored with contacts, not the organization itself
      // In a real system, you might store this as metadata or with the first contact

      // Send invitations for each valid email, linked to the actual organization ID
      const validPills = emailPills.filter(pill => pill.isValid);
      for (const pill of validPills) {
        await invitationService.create({
          entityType: 'organization',
          entityId: createdOrg.id,
          invitationType: 'join',
          invitedEmail: pill.email,
          status: 'pending',
          nameHint: pill.name,
        });
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Failed to send invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOrgName('');
    setEmailInput('');
    setEmailPills([]);
    setCountry('');
    setAddress('');
    setPhoneNumber('');
    setShowDetails(false);
    setLoading(false);
    onClose();
  };

  const canSubmit = useMemo(() => {
    const validPills = emailPills.filter(pill => pill.isValid);
    return orgName.trim().length > 0 && validPills.length > 0;
  }, [orgName, emailPills]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite Organization"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading || !canSubmit}>
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </>
      }
    >
      <VStack gap={16}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Invite an organization to join your network. They will receive an email to provide their organization details and create their entity.
        </div>

        <FieldRow>
          <div>
            <FieldLabel>Org name *</FieldLabel>
            <FieldHint>Organization name</FieldHint>
          </div>
          <FieldControl>
            <Input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Acme Corp"
              aria-label="Organization name"
            />
          </FieldControl>
        </FieldRow>

        <FieldRow>
          <div>
            <FieldLabel>Contacts *</FieldLabel>
            <FieldHint>Enter email addresses for contacts</FieldHint>
          </div>
          <FieldControl>
            <CompoundInputContainer>
              <PillsContainer>
                {emailPills.map((pill) => (
                  <EmailPill
                    key={pill.email}
                    tone={pill.isValid ? (pill.isKnown ? 'success' : 'neutral') : 'danger'}
                  >
                    {pill.name || pill.email}
                    <RemovePillButton
                      onClick={() => handleRemoveEmail(pill.email)}
                      aria-label={`Remove ${pill.email}`}
                    >
                      ×
                    </RemovePillButton>
                  </EmailPill>
                ))}
                <EmailInput
                  ref={inputRef}
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={handleEmailInputKeyDown}
                  onBlur={handleAddEmail}
                  placeholder={emailPills.length === 0 ? "Enter email address..." : ""}
                  aria-label="Email address input"
                />
              </PillsContainer>
            </CompoundInputContainer>
          </FieldControl>
        </FieldRow>

        <div style={{ marginTop: 8 }}>
          <AccordionButton
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            aria-expanded={showDetails}
          >
            <span>Add more details</span>
            <AccordionIcon $isOpen={showDetails}>▼</AccordionIcon>
          </AccordionButton>
          <AccordionContent $isOpen={showDetails}>
            <VStack gap={12} style={{ paddingTop: 8 }}>
              <FieldRow>
                <div>
                  <FieldLabel>Country</FieldLabel>
                  <FieldHint>Organization country</FieldHint>
                </div>
                <FieldControl>
                  <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    aria-label="Country"
                  >
                    <option value="">Select country...</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </FieldControl>
              </FieldRow>

              <FieldRow>
                <div>
                  <FieldLabel>Address</FieldLabel>
                  <FieldHint>Organization address</FieldHint>
                </div>
                <FieldControl>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State"
                    aria-label="Address"
                  />
                </FieldControl>
              </FieldRow>

              <FieldRow>
                <div>
                  <FieldLabel>Phone number</FieldLabel>
                  <FieldHint>Organization phone number</FieldHint>
                </div>
                <FieldControl>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 234 567 8900"
                    aria-label="Phone number"
                  />
                </FieldControl>
              </FieldRow>
            </VStack>
          </AccordionContent>
        </div>
      </VStack>
    </Modal>
  );
}
