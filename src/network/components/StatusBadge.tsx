import React from 'react';
import { Tag } from '@/ui/primitives';
import type { MatchStatus, VerificationStatus, ConnectionStatus } from '../types';

interface StatusBadgeProps {
  type: 'match' | 'verification' | 'connection';
  status: MatchStatus | VerificationStatus | ConnectionStatus;
}

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const getLabel = () => {
    switch (status) {
      case 'matched':
        return 'Matched';
      case 'unlinked':
        return 'Unlinked';
      case 'needs_review':
        return 'Needs Review';
      case 'verified':
        return 'Verified';
      case 'unverified':
        return 'Unverified';
      case 'connected':
        return 'Connected';
      case 'pending_invite':
        return 'Pending Invite';
      case 'not_connected':
        return 'Not Connected';
      default:
        return String(status);
    }
  };

  const getTone = (): 'neutral' | 'accent' | 'danger' | 'success' | 'warning' => {
    if (status === 'matched' || status === 'verified' || status === 'connected') {
      return 'success';
    }
    if (status === 'needs_review' || status === 'pending_invite') {
      return 'warning';
    }
    if (status === 'unlinked' || status === 'unverified' || status === 'not_connected') {
      return 'neutral';
    }
    return 'neutral';
  };

  return <Tag tone={getTone()}>{getLabel()}</Tag>;
}
