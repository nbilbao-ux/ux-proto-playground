// Network System Type Definitions

export type MatchStatus = 'unlinked' | 'matched' | 'needs_review';
export type VerificationStatus = 'verified' | 'unverified' | 'needs_review';
export type ConnectionStatus = 'connected' | 'pending_invite' | 'not_connected';

export type RelationshipType = 'supplier' | 'carrier' | 'partner' | 'client' | 'other';
export type RelationshipTag = 'preferred' | 'approved' | 'blocked';

export type FacilityType = 'warehouse' | 'distribution_center' | 'office' | 'yard' | 'terminal' | 'port';

export interface PhysicalLocation {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  normalizedAddress?: string;
  geocodeConfidence?: number;
}

export interface Port {
  id: string;
  unLocode: string; // UN/LOCODE format (e.g., "USLAX")
  name: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Organization {
  id: string;
  name: string;
  domain?: string;
  governmentIds?: {
    type: string; // e.g., "EIN", "VAT", "DUNS"
    value: string;
    verified: boolean;
  }[];
  address?: PhysicalLocation;
  relationshipType?: RelationshipType;
  tags: RelationshipTag[];
  
  // Status fields
  matchStatus: MatchStatus;
  verificationStatus: VerificationStatus;
  connectionStatus: ConnectionStatus;
  
  // Global Network reference
  matchedGlobalEntityId?: string;
  matchedGlobalEntityHasAccount?: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  organizationId?: string;
  title?: string;
  
  // Status fields
  matchStatus: MatchStatus;
  verificationStatus: VerificationStatus;
  
  // Invite tracking
  inviteSentAt?: string;
  
  // Global Network reference
  matchedGlobalEntityId?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  organizationId: string;
  physicalLocationId?: string;
  physicalLocation?: PhysicalLocation;
  portId?: string; // For port facilities
  port?: Port;
  
  // Ownership
  ownershipType: 'owned' | 'leased' | 'third_party';
  
  // Status fields
  matchStatus: MatchStatus;
  verificationStatus: VerificationStatus;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}


export interface TradeLanePreference {
  id: string;
  originPortId?: string;
  originPort?: Port;
  originFacilityId?: string;
  originLocation?: PhysicalLocation;
  destinationPortId?: string;
  destinationPort?: Port;
  destinationFacilityId?: string;
  destinationLocation?: PhysicalLocation;
  mode?: 'ocean' | 'air' | 'truck' | 'rail';
  frequency?: 'regular' | 'occasional' | 'one_time';
  organizationId?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface OrgRelationship {
  id: string;
  fromOrgId: string;
  toOrgId: string;
  relationshipType: RelationshipType;
  tags: RelationshipTag[];
  createdAt: string;
}

export interface Invitation {
  id: string;
  entityType: 'organization' | 'person' | 'facility';
  entityId: string;
  invitationType: 'connect' | 'join';
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  invitedEmail?: string;
  invitedAt: string;
  respondedAt?: string;
  expiresAt?: string;
  // Hints provided by inviter (optional)
  nameHint?: string;
  domainHint?: string;
  suggestedOrganizationId?: string;
  relationshipType?: string;
}

// Matching types
export interface MatchCandidate {
  globalEntityId: string;
  name: string;
  confidence: number; // 0-100
  hasAccount: boolean;
  details?: Record<string, any>;
}

export interface AddressCandidate {
  normalizedAddress: string;
  physicalLocation: PhysicalLocation;
  confidence: number; // 0-100
}
