import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Modal, VStack, Tag } from '@/ui/primitives';
import { invitationService } from '../services/invitationService';
import { personService, organizationService } from '../services/entityService';
import type { Person, Organization } from '../types';

interface InviteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultOrganizationId?: string;
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

const ShareOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

const ShareOptionItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: rgba(255,255,255,0.88);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255,255,255,0.05);
  }

  &:active {
    background: rgba(255,255,255,0.08);
  }
`;

const ShareOptionIcon = styled.span`
  font-size: 16px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function InviteContactModal({
  isOpen,
  onClose,
  onSuccess,
  defaultOrganizationId,
}: InviteContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailPills, setEmailPills] = useState<EmailPill[]>([]);
  const [existingContacts, setExistingContacts] = useState<Person[]>([]);
  const [existingOrgs, setExistingOrgs] = useState<Organization[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadExistingData();
      // Generate invite link
      const link = `${window.location.origin}/invite/${Date.now()}`;
      setInviteLink(link);
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
    if (validPills.length === 0) return;

    setLoading(true);
    try {
      // Send invitations for each valid email
      for (const pill of validPills) {
        // Parse name if available (format: "First Last")
        let firstName = '';
        let lastName = '';
        if (pill.name) {
          const nameParts = pill.name.trim().split(' ');
          firstName = nameParts[0] || '';
          lastName = nameParts.slice(1).join(' ') || '';
        } else {
          // Use email prefix as placeholder name
          const emailPrefix = pill.email.split('@')[0];
          firstName = emailPrefix;
        }

        // Create a new contact with invite sent flag
        const newPerson = await personService.create({
          firstName,
          lastName,
          email: pill.email,
          organizationId: defaultOrganizationId || undefined,
          matchStatus: 'unlinked',
          verificationStatus: 'unverified',
          inviteSentAt: new Date().toISOString(),
        });
        
        await invitationService.create({
          entityType: 'person',
          entityId: newPerson.id,
          invitationType: 'join',
          invitedEmail: pill.email,
          status: 'pending',
          nameHint: pill.name,
          suggestedOrganizationId: defaultOrganizationId || undefined,
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
    setEmailInput('');
    setEmailPills([]);
    setLoading(false);
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert('Invite link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleEmailClient = () => {
    const subject = encodeURIComponent('Invitation to join network');
    const body = encodeURIComponent(`You've been invited to join our network. Click here to accept: ${inviteLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleTextMessage = () => {
    const message = encodeURIComponent(`You've been invited to join our network. Click here to accept: ${inviteLink}`);
    window.location.href = `sms:?body=${message}`;
  };

  const handleWeChat = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied! Please paste it in WeChat to share.');
  };

  const canSubmit = useMemo(() => {
    const validPills = emailPills.filter(pill => pill.isValid);
    return validPills.length > 0;
  }, [emailPills]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite"
      footer={
        <>
          <Button $variant="ghost" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button $variant="primary" onClick={handleSubmit} disabled={loading || !canSubmit}>
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </>
      }
    >
      <VStack $gap={16}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Invite someone to join your network. They will receive an email to provide their information and choose or create an organization.
        </div>

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

        {/* Share options vertical list */}
        <ShareOptionsList>
          <ShareOptionItem onClick={handleCopyLink}>
            <ShareOptionIcon>🔗</ShareOptionIcon>
            <span>Copy link</span>
          </ShareOptionItem>
          <ShareOptionItem onClick={handleEmailClient}>
            <ShareOptionIcon>✉️</ShareOptionIcon>
            <span>Email client</span>
          </ShareOptionItem>
          <ShareOptionItem onClick={handleTextMessage}>
            <ShareOptionIcon>💬</ShareOptionIcon>
            <span>Text message</span>
          </ShareOptionItem>
          <ShareOptionItem onClick={handleWeChat}>
            <ShareOptionIcon>💬</ShareOptionIcon>
            <span>WeChat message</span>
          </ShareOptionItem>
        </ShareOptionsList>
      </VStack>
    </Modal>
  );
}
