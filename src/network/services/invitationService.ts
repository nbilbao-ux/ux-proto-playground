// Invitation Service

import type { Invitation, Organization } from '../types';

// Re-export Invitation type for convenience
export type { Invitation } from '../types';

let invitations: Invitation[] = [];

// Initialize with seed data
function initializeSeedData() {
  const now = new Date().toISOString();
  const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  invitations = [
    {
      id: 'inv_001',
      entityType: 'organization',
      entityId: 'org_002',
      invitationType: 'join',
      status: 'pending',
      invitedEmail: 'contact@saigonfootwear.vn',
      invitedAt: now,
      expiresAt: future,
    },
  ];
}

initializeSeedData();

export const invitationService = {
  async getAll(): Promise<Invitation[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...invitations];
  },

  async getById(id: string): Promise<Invitation | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return invitations.find(i => i.id === id) || null;
  },

  async getByEntityId(entityId: string, entityType: Invitation['entityType']): Promise<Invitation[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return invitations.filter(
      i => i.entityId === entityId && i.entityType === entityType
    );
  },

  async create(invitation: Omit<Invitation, 'id' | 'invitedAt' | 'status'> & { status?: 'pending' | 'accepted' | 'rejected' | 'cancelled' }): Promise<Invitation> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const newInvitation: Invitation = {
      ...invitation,
      id: `inv_${Date.now()}`,
      invitedAt: new Date().toISOString(),
      expiresAt,
      status: invitation.status || 'pending',
    };
    invitations.push(newInvitation);
    return newInvitation;
  },

  async update(id: string, updates: Partial<Invitation>): Promise<Invitation> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = invitations.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Invitation not found');
    invitations[index] = {
      ...invitations[index],
      ...updates,
      respondedAt: updates.status === 'accepted' || updates.status === 'rejected'
        ? new Date().toISOString()
        : invitations[index].respondedAt,
    };
    return invitations[index];
  },

  async cancel(id: string): Promise<Invitation> {
    return this.update(id, { status: 'cancelled' });
  },

  async resend(id: string): Promise<Invitation> {
    const inv = await this.getById(id);
    if (!inv) throw new Error('Invitation not found');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    return this.update(id, {
      status: 'pending',
      invitedAt: new Date().toISOString(),
      expiresAt,
    });
  },
};

/**
 * Check if an organization is eligible to receive an invitation
 */
export function canInviteToConnect(org: Organization): boolean {
  return (
    org.matchStatus === 'matched' &&
    org.matchedGlobalEntityHasAccount === true &&
    org.connectionStatus !== 'connected'
  );
}

/**
 * Check if an organization is eligible to be invited to join
 */
export function canInviteToJoin(org: Organization): boolean {
  return (
    org.matchStatus === 'matched' &&
    org.matchedGlobalEntityHasAccount === false &&
    org.connectionStatus !== 'connected'
  );
}

/**
 * Check if invitations are blocked for an organization
 */
export function isInviteBlocked(org: Organization): boolean {
  return org.matchStatus === 'needs_review' || org.matchStatus === 'unlinked';
}
