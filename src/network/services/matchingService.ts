// Mock Matching Service
// Provides deterministic matching results for prototype

import type { MatchCandidate, AddressCandidate, Organization, Person } from '../types';

// Simulate async delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Match an organization against the Global Network
 */
export async function matchOrganization(
  input: {
    name: string;
    domain?: string;
    governmentIds?: { type: string; value: string }[];
    address?: { city?: string; country?: string };
  }
): Promise<MatchCandidate[]> {
  await delay(800); // Simulate API call

  const candidates: MatchCandidate[] = [];
  const nameLower = input.name.toLowerCase();

  // Deterministic matching logic based on input patterns
  if (nameLower.includes('shenzhen') || nameLower.includes('textile')) {
    candidates.push({
      globalEntityId: 'global_org_001',
      name: 'Shenzhen Textiles Co., Ltd.',
      confidence: 92,
      hasAccount: true,
      details: { domain: 'shenzhentextiles.com', country: 'CN' },
    });
  }

  if (nameLower.includes('saigon') || nameLower.includes('footwear')) {
    candidates.push({
      globalEntityId: 'global_org_002',
      name: 'Saigon Footwear Ltd.',
      confidence: 88,
      hasAccount: false,
      details: { country: 'VN' },
    });
  }

  if (nameLower.includes('monterrey') || nameLower.includes('component')) {
    candidates.push({
      globalEntityId: 'global_org_003',
      name: 'Monterrey Components S.A.',
      confidence: 85,
      hasAccount: true,
      details: { domain: 'monterreycomp.com', country: 'MX' },
    });
  }

  // Generic matching for common patterns
  if (nameLower.includes('maersk')) {
    candidates.push({
      globalEntityId: 'global_org_004',
      name: 'Maersk Line',
      confidence: 95,
      hasAccount: true,
      details: { domain: 'maersk.com', country: 'DK' },
    });
  }

  if (nameLower.includes('cma') || nameLower.includes('cgm')) {
    candidates.push({
      globalEntityId: 'global_org_005',
      name: 'CMA CGM',
      confidence: 93,
      hasAccount: true,
      details: { domain: 'cmacgm.com', country: 'FR' },
    });
  }

  // If domain matches, add high-confidence candidate
  if (input.domain) {
    const domainLower = input.domain.toLowerCase();
    if (!candidates.some(c => c.details?.domain?.toLowerCase() === domainLower)) {
      candidates.push({
        globalEntityId: `global_org_${Date.now()}`,
        name: input.name,
        confidence: 75,
        hasAccount: false,
        details: { domain: input.domain },
      });
    }
  }

  // If no matches found, return empty array (will create new entity)
  return candidates.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Match a contact/person by email
 */
export async function matchContact(
  input: { email: string; firstName?: string; lastName?: string }
): Promise<MatchCandidate[]> {
  await delay(600);

  const candidates: MatchCandidate[] = [];
  const emailLower = input.email.toLowerCase();

  // Deterministic matching based on email patterns
  if (emailLower.includes('john') || emailLower.includes('doe')) {
    candidates.push({
      globalEntityId: 'global_person_001',
      name: 'John Doe',
      confidence: 90,
      hasAccount: true,
      details: { email: input.email },
    });
  }

  if (emailLower.includes('jane') || emailLower.includes('smith')) {
    candidates.push({
      globalEntityId: 'global_person_002',
      name: 'Jane Smith',
      confidence: 88,
      hasAccount: false,
      details: { email: input.email },
    });
  }

  // Generic email domain matching
  if (emailLower.endsWith('@shenzhentextiles.com')) {
    candidates.push({
      globalEntityId: 'global_person_003',
      name: input.firstName && input.lastName ? `${input.firstName} ${input.lastName}` : 'Contact',
      confidence: 85,
      hasAccount: true,
      details: { email: input.email },
    });
  }

  return candidates.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Validate a government ID
 */
export async function validateGovernmentId(
  id: string,
  type: string
): Promise<{ valid: boolean; verified: boolean; metadata?: Record<string, any> }> {
  await delay(500);

  // Mock validation - in real system would check against government databases
  const valid = id.length >= 5 && /^[A-Z0-9-]+$/i.test(id);
  
  return {
    valid,
    verified: valid && id.length >= 8, // Longer IDs more likely to be verified
    metadata: valid ? { format: 'standard', country: 'US' } : undefined,
  };
}

/**
 * Validate and normalize an address, returning candidates
 */
export async function validateAddress(
  address: {
    addressLine1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }
): Promise<AddressCandidate[]> {
  await delay(700);

  const candidates: AddressCandidate[] = [];

  // If we have enough info, create normalized candidate
  if (address.addressLine1 && address.city && address.country) {
    const normalized = [
      address.addressLine1,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ]
      .filter(Boolean)
      .join(', ');

    candidates.push({
      normalizedAddress: normalized,
      physicalLocation: {
        id: `loc_${Date.now()}`,
        addressLine1: address.addressLine1!,
        city: address.city!,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country!,
        normalizedAddress: normalized,
        geocodeConfidence: 85,
        latitude: 34.0522, // Mock coordinates
        longitude: -118.2437,
      },
      confidence: address.postalCode ? 90 : 75,
    });
  }

  // If city/country match known locations, add high-confidence candidates
  if (address.city?.toLowerCase().includes('los angeles') || address.city?.toLowerCase() === 'la') {
    candidates.push({
      normalizedAddress: '123 Main St, Los Angeles, CA 90001, US',
      physicalLocation: {
        id: 'loc_la_001',
        addressLine1: address.addressLine1 || '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: address.postalCode || '90001',
        country: 'US',
        normalizedAddress: '123 Main St, Los Angeles, CA 90001, US',
        geocodeConfidence: 95,
        latitude: 34.0522,
        longitude: -118.2437,
      },
      confidence: 95,
    });
  }

  if (address.city?.toLowerCase().includes('shenzhen')) {
    candidates.push({
      normalizedAddress: '456 Industrial Ave, Shenzhen, Guangdong, 518000, CN',
      physicalLocation: {
        id: 'loc_sz_001',
        addressLine1: address.addressLine1 || '456 Industrial Ave',
        city: 'Shenzhen',
        state: 'Guangdong',
        postalCode: address.postalCode || '518000',
        country: 'CN',
        normalizedAddress: '456 Industrial Ave, Shenzhen, Guangdong, 518000, CN',
        geocodeConfidence: 92,
        latitude: 22.5431,
        longitude: 114.0579,
      },
      confidence: 92,
    });
  }

  return candidates.sort((a, b) => b.confidence - a.confidence);
}
