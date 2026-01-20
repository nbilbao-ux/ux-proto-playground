import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Input,
  Select,
  Muted,
  Tag,
  FieldRow,
  FieldLabel,
  FieldHint,
  FieldControl,
  Divider,
} from '@/ui/primitives';
import {
  type InviteData,
  type CompanyFormData,
  type AccountFormData,
  type FormErrors,
  countries,
  countryCodes,
  languages,
  relationshipTypes,
  timezones,
  getDefaultTimezone,
  getDefaultLanguage,
  getDefaultCountryCode,
  validateEmail,
  validatePhone,
  validatePassword,
  getPasswordStrength,
  checkForDuplicate,
  parseAddress,
} from './types';
import { useDemoData } from './DemoDataContext';
import { getTranslations } from './translations';

// ============================================================================
// Styled Components
// ============================================================================

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormCardBody = styled(CardBody)`
  padding: 0;
`;

const RequiredFieldLabel = styled(FieldLabel)`
  &::after {
    content: ' *';
    color: rgba(255,92,122,0.9);
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: rgba(255,92,122,0.95);
  margin-top: 2px;
`;

const InputWithError = styled(Input)<{ $hasError?: boolean }>`
  border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.5)' : 'var(--border)'};
  
  &:focus {
    border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.7)' : 'rgba(106,167,255,0.45)'};
    box-shadow: 0 0 0 4px ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.14)' : 'rgba(106,167,255,0.14)'};
  }
`;

const SelectWithError = styled(Select)<{ $hasError?: boolean }>`
  border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.5)' : 'var(--border)'};
  
  &:focus {
    border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.7)' : 'rgba(106,167,255,0.45)'};
    box-shadow: 0 0 0 4px ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.14)' : 'rgba(106,167,255,0.14)'};
  }
`;

const PhoneInputGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const CountryCodeSelect = styled(Select)<{ $hasError?: boolean }>`
  width: 80px;
  flex-shrink: 0;
  border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.5)' : 'var(--border)'};
  
  &:focus {
    border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.7)' : 'rgba(106,167,255,0.45)'};
    box-shadow: 0 0 0 4px ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.14)' : 'rgba(106,167,255,0.14)'};
  }
`;

const PhoneInput = styled(Input)<{ $hasError?: boolean }>`
  flex: 1;
  border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.5)' : 'var(--border)'};
  
  &:focus {
    border-color: ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.7)' : 'rgba(106,167,255,0.45)'};
    box-shadow: 0 0 0 4px ${({ $hasError }) => $hasError ? 'rgba(255,92,122,0.14)' : 'rgba(106,167,255,0.14)'};
  }
`;

const PasswordStrength = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const PasswordBar = styled.div<{ $active?: boolean; $strength?: 'weak' | 'medium' | 'strong' }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${({ $active, $strength }) => {
    if (!$active) return 'rgba(255,255,255,0.1)';
    if ($strength === 'weak') return 'rgba(255,92,122,0.7)';
    if ($strength === 'medium') return 'rgba(255,210,122,0.7)';
    return 'rgba(78,224,138,0.7)';
  }};
  transition: background 200ms ease;
`;

const PasswordHint = styled.div<{ $strength?: 'weak' | 'medium' | 'strong' }>`
  font-size: 12px;
  margin-top: 6px;
  color: ${({ $strength }) => {
    if ($strength === 'weak') return 'rgba(255,92,122,0.9)';
    if ($strength === 'medium') return 'rgba(255,210,122,0.9)';
    return 'rgba(78,224,138,0.9)';
  }};
`;

const DuplicateAlert = styled.div`
  background: rgba(255,210,122,0.08);
  border: 1px solid rgba(255,210,122,0.3);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const DuplicateTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255,240,210,0.95);
  margin: 0 0 8px;
`;

const DuplicateText = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.65);
  margin: 0 0 16px;
  line-height: 1.5;
`;

const SuccessCard = styled(Card)`
  text-align: center;
  padding: 20px 0;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(78,224,138,0.15);
  border: 2px solid rgba(78,224,138,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 40px;
`;

const SuccessTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 12px;
  color: rgba(255,255,255,0.95);
`;

const SuccessText = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.65);
  margin: 0 0 24px;
  line-height: 1.5;
`;

const ConnectionCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ConnectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ConnectionAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(106,167,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: rgba(195,220,255,0.95);
`;

const ConnectionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
`;

const ConnectionRole = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  margin-top: 2px;
`;

const RedirectNotice = styled.div`
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  text-align: center;
  margin-top: 8px;
  font-style: italic;
`;

const ContextBanner = styled.div`
  background: rgba(106,167,255,0.08);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border);
`;

const ContextIcon = styled.span`
  font-size: 20px;
`;

const ContextText = styled.div`
  font-size: 13px;
  color: rgba(195,220,255,0.9);
  line-height: 1.4;
`;

const SectionDivider = styled.div`
  border-top: 1px solid var(--border);
  padding: 16px 16px 0;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px;
`;

// ============================================================================
// Component
// ============================================================================

export type OnboardingStep = 'profile' | 'company' | 'duplicate' | 'success';

interface SupplierAccountCreationProps {
  inviteData: InviteData;
  initialStep?: OnboardingStep;
  onBack: () => void;
  onComplete: () => void;
  onStepChange?: (step: OnboardingStep) => void;
  language?: string;
}

export function SupplierAccountCreation({
  inviteData,
  initialStep = 'profile',
  onBack,
  onComplete,
  onStepChange,
  language = 'en',
}: SupplierAccountCreationProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);
  const t = getTranslations(language);
  const { getProfileFormData, getCompanyFormData, setProfileFormData, setCompanyFormData } = useDemoData();
  
  // Sync internal step with parent's initialStep when it changes (for footer nav control)
  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);
  
  // Wrapper to update step and notify parent
  const updateStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    onStepChange?.(step);
  };
  
  // Form state - initialized from demo data context
  const [profileForm, setProfileFormLocal] = useState<AccountFormData>(() => 
    getProfileFormData(inviteData)
  );
  
  // Company form - initialized from demo data context
  const [companyForm, setCompanyFormLocal] = useState<CompanyFormData>(() => 
    getCompanyFormData(inviteData)
  );
  
  const [profileErrors, setProfileErrors] = useState<FormErrors>({});
  const [companyErrors, setCompanyErrors] = useState<FormErrors>({});
  
  // Sync form changes back to context
  const handleProfileFormChange = (newData: AccountFormData) => {
    setProfileFormLocal(newData);
    setProfileFormData(newData);
  };
  
  const handleCompanyFormChange = (newData: CompanyFormData) => {
    setCompanyFormLocal(newData);
    setCompanyFormData(newData);
  };

  // Validate profile form
  const validateProfileForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!profileForm.firstName.trim()) errors.firstName = t.firstNameRequired;
    if (!profileForm.lastName.trim()) errors.lastName = t.lastNameRequired;
    if (!profileForm.email.trim()) {
      errors.email = t.emailRequired;
    } else if (!validateEmail(profileForm.email)) {
      errors.email = t.invalidEmail;
    }
    if (!profileForm.phone.trim()) {
      errors.phone = t.phoneRequired;
    } else if (!validatePhone(profileForm.phone)) {
      errors.phone = t.invalidPhone;
    }
    if (!profileForm.preferredLanguage) errors.preferredLanguage = t.preferredLanguageRequired;
    if (!profileForm.jobTitle.trim()) errors.jobTitle = t.jobTitleRequired;
    
    const passwordValidation = validatePassword(profileForm.password);
    if (!profileForm.password) {
      errors.password = t.passwordRequired;
    } else if (!passwordValidation.valid) {
      // Map English error messages to translated ones
      const translatedErrors = passwordValidation.errors.map(err => {
        if (err.includes('8 characters')) return t.passwordMinChars;
        if (err.includes('uppercase')) return t.passwordUppercase;
        if (err.includes('symbol')) return t.passwordSymbol;
        return err;
      });
      errors.password = translatedErrors.join(', ');
    }
    
    if (!profileForm.confirmPassword) {
      errors.confirmPassword = t.confirmPasswordRequired;
    } else if (profileForm.password !== profileForm.confirmPassword) {
      errors.confirmPassword = t.passwordsDoNotMatch;
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate company form
  const validateCompanyForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!companyForm.companyNameEnglish.trim()) errors.companyNameEnglish = t.companyNameRequired;
    if (!companyForm.streetAddress1.trim()) errors.streetAddress1 = t.streetAddress1Required;
    if (!companyForm.city.trim()) errors.city = t.cityRequired;
    if (!companyForm.country) errors.country = t.countryRequired;
    if (!companyForm.defaultLanguage) errors.defaultLanguage = t.defaultLanguageRequired;
    if (!companyForm.defaultTimezone) errors.defaultTimezone = t.timezoneRequired;
    if (!companyForm.companyPhone.trim()) errors.companyPhone = t.companyPhoneRequired;
    if (!companyForm.businessRegistrationNumber.trim()) errors.businessRegistrationNumber = t.businessRegRequired;
    if (!companyForm.relationshipType) errors.relationshipType = t.relationshipRequired;
    
    setCompanyErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileNext = () => {
    if (validateProfileForm()) {
      // Check for duplicates before proceeding
      const duplicateCheck = checkForDuplicate(profileForm.email);
      if (duplicateCheck.isDuplicate) {
        updateStep('duplicate');
      } else {
        updateStep('company');
      }
    }
  };

  const handleCompanyNext = () => {
    if (validateCompanyForm()) {
      updateStep('success');
      onComplete();
    }
  };

  const handleBackFromCompany = () => {
    updateStep('profile');
  };

  const handleBackFromDuplicate = () => {
    updateStep('profile');
  };

  const handleLogin = () => {
    // Simulate login and auto-link
    updateStep('success');
    onComplete();
  };

  const passwordStrength = getPasswordStrength(profileForm.password);

  // Helper to get translated password strength
  const getTranslatedStrength = (strength: 'weak' | 'medium' | 'strong') => {
    if (strength === 'weak') return t.weak;
    if (strength === 'medium') return t.medium;
    return t.strong;
  };

  // Step 1: Your Profile (Personal info + Role)
  if (currentStep === 'profile') {
    return (
      <>
      <Card>
        <CardHeader>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{t.createYourAccount}</h2>
            <Muted style={{ fontSize: '13px', marginTop: '4px' }}>
              {t.setupPersonalProfile}
            </Muted>
          </div>
        </CardHeader>
        <ContextBanner>
          <ContextIcon>🤝</ContextIcon>
          <ContextText>
            {t.joiningToConnect} <strong>{inviteData.clientCompanyName}</strong> {t.asSupplier}
          </ContextText>
        </ContextBanner>
        <FormCardBody>
          <FormSection>
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.firstName}</RequiredFieldLabel>
                <FieldHint>{t.enterFirstName}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterFirstName}
                    value={profileForm.firstName}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, firstName: e.target.value })}
                    $hasError={!!profileErrors.firstName}
                  />
                  {profileErrors.firstName && <ErrorText>{profileErrors.firstName}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.lastName}</RequiredFieldLabel>
                <FieldHint>{t.enterLastName}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterLastName}
                    value={profileForm.lastName}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, lastName: e.target.value })}
                    $hasError={!!profileErrors.lastName}
                  />
                  {profileErrors.lastName && <ErrorText>{profileErrors.lastName}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.email}</RequiredFieldLabel>
                <FieldHint>{t.emailPlaceholder}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={profileForm.email}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, email: e.target.value })}
                    $hasError={!!profileErrors.email}
                  />
                  {profileErrors.email && <ErrorText>{profileErrors.email}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.phoneNumber}</RequiredFieldLabel>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <PhoneInputGroup>
                    <CountryCodeSelect
                      value={profileForm.phoneCountryCode}
                      onChange={(e) => handleProfileFormChange({ ...profileForm, phoneCountryCode: e.target.value })}
                      $hasError={!!profileErrors.phone}
                    >
                      {countryCodes.map(code => (
                        <option key={code.value} value={code.value}>{code.label}</option>
                      ))}
                    </CountryCodeSelect>
                    <PhoneInput
                      type="tel"
                      placeholder="123 4567 8900"
                      value={profileForm.phone}
                      onChange={(e) => handleProfileFormChange({ ...profileForm, phone: e.target.value })}
                      $hasError={!!profileErrors.phone}
                    />
                  </PhoneInputGroup>
                  {profileErrors.phone && <ErrorText>{profileErrors.phone}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.preferredLanguage}</RequiredFieldLabel>
                <FieldHint>Select your preferred language for communications</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <SelectWithError
                    value={profileForm.preferredLanguage}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, preferredLanguage: e.target.value })}
                    $hasError={!!profileErrors.preferredLanguage}
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </SelectWithError>
                  {profileErrors.preferredLanguage && <ErrorText>{profileErrors.preferredLanguage}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.jobTitle}</RequiredFieldLabel>
                <FieldHint>{t.enterJobTitle}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterJobTitle}
                    value={profileForm.jobTitle}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, jobTitle: e.target.value })}
                    $hasError={!!profileErrors.jobTitle}
                  />
                  {profileErrors.jobTitle && <ErrorText>{profileErrors.jobTitle}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>

            <SectionDivider>
              <SectionTitle>{t.security}</SectionTitle>
            </SectionDivider>

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.password}</RequiredFieldLabel>
                <FieldHint>{t.passwordHint}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    type="password"
                    placeholder={t.createPassword}
                    value={profileForm.password}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, password: e.target.value })}
                    $hasError={!!profileErrors.password}
                  />
                  {profileForm.password && (
                    <>
                      <PasswordStrength>
                        <PasswordBar $active={passwordStrength.score >= 1} $strength={passwordStrength.strength} />
                        <PasswordBar $active={passwordStrength.score >= 3} $strength={passwordStrength.strength} />
                        <PasswordBar $active={passwordStrength.score >= 5} $strength={passwordStrength.strength} />
                      </PasswordStrength>
                      <PasswordHint $strength={passwordStrength.strength}>
                        {t.passwordStrength}: {getTranslatedStrength(passwordStrength.strength)}
                      </PasswordHint>
                    </>
                  )}
                  {profileErrors.password && <ErrorText>{profileErrors.password}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.confirmPassword}</RequiredFieldLabel>
                <FieldHint>{t.confirmYourPassword}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    type="password"
                    placeholder={t.confirmYourPassword}
                    value={profileForm.confirmPassword}
                    onChange={(e) => handleProfileFormChange({ ...profileForm, confirmPassword: e.target.value })}
                    $hasError={!!profileErrors.confirmPassword}
                  />
                  {profileErrors.confirmPassword && <ErrorText>{profileErrors.confirmPassword}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>

            <FormActions>
              <Button $variant="secondary" onClick={onBack}>
                {t.back}
              </Button>
              <Button $variant="primary" onClick={handleProfileNext}>
                {t.continue}
              </Button>
            </FormActions>
          </FormSection>
        </FormCardBody>
      </Card>
      </>
    );
  }

  // Step 2: Company Information
  if (currentStep === 'company') {
    // Update defaults when country changes (also update phone country code)
    const handleCountryChange = (newCountry: string) => {
      handleCompanyFormChange({
        ...companyForm,
        country: newCountry,
        defaultLanguage: getDefaultLanguage(newCountry),
        defaultTimezone: getDefaultTimezone(newCountry),
        companyPhoneCountryCode: getDefaultCountryCode(newCountry),
      });
    };

    // Handle street address 1 change with address parsing
    const handleStreetAddress1Change = (value: string) => {
      // Check if this looks like a full address (contains commas)
      if (value.includes(',') && value.length > 20) {
        const parsed = parseAddress(value);
        handleCompanyFormChange({
          ...companyForm,
          streetAddress1: parsed.streetAddress1 || value,
          streetAddress2: parsed.streetAddress2 || companyForm.streetAddress2,
          city: parsed.city || companyForm.city,
          stateProvince: parsed.stateProvince || companyForm.stateProvince,
          postalCode: parsed.postalCode || companyForm.postalCode,
          country: parsed.country || companyForm.country,
          // Also update language/timezone/phone code if country was parsed
          ...(parsed.country ? {
            defaultLanguage: companyForm.defaultLanguage || getDefaultLanguage(parsed.country),
            defaultTimezone: companyForm.defaultTimezone || getDefaultTimezone(parsed.country),
            companyPhoneCountryCode: companyForm.companyPhoneCountryCode || getDefaultCountryCode(parsed.country),
          } : {}),
        });
      } else {
        handleCompanyFormChange({ ...companyForm, streetAddress1: value });
      }
    };

    return (
      <>
      <Card>
        <CardHeader>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{t.companyInformation}</h2>
            <Muted style={{ fontSize: '13px', marginTop: '4px' }}>
              {t.enterCompanyDetails}
            </Muted>
          </div>
        </CardHeader>
        <ContextBanner>
          <ContextIcon>🏢</ContextIcon>
          <ContextText>
            {t.joiningToConnect} <strong>{inviteData.clientCompanyName}</strong> {t.asSupplier}
          </ContextText>
        </ContextBanner>
        <FormCardBody>
          <FormSection>
            {/* Company Name */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.companyName}</RequiredFieldLabel>
                <FieldHint>{t.enterCompanyName}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterCompanyName}
                    value={companyForm.companyNameEnglish}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, companyNameEnglish: e.target.value })}
                    $hasError={!!companyErrors.companyNameEnglish}
                  />
                  {companyErrors.companyNameEnglish && <ErrorText>{companyErrors.companyNameEnglish}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            <FieldRow>
              <div>
                <FieldLabel>{t.localCompanyName}</FieldLabel>
                <FieldHint>{t.enterLocalCompanyName}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterLocalCompanyName}
                    value={companyForm.companyNameLocal}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, companyNameLocal: e.target.value })}
                    $hasError={!!companyErrors.companyNameLocal}
                  />
                  {companyErrors.companyNameLocal && <ErrorText>{companyErrors.companyNameLocal}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Business Registration - moved under company name */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.businessRegistrationNumber}</RequiredFieldLabel>
                <FieldHint>{t.enterBusinessRegNumber}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterBusinessRegNumber}
                    value={companyForm.businessRegistrationNumber}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, businessRegistrationNumber: e.target.value })}
                    $hasError={!!companyErrors.businessRegistrationNumber}
                  />
                  {companyErrors.businessRegistrationNumber && <ErrorText>{companyErrors.businessRegistrationNumber}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Street Address 1 */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.streetAddress1}</RequiredFieldLabel>
                <FieldHint>{t.enterStreetAddress1}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterStreetAddress1}
                    value={companyForm.streetAddress1}
                    onChange={(e) => handleStreetAddress1Change(e.target.value)}
                    $hasError={!!companyErrors.streetAddress1}
                  />
                  {companyErrors.streetAddress1 && <ErrorText>{companyErrors.streetAddress1}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Street Address 2 */}
            <FieldRow>
              <div>
                <FieldLabel>{t.streetAddress2}</FieldLabel>
                <FieldHint>{t.enterStreetAddress2}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterStreetAddress2}
                    value={companyForm.streetAddress2}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, streetAddress2: e.target.value })}
                  />
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* City */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.city}</RequiredFieldLabel>
                <FieldHint>{t.enterCity}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterCity}
                    value={companyForm.city}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, city: e.target.value })}
                    $hasError={!!companyErrors.city}
                  />
                  {companyErrors.city && <ErrorText>{companyErrors.city}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* State/Province and Postal Code in a row */}
            <FieldRow>
              <div>
                <FieldLabel>{t.stateProvince}</FieldLabel>
                <FieldHint>{t.enterStateProvince}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterStateProvince}
                    value={companyForm.stateProvince}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, stateProvince: e.target.value })}
                  />
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Postal Code */}
            <FieldRow>
              <div>
                <FieldLabel>{t.postalCode}</FieldLabel>
                <FieldHint>{t.enterPostalCode}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <InputWithError
                    placeholder={t.enterPostalCode}
                    value={companyForm.postalCode}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, postalCode: e.target.value })}
                  />
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Country */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.countryRegion}</RequiredFieldLabel>
                <FieldHint>{t.selectCountry}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <SelectWithError
                    value={companyForm.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    $hasError={!!companyErrors.country}
                  >
                    <option value="">{t.selectCountry}</option>
                    {countries.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </SelectWithError>
                  {companyErrors.country && <ErrorText>{companyErrors.country}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Default Language - moved above phone */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.defaultLanguage}</RequiredFieldLabel>
                <FieldHint>{t.basedOnAddress}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <SelectWithError
                    value={companyForm.defaultLanguage}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, defaultLanguage: e.target.value })}
                    $hasError={!!companyErrors.defaultLanguage}
                  >
                    <option value="">{t.selectCountry}</option>
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </SelectWithError>
                  {companyErrors.defaultLanguage && <ErrorText>{companyErrors.defaultLanguage}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Default Timezone - moved above phone */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.defaultTimezone}</RequiredFieldLabel>
                <FieldHint>{t.selectTimezone}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <SelectWithError
                    value={companyForm.defaultTimezone}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, defaultTimezone: e.target.value })}
                    $hasError={!!companyErrors.defaultTimezone}
                  >
                    <option value="">{t.selectTimezone}</option>
                    {timezones.map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </SelectWithError>
                  {companyErrors.defaultTimezone && <ErrorText>{companyErrors.defaultTimezone}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Phone with country code selector */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.phoneNumber}</RequiredFieldLabel>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <PhoneInputGroup>
                    <CountryCodeSelect
                      value={companyForm.companyPhoneCountryCode}
                      onChange={(e) => handleCompanyFormChange({ ...companyForm, companyPhoneCountryCode: e.target.value })}
                      $hasError={!!companyErrors.companyPhone}
                    >
                      <option value="">--</option>
                      {countryCodes.map(code => (
                        <option key={code.value} value={code.value}>{code.label}</option>
                      ))}
                    </CountryCodeSelect>
                    <PhoneInput
                      type="tel"
                      placeholder="123 4567 8900"
                      value={companyForm.companyPhone}
                      onChange={(e) => handleCompanyFormChange({ ...companyForm, companyPhone: e.target.value })}
                      $hasError={!!companyErrors.companyPhone}
                    />
                  </PhoneInputGroup>
                  {companyErrors.companyPhone && <ErrorText>{companyErrors.companyPhone}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Relationship */}
            <FieldRow>
              <div>
                <RequiredFieldLabel>{t.relationshipWith} {inviteData.clientCompanyName}</RequiredFieldLabel>
                <FieldHint>{t.relationshipDescription} {inviteData.clientCompanyName}</FieldHint>
              </div>
              <FieldControl>
                <VStack $gap={4} style={{ width: '100%' }}>
                  <SelectWithError
                    value={companyForm.relationshipType}
                    onChange={(e) => handleCompanyFormChange({ ...companyForm, relationshipType: e.target.value })}
                    $hasError={!!companyErrors.relationshipType}
                  >
                    <option value="">{t.selectCountry}</option>
                    {relationshipTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </SelectWithError>
                  {companyErrors.relationshipType && <ErrorText>{companyErrors.relationshipType}</ErrorText>}
                </VStack>
              </FieldControl>
            </FieldRow>

            <FormActions>
              <Button $variant="secondary" onClick={handleBackFromCompany}>
                {t.back}
              </Button>
              <Button $variant="primary" onClick={handleCompanyNext}>
                {t.completeSetup}
              </Button>
            </FormActions>
          </FormSection>
        </FormCardBody>
      </Card>
      </>
    );
  }

  // Duplicate Detection Flow
  if (currentStep === 'duplicate') {
    return (
      <>
      <Card>
        <CardBody>
          <DuplicateAlert>
            <DuplicateTitle>{t.accountExists}</DuplicateTitle>
            <DuplicateText>
              {t.accountExistsDescription} {inviteData.clientCompanyName}.
            </DuplicateText>
            <VStack $gap={12}>
              <Button $variant="primary" onClick={handleLogin} style={{ width: '100%' }}>
                {t.loginAndConnect}
              </Button>
              <Button $variant="secondary" onClick={handleBackFromDuplicate} style={{ width: '100%' }}>
                {t.useDifferentEmail}
              </Button>
            </VStack>
          </DuplicateAlert>
        </CardBody>
      </Card>
      </>
    );
  }

  // Success State
  return (
    <SuccessCard>
      <CardBody>
        <SuccessIcon>🎉</SuccessIcon>
        <SuccessTitle>{t.allSet}</SuccessTitle>
        <SuccessText>
          {t.congratulations} {inviteData.clientCompanyName}.
        </SuccessText>

        <ConnectionCard>
          <ConnectionInfo>
            <ConnectionAvatar>
              {inviteData.clientCompanyName.charAt(0)}
            </ConnectionAvatar>
            <div>
              <ConnectionName>{inviteData.clientCompanyName}</ConnectionName>
              <ConnectionRole>{t.clientConsignee}</ConnectionRole>
            </div>
          </ConnectionInfo>
          <Tag tone="success">{t.connected}</Tag>
        </ConnectionCard>

        <RedirectNotice>
          {t.redirectNotice}
        </RedirectNotice>
      </CardBody>
    </SuccessCard>
  );
}
