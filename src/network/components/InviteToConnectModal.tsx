import React, { useState } from 'react';
import { Button, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Modal, VStack } from '@/ui/primitives';
import { invitationService } from '../services/invitationService';
import type { Organization } from '../types';

interface InviteToConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization;
  onSuccess: () => void;
}

export function InviteToConnectModal({
  isOpen,
  onClose,
  organization,
  onSuccess,
}: InviteToConnectModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;

    setLoading(true);
    try {
      await invitationService.create({
        entityType: 'organization',
        entityId: organization.id,
        invitationType: 'connect',
        invitedEmail: email,
        status: 'pending',
      });

      // Update organization connection status
      // In a real app, this would be done via the entity service
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Failed to send invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite to Connect"
      footer={
        <>
          <Button $variant="ghost" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button $variant="primary" onClick={handleSubmit} disabled={loading || !email.trim()}>
            {loading ? 'Sending...' : 'Send Invitation'}
          </Button>
        </>
      }
    >
      <VStack $gap={16}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Invite <strong>{organization.name}</strong> to connect their account. They will receive an email invitation to link accounts.
        </div>
        <FieldRow>
          <div>
            <FieldLabel>Email address *</FieldLabel>
            <FieldHint>Where to send the invitation</FieldHint>
          </div>
          <FieldControl>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@example.com"
              aria-label="Email address"
            />
          </FieldControl>
        </FieldRow>
      </VStack>
    </Modal>
  );
}
