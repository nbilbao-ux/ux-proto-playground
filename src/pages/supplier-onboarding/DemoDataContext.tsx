import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AccountFormData, CompanyFormData, InviteData } from './types';

// ============================================================================
// Demo Data Constants
// ============================================================================

/**
 * Pre-populated demo data for the profile form.
 * Note: email is NOT included here - it comes from the invite data
 */
export const DEMO_PROFILE_DATA: Omit<AccountFormData, 'email'> = {
  firstName: 'Wei',
  lastName: 'Zhang',
  phoneCountryCode: '+86',
  phone: '138 1234 5678',
  preferredLanguage: 'zh',
  jobTitle: 'Export Manager',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!',
};

/**
 * Pre-populated demo data for the company form.
 * Note: primaryContactEmail is NOT included here - it comes from the invite data
 */
export const DEMO_COMPANY_DATA: Omit<CompanyFormData, 'primaryContactEmail'> = {
  companyNameEnglish: 'Shanghai Electronics Ltd.',
  companyNameLocal: '上海电子有限公司',
  businessRegistrationNumber: '91310115MA1K4XJX0X',
  streetAddress1: '1234 Innovation Road',
  streetAddress2: 'Pudong District',
  city: 'Shanghai',
  stateProvince: 'Shanghai',
  postalCode: '200120',
  country: 'cn',
  defaultLanguage: 'zh',
  defaultTimezone: 'Asia/Shanghai',
  companyPhoneCountryCode: '+86',
  companyPhone: '21 5888 8888',
  relationshipType: 'supplier',
};

// ============================================================================
// Context Types
// ============================================================================

type FormStep = 'profile' | 'company';

interface DemoDataContextValue {
  /** Whether demo data is currently loaded (for UI indicator) */
  isDemoDataLoaded: boolean;
  /** Load demo data into the current step's form */
  loadDemoData: (step: FormStep) => void;
  /** Reset the current step's form to empty state */
  resetData: (step: FormStep) => void;
  /** Get profile form data (with demo data if loaded for profile step) */
  getProfileFormData: (inviteData: InviteData) => AccountFormData;
  /** Get company form data (with demo data if loaded for company step) */
  getCompanyFormData: (inviteData: InviteData) => CompanyFormData;
  /** Update profile form data */
  setProfileFormData: (data: AccountFormData) => void;
  /** Update company form data */
  setCompanyFormData: (data: CompanyFormData) => void;
  /** Current profile form data */
  profileFormData: AccountFormData | null;
  /** Current company form data */
  companyFormData: CompanyFormData | null;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

// ============================================================================
// Provider Component
// ============================================================================

interface DemoDataProviderProps {
  children: ReactNode;
}

export function DemoDataProvider({ children }: DemoDataProviderProps) {
  // Track demo data loaded state per step
  const [profileDemoLoaded, setProfileDemoLoaded] = useState(false);
  const [companyDemoLoaded, setCompanyDemoLoaded] = useState(false);
  const [profileFormData, setProfileFormData] = useState<AccountFormData | null>(null);
  const [companyFormData, setCompanyFormData] = useState<CompanyFormData | null>(null);

  // For UI indicator - true if any step has demo data loaded
  const isDemoDataLoaded = profileDemoLoaded || companyDemoLoaded;

  const loadDemoData = useCallback((step: FormStep) => {
    if (step === 'profile') {
      setProfileDemoLoaded(true);
    } else if (step === 'company') {
      setCompanyDemoLoaded(true);
    }
  }, []);

  const resetData = useCallback((step: FormStep) => {
    if (step === 'profile') {
      setProfileDemoLoaded(false);
      setProfileFormData(null);
    } else if (step === 'company') {
      setCompanyDemoLoaded(false);
      setCompanyFormData(null);
    }
  }, []);

  const getProfileFormData = useCallback((inviteData: InviteData): AccountFormData => {
    // If we have stored form data, return it
    if (profileFormData) {
      return profileFormData;
    }

    // If demo data is loaded for profile step, return demo data with invite email
    if (profileDemoLoaded) {
      return {
        ...DEMO_PROFILE_DATA,
        email: inviteData.supplierContactEmail, // Email always comes from invite
      };
    }

    // Otherwise return empty form - only email is known from the invite
    return {
      firstName: '',
      lastName: '',
      email: inviteData.supplierContactEmail,
      phoneCountryCode: '',
      phone: '',
      preferredLanguage: '',
      jobTitle: '',
      password: '',
      confirmPassword: '',
    };
  }, [profileDemoLoaded, profileFormData]);

  const getCompanyFormData = useCallback((inviteData: InviteData): CompanyFormData => {
    // If we have stored form data, return it
    if (companyFormData) {
      return companyFormData;
    }

    // If demo data is loaded for company step, return demo data with invite email
    if (companyDemoLoaded) {
      return {
        ...DEMO_COMPANY_DATA,
        primaryContactEmail: inviteData.supplierContactEmail, // Email always comes from invite
      };
    }

    // Otherwise return empty form - only primary contact email is known from the invite
    return {
      companyNameEnglish: '',
      companyNameLocal: '',
      businessRegistrationNumber: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
      defaultLanguage: '',
      defaultTimezone: '',
      companyPhoneCountryCode: '',
      companyPhone: '',
      primaryContactEmail: inviteData.supplierContactEmail,
      relationshipType: '',
    };
  }, [companyDemoLoaded, companyFormData]);

  const value: DemoDataContextValue = {
    isDemoDataLoaded,
    loadDemoData,
    resetData,
    getProfileFormData,
    getCompanyFormData,
    setProfileFormData,
    setCompanyFormData,
    profileFormData,
    companyFormData,
  };

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}
