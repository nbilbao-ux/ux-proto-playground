import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Label,
  Input,
  Select,
  Muted,
  Tag,
  Checkbox,
} from '@/ui/primitives';
import {
  type InviteData,
  type CompanyFormData,
  type AccountFormData,
  type FormErrors,
  countries,
  languages,
  entityRoles,
  validateEmail,
  validatePhone,
  validatePassword,
  getPasswordStrength,
  checkForDuplicate,
} from './types';

// ============================================================================
// Styled Components
// ============================================================================

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RequiredLabel = styled(Label)`
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

const SimulateCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255,210,122,0.08);
  border: 1px solid rgba(255,210,122,0.2);
  border-radius: 8px;
  margin-top: 16px;
  font-size: 12px;
  color: rgba(255,240,210,0.9);
`;

const ContextBanner = styled.div`
  background: rgba(106,167,255,0.08);
  border: 1px solid rgba(106,167,255,0.2);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
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
  margin: 8px 0;
  padding-top: 20px;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  margin-bottom: 16px;
`;

const PrototypeFooter = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
`;

const FooterLink = styled(Link)`
  color: rgba(106,167,255,0.9);
  text-decoration: none;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
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
}

export function SupplierAccountCreation({
  inviteData,
  initialStep = 'profile',
  onBack,
  onComplete,
}: SupplierAccountCreationProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);
  const [simulateDuplicate, setSimulateDuplicate] = useState(false);
  
  // Form state - Profile includes personal info + role
  const [profileForm, setProfileForm] = useState<AccountFormData & { entityRole: string }>({
    firstName: inviteData.supplierContactFirstName || '',
    lastName: inviteData.supplierContactLastName || '',
    email: inviteData.supplierContactEmail,
    phone: '',
    preferredLanguage: inviteData.preferredLanguage,
    password: '',
    confirmPassword: '',
    entityRole: '',
  });
  
  // Company form - just company details
  const [companyForm, setCompanyForm] = useState<CompanyFormData>({
    country: inviteData.suggestedCountry,
    companyNameLocal: '',
    companyNameEnglish: inviteData.supplierCompanyName,
    businessRegistrationNumber: '',
    addressLocal: '',
    addressEnglish: '',
    entityRole: '', // Will be copied from profile
  });
  
  const [profileErrors, setProfileErrors] = useState<FormErrors>({});
  const [companyErrors, setCompanyErrors] = useState<FormErrors>({});

  // Validate profile form
  const validateProfileForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!profileForm.firstName.trim()) errors.firstName = 'First name is required';
    if (!profileForm.lastName.trim()) errors.lastName = 'Last name is required';
    if (!profileForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(profileForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!profileForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(profileForm.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!profileForm.preferredLanguage) errors.preferredLanguage = 'Preferred language is required';
    if (!profileForm.entityRole) errors.entityRole = 'Your role is required';
    
    const passwordValidation = validatePassword(profileForm.password);
    if (!profileForm.password) {
      errors.password = 'Password is required';
    } else if (!passwordValidation.valid) {
      errors.password = passwordValidation.errors.join(', ');
    }
    
    if (!profileForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (profileForm.password !== profileForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate company form
  const validateCompanyForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!companyForm.country) errors.country = 'Country is required';
    if (!companyForm.companyNameLocal.trim()) errors.companyNameLocal = 'Company name (local) is required';
    if (!companyForm.companyNameEnglish.trim()) errors.companyNameEnglish = 'Company name (English) is required';
    if (!companyForm.businessRegistrationNumber.trim()) errors.businessRegistrationNumber = 'Business registration number is required';
    if (!companyForm.addressLocal.trim()) errors.addressLocal = 'Address (local) is required';
    if (!companyForm.addressEnglish.trim()) errors.addressEnglish = 'Address (English) is required';
    
    setCompanyErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileNext = () => {
    if (validateProfileForm()) {
      // Check for duplicates before proceeding
      const duplicateCheck = checkForDuplicate(profileForm.email);
      if (duplicateCheck.isDuplicate || simulateDuplicate) {
        setCurrentStep('duplicate');
      } else {
        // Copy entity role to company form
        setCompanyForm(prev => ({ ...prev, entityRole: profileForm.entityRole }));
        setCurrentStep('company');
      }
    }
  };

  const handleCompanyNext = () => {
    if (validateCompanyForm()) {
      setCurrentStep('success');
      onComplete();
    }
  };

  const handleBackFromCompany = () => {
    setCurrentStep('profile');
  };

  const handleBackFromDuplicate = () => {
    setCurrentStep('profile');
  };

  const handleLogin = () => {
    // Simulate login and auto-link
    setCurrentStep('success');
    onComplete();
  };

  const passwordStrength = getPasswordStrength(profileForm.password);
  const selectedRole = entityRoles.find(r => r.value === profileForm.entityRole);

  // Reusable footer for prototype navigation
  const prototypeFooter = (
    <PrototypeFooter>
      <FooterLink to="/">← Back to prototype index</FooterLink>
    </PrototypeFooter>
  );

  // Step 1: Your Profile (Personal info + Role)
  if (currentStep === 'profile') {
    return (
      <>
      <Card>
        <CardHeader>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Create Your Account</h2>
            <Muted style={{ fontSize: '13px', marginTop: '4px' }}>
              Set up your personal profile to get started
            </Muted>
          </div>
        </CardHeader>
        <CardBody>
          <ContextBanner>
            <ContextIcon>🤝</ContextIcon>
            <ContextText>
              You're joining Flexport to connect with <strong>{inviteData.clientCompanyName}</strong>
            </ContextText>
          </ContextBanner>

          <FormSection>
            <FormRow>
              <FormField>
                <RequiredLabel>First Name</RequiredLabel>
                <InputWithError
                  placeholder="Enter first name"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                  $hasError={!!profileErrors.firstName}
                />
                {profileErrors.firstName && <ErrorText>{profileErrors.firstName}</ErrorText>}
              </FormField>
              <FormField>
                <RequiredLabel>Last Name</RequiredLabel>
                <InputWithError
                  placeholder="Enter last name"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                  $hasError={!!profileErrors.lastName}
                />
                {profileErrors.lastName && <ErrorText>{profileErrors.lastName}</ErrorText>}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <RequiredLabel>Email</RequiredLabel>
                <InputWithError
                  type="email"
                  placeholder="email@company.com"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  $hasError={!!profileErrors.email}
                />
                {profileErrors.email && <ErrorText>{profileErrors.email}</ErrorText>}
              </FormField>
              <FormField>
                <RequiredLabel>Phone Number</RequiredLabel>
                <InputWithError
                  type="tel"
                  placeholder="+86 123 4567 8900"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  $hasError={!!profileErrors.phone}
                />
                {profileErrors.phone && <ErrorText>{profileErrors.phone}</ErrorText>}
              </FormField>
            </FormRow>

            <FormField>
              <RequiredLabel>Preferred Language</RequiredLabel>
              <SelectWithError
                value={profileForm.preferredLanguage}
                onChange={(e) => setProfileForm({ ...profileForm, preferredLanguage: e.target.value })}
                $hasError={!!profileErrors.preferredLanguage}
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </SelectWithError>
              {profileErrors.preferredLanguage && <ErrorText>{profileErrors.preferredLanguage}</ErrorText>}
            </FormField>

            <SectionDivider>
              <SectionTitle>Your Role</SectionTitle>
            </SectionDivider>

            <FormField>
              <RequiredLabel>What is your role in shipments?</RequiredLabel>
              <SelectWithError
                value={profileForm.entityRole}
                onChange={(e) => setProfileForm({ ...profileForm, entityRole: e.target.value })}
                $hasError={!!profileErrors.entityRole}
              >
                <option value="">Select your role</option>
                {entityRoles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </SelectWithError>
              {profileErrors.entityRole && <ErrorText>{profileErrors.entityRole}</ErrorText>}
              <Muted style={{ fontSize: '12px', marginTop: '4px' }}>
                This determines how you appear on shipping documents (HBL/Billing)
              </Muted>
            </FormField>

            <SectionDivider>
              <SectionTitle>Security</SectionTitle>
            </SectionDivider>

            <FormField>
              <RequiredLabel>Password</RequiredLabel>
              <InputWithError
                type="password"
                placeholder="Create a password"
                value={profileForm.password}
                onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
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
                    Password strength: {passwordStrength.strength}
                  </PasswordHint>
                </>
              )}
              {profileErrors.password && <ErrorText>{profileErrors.password}</ErrorText>}
              <Muted style={{ fontSize: '12px', marginTop: '4px' }}>
                Min 8 characters, 1 uppercase letter, 1 symbol
              </Muted>
            </FormField>

            <FormField>
              <RequiredLabel>Confirm Password</RequiredLabel>
              <InputWithError
                type="password"
                placeholder="Confirm your password"
                value={profileForm.confirmPassword}
                onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                $hasError={!!profileErrors.confirmPassword}
              />
              {profileErrors.confirmPassword && <ErrorText>{profileErrors.confirmPassword}</ErrorText>}
            </FormField>

            <SimulateCheckbox>
              <Checkbox
                checked={simulateDuplicate}
                onChange={setSimulateDuplicate}
                aria-label="Simulate duplicate account"
              />
              <span>Demo: Simulate duplicate account detection</span>
            </SimulateCheckbox>

            <HStack $gap={12} style={{ marginTop: '8px', justifyContent: 'flex-end' }}>
              <Button $variant="secondary" onClick={onBack}>
                Back
              </Button>
              <Button $variant="primary" onClick={handleProfileNext}>
                Continue
              </Button>
            </HStack>
          </FormSection>
        </CardBody>
      </Card>
      {prototypeFooter}
      </>
    );
  }

  // Step 2: Company Information
  if (currentStep === 'company') {
    return (
      <>
      <Card>
        <CardHeader>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Company Information</h2>
            <Muted style={{ fontSize: '13px', marginTop: '4px' }}>
              Enter your company's registration details
            </Muted>
          </div>
        </CardHeader>
        <CardBody>
          <ContextBanner>
            <ContextIcon>🏢</ContextIcon>
            <ContextText>
              Setting up company profile for <strong>{profileForm.firstName} {profileForm.lastName}</strong> 
              {selectedRole && <> as <strong>{selectedRole.label}</strong></>}
            </ContextText>
          </ContextBanner>

          <FormSection>
            <FormField>
              <RequiredLabel>Country / Region</RequiredLabel>
              <SelectWithError
                value={companyForm.country}
                onChange={(e) => setCompanyForm({ ...companyForm, country: e.target.value })}
                $hasError={!!companyErrors.country}
              >
                <option value="">Select country</option>
                {countries.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </SelectWithError>
              {companyErrors.country && <ErrorText>{companyErrors.country}</ErrorText>}
            </FormField>

            <FormRow>
              <FormField>
                <RequiredLabel>Company Name (Local Language)</RequiredLabel>
                <InputWithError
                  placeholder="Enter company name in local language"
                  value={companyForm.companyNameLocal}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyNameLocal: e.target.value })}
                  $hasError={!!companyErrors.companyNameLocal}
                />
                {companyErrors.companyNameLocal && <ErrorText>{companyErrors.companyNameLocal}</ErrorText>}
              </FormField>
              <FormField>
                <RequiredLabel>Company Name (English)</RequiredLabel>
                <InputWithError
                  placeholder="Enter company name in English"
                  value={companyForm.companyNameEnglish}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyNameEnglish: e.target.value })}
                  $hasError={!!companyErrors.companyNameEnglish}
                />
                {companyErrors.companyNameEnglish && <ErrorText>{companyErrors.companyNameEnglish}</ErrorText>}
              </FormField>
            </FormRow>

            <FormField>
              <RequiredLabel>Business Registration Number</RequiredLabel>
              <InputWithError
                placeholder="Enter your business registration number"
                value={companyForm.businessRegistrationNumber}
                onChange={(e) => setCompanyForm({ ...companyForm, businessRegistrationNumber: e.target.value })}
                $hasError={!!companyErrors.businessRegistrationNumber}
              />
              {companyErrors.businessRegistrationNumber && <ErrorText>{companyErrors.businessRegistrationNumber}</ErrorText>}
            </FormField>

            <FormField>
              <RequiredLabel>Company Address (Local Language)</RequiredLabel>
              <InputWithError
                placeholder="Enter full address in local language"
                value={companyForm.addressLocal}
                onChange={(e) => setCompanyForm({ ...companyForm, addressLocal: e.target.value })}
                $hasError={!!companyErrors.addressLocal}
              />
              {companyErrors.addressLocal && <ErrorText>{companyErrors.addressLocal}</ErrorText>}
            </FormField>

            <FormField>
              <RequiredLabel>Company Address (English)</RequiredLabel>
              <InputWithError
                placeholder="Enter full address in English"
                value={companyForm.addressEnglish}
                onChange={(e) => setCompanyForm({ ...companyForm, addressEnglish: e.target.value })}
                $hasError={!!companyErrors.addressEnglish}
              />
              {companyErrors.addressEnglish && <ErrorText>{companyErrors.addressEnglish}</ErrorText>}
            </FormField>

            <HStack $gap={12} style={{ marginTop: '8px', justifyContent: 'flex-end' }}>
              <Button $variant="secondary" onClick={handleBackFromCompany}>
                Back
              </Button>
              <Button $variant="primary" onClick={handleCompanyNext}>
                Complete Setup
              </Button>
            </HStack>
          </FormSection>
        </CardBody>
      </Card>
      {prototypeFooter}
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
            <DuplicateTitle>Account Already Exists</DuplicateTitle>
            <DuplicateText>
              An account with this email address already exists. Log in to automatically connect with {inviteData.clientCompanyName}.
            </DuplicateText>
            <VStack $gap={12}>
              <Button $variant="primary" onClick={handleLogin} style={{ width: '100%' }}>
                Log In & Connect
              </Button>
              <Button $variant="secondary" onClick={handleBackFromDuplicate} style={{ width: '100%' }}>
                Use Different Email
              </Button>
            </VStack>
          </DuplicateAlert>
        </CardBody>
      </Card>
      {prototypeFooter}
      </>
    );
  }

  // Success State
  return (
    <>
    <SuccessCard>
      <CardBody>
        <SuccessIcon>✓</SuccessIcon>
        <SuccessTitle>Welcome to Flexport!</SuccessTitle>
        <SuccessText>
          Your account has been created and you're now connected with {inviteData.clientCompanyName}.
        </SuccessText>

        <ConnectionCard>
          <ConnectionInfo>
            <ConnectionAvatar>
              {inviteData.clientCompanyName.charAt(0)}
            </ConnectionAvatar>
            <div>
              <ConnectionName>{inviteData.clientCompanyName}</ConnectionName>
              <ConnectionRole>Client / Consignee</ConnectionRole>
            </div>
          </ConnectionInfo>
          <Tag tone="success">Connected</Tag>
        </ConnectionCard>

        <VStack $gap={12}>
          <Button $variant="primary" as={Link} to="/settings/network/organizations" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>
            View Network Connections
          </Button>
          <Button $variant="secondary" as={Link} to="/" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>
            Go to Dashboard
          </Button>
        </VStack>
      </CardBody>
    </SuccessCard>
    {prototypeFooter}
    </>
  );
}
