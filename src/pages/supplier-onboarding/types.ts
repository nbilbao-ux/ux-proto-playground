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
  country: string;
  companyNameLocal: string;
  companyNameEnglish: string;
  businessRegistrationNumber: string;
  addressLocal: string;
  addressEnglish: string;
  entityRole: string;
}

export interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
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
