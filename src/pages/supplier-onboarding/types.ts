// ============================================================================
// Supplier Onboarding Types
// ============================================================================

export interface InviteData {
  token: string;
  clientCompanyName: string;
  inviterFirstName: string;
  inviterLastName: string;
  inviterEmail: string;
  supplierCompanyName: string;
  supplierContactEmail: string;
  supplierContactFirstName?: string;
  supplierContactLastName?: string;
  suggestedCountry: string;
  preferredLanguage: string;
}

export interface CompanyFormData {
  companyNameEnglish: string;
  companyNameLocal: string;
  businessRegistrationNumber: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  defaultLanguage: string;
  defaultTimezone: string;
  companyPhoneCountryCode: string;
  companyPhone: string;
  primaryContactEmail: string;
  relationshipType: string;
}

export interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  preferredLanguage: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string;
}

// ============================================================================
// Constants
// ============================================================================

export const countries = [
  { value: 'cn', label: 'China' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'th', label: 'Thailand' },
  { value: 'tw', label: 'Taiwan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'jp', label: 'Japan' },
];

export const countryCodes = [
  { value: '+86', label: '+86', country: 'cn' },
  { value: '+84', label: '+84', country: 'vn' },
  { value: '+1', label: '+1', country: 'us' },
  { value: '+52', label: '+52', country: 'mx' },
  { value: '+49', label: '+49', country: 'de' },
  { value: '+91', label: '+91', country: 'in' },
  { value: '+66', label: '+66', country: 'th' },
  { value: '+886', label: '+886', country: 'tw' },
  { value: '+82', label: '+82', country: 'kr' },
  { value: '+81', label: '+81', country: 'jp' },
];

// Helper to get default country code based on country
export function getDefaultCountryCode(countryCode: string): string {
  const countryToCode: Record<string, string> = {
    cn: '+86',
    vn: '+84',
    us: '+1',
    mx: '+52',
    de: '+49',
    in: '+91',
    th: '+66',
    tw: '+886',
    kr: '+82',
    jp: '+81',
  };
  return countryToCode[countryCode] || '+1';
}

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文 (Chinese)' },
  { value: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { value: 'es', label: 'Español (Spanish)' },
  { value: 'de', label: 'Deutsch (German)' },
  { value: 'ja', label: '日本語 (Japanese)' },
  { value: 'ko', label: '한국어 (Korean)' },
];

export const entityRoles = [
  { value: 'shipper', label: 'Shipper' },
  { value: 'consignee', label: 'Consignee' },
  { value: 'notify_party', label: 'Notify Party' },
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'trading_company', label: 'Trading Company' },
  { value: 'freight_forwarder', label: 'Freight Forwarder' },
];

export const relationshipTypes = [
  { value: 'supplier', label: 'Supplier' },
  { value: 'customer', label: 'Customer' },
  { value: 'partner', label: 'Partner' },
  { value: 'agent', label: 'Agent' },
  { value: 'carrier', label: 'Carrier' },
  { value: 'other', label: 'Other' },
];

export const timezones = [
  { value: 'Asia/Shanghai', label: '(UTC+8) China Standard Time' },
  { value: 'Asia/Ho_Chi_Minh', label: '(UTC+7) Vietnam Time' },
  { value: 'America/New_York', label: '(UTC-5) Eastern Time' },
  { value: 'America/Los_Angeles', label: '(UTC-8) Pacific Time' },
  { value: 'America/Mexico_City', label: '(UTC-6) Central Time (Mexico)' },
  { value: 'Europe/Berlin', label: '(UTC+1) Central European Time' },
  { value: 'Asia/Kolkata', label: '(UTC+5:30) India Standard Time' },
  { value: 'Asia/Bangkok', label: '(UTC+7) Thailand Time' },
  { value: 'Asia/Taipei', label: '(UTC+8) Taiwan Time' },
  { value: 'Asia/Seoul', label: '(UTC+9) Korea Standard Time' },
  { value: 'Asia/Tokyo', label: '(UTC+9) Japan Standard Time' },
];

// Helper to get default timezone based on country
export function getDefaultTimezone(countryCode: string): string {
  const countryTimezones: Record<string, string> = {
    cn: 'Asia/Shanghai',
    vn: 'Asia/Ho_Chi_Minh',
    us: 'America/New_York',
    mx: 'America/Mexico_City',
    de: 'Europe/Berlin',
    in: 'Asia/Kolkata',
    th: 'Asia/Bangkok',
    tw: 'Asia/Taipei',
    kr: 'Asia/Seoul',
    jp: 'Asia/Tokyo',
  };
  return countryTimezones[countryCode] || 'America/New_York';
}

// Helper to get default language based on country
export function getDefaultLanguage(countryCode: string): string {
  const countryLanguages: Record<string, string> = {
    cn: 'zh',
    vn: 'vi',
    us: 'en',
    mx: 'es',
    de: 'de',
    in: 'en',
    th: 'en',
    tw: 'zh',
    kr: 'ko',
    jp: 'ja',
  };
  return countryLanguages[countryCode] || 'en';
}

// ============================================================================
// Mock Invite Service
// ============================================================================

const mockInviteData: Record<string, InviteData> = {
  'demo-token': {
    token: 'demo-token',
    clientCompanyName: 'Acme Global Trading Co.',
    inviterFirstName: 'Steven',
    inviterLastName: 'Brand',
    inviterEmail: 'steven.brand@acmeglobal.com',
    supplierCompanyName: 'Shanghai Electronics Ltd.',
    supplierContactEmail: 'contact@shanghai-electronics.cn',
    supplierContactFirstName: 'Wei',
    supplierContactLastName: 'Zhang',
    suggestedCountry: 'cn',
    preferredLanguage: 'zh',
  },
  'test-token': {
    token: 'test-token',
    clientCompanyName: 'TechCorp Industries',
    inviterFirstName: 'Sarah',
    inviterLastName: 'Chen',
    inviterEmail: 'sarah.chen@techcorp.com',
    supplierCompanyName: 'Vietnam Manufacturing Co.',
    supplierContactEmail: 'sales@vnmanufacturing.vn',
    supplierContactFirstName: 'Minh',
    supplierContactLastName: 'Nguyen',
    suggestedCountry: 'vn',
    preferredLanguage: 'vi',
  },
};

export function getInviteByToken(token: string): InviteData | null {
  return mockInviteData[token] || null;
}

// Simulate duplicate detection - emails containing "existing" trigger duplicate flow
export function checkForDuplicate(email: string): { isDuplicate: boolean; type: 'email' | 'company' | null } {
  if (email.includes('existing')) {
    return { isDuplicate: true, type: 'email' };
  }
  return { isDuplicate: false, type: null };
}

// ============================================================================
// Address Parsing Utility
// ============================================================================

export interface ParsedAddress {
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

/**
 * Attempts to parse a full address string into components.
 * This is a simple heuristic parser - in production you'd use a geocoding API.
 */
export function parseAddress(fullAddress: string): Partial<ParsedAddress> {
  const result: Partial<ParsedAddress> = {};
  
  if (!fullAddress.trim()) return result;
  
  // Split by commas
  const parts = fullAddress.split(',').map(p => p.trim()).filter(Boolean);
  
  if (parts.length === 0) return result;
  
  // Try to identify country (last part often)
  const countryMap: Record<string, string> = {
    'china': 'cn',
    'cn': 'cn',
    'vietnam': 'vn',
    'vn': 'vn',
    'united states': 'us',
    'usa': 'us',
    'us': 'us',
    'mexico': 'mx',
    'mx': 'mx',
    'germany': 'de',
    'de': 'de',
    'india': 'in',
    'in': 'in',
    'thailand': 'th',
    'th': 'th',
    'taiwan': 'tw',
    'tw': 'tw',
    'south korea': 'kr',
    'korea': 'kr',
    'kr': 'kr',
    'japan': 'jp',
    'jp': 'jp',
  };
  
  // Check last part for country
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1].toLowerCase();
    for (const [key, value] of Object.entries(countryMap)) {
      if (lastPart.includes(key)) {
        result.country = value;
        parts.pop(); // Remove country from parts
        break;
      }
    }
  }
  
  // Try to extract postal code (numbers at end of a part)
  for (let i = parts.length - 1; i >= 0; i--) {
    const postalMatch = parts[i].match(/\b(\d{5,6})\b/);
    if (postalMatch) {
      result.postalCode = postalMatch[1];
      parts[i] = parts[i].replace(postalMatch[0], '').trim();
      if (!parts[i]) parts.splice(i, 1);
      break;
    }
  }
  
  // Assign remaining parts
  if (parts.length >= 1) {
    result.streetAddress1 = parts[0];
  }
  if (parts.length >= 2) {
    // Check if second part looks like a district/area (common in Asian addresses)
    const secondPart = parts[1];
    if (secondPart.toLowerCase().includes('district') || 
        secondPart.toLowerCase().includes('area') ||
        secondPart.toLowerCase().includes('road') ||
        secondPart.toLowerCase().includes('street')) {
      result.streetAddress2 = secondPart;
      if (parts.length >= 3) {
        result.city = parts[2];
      }
      if (parts.length >= 4) {
        result.stateProvince = parts[3];
      }
    } else {
      result.city = parts[1];
      if (parts.length >= 3) {
        result.stateProvince = parts[2];
      }
    }
  }
  
  return result;
}

// ============================================================================
// Validation Utilities
// ============================================================================

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Basic international phone validation
  const phoneRegex = /^\+?[\d\s\-()]{8,}$/;
  return phoneRegex.test(phone);
}

export function getPasswordStrength(password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('At least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('At least 1 uppercase letter');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('At least 1 symbol');
  }

  return { valid: errors.length === 0, errors };
}
