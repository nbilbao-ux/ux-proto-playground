import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  Select,
  Muted,
} from '@/ui/primitives';
import {
  InviteEmailPreview,
  SupplierAccountCreation,
  getInviteByToken,
  languages,
  type InviteData,
} from './supplier-onboarding';

// ============================================================================
// Types
// ============================================================================

type FlowStep = 'email' | 'onboarding' | 'complete';

// ============================================================================
// Styled Components
// ============================================================================

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 26px;
  background-color: var(--background, #0a0a0a);
  background-image: linear-gradient(180deg, rgba(106,167,255,0.03) 0%, transparent 400px);
  background-attachment: fixed;
`;

const Container = styled.div`
  max-width: 640px;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: rgba(106,167,255,0.95);
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const BackLink = styled(Link)`
  color: rgba(106,167,255,0.9);
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Step = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  background: ${({ $active, $completed }) =>
    $completed ? 'rgba(78,224,138,0.25)' : $active ? 'rgba(106,167,255,0.25)' : 'rgba(255,255,255,0.05)'};
  border: 2px solid ${({ $active, $completed }) =>
    $completed ? 'rgba(78,224,138,0.5)' : $active ? 'rgba(106,167,255,0.5)' : 'rgba(255,255,255,0.1)'};
  color: ${({ $active, $completed }) =>
    $active || $completed ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)'};
  transition: all 200ms ease;
`;

const StepLabel = styled.div<{ $active?: boolean }>`
  font-size: 11px;
  color: ${({ $active }) => ($active ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.4)')};
  margin-top: 6px;
  text-align: center;
  font-weight: 500;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
`;

const StepConnector = styled.div<{ $completed?: boolean }>`
  width: 40px;
  height: 2px;
  background: ${({ $completed }) => $completed ? 'rgba(78,224,138,0.4)' : 'rgba(255,255,255,0.1)'};
  margin-top: 18px;
  transition: background 200ms ease;
`;

const LanguageSelector = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const LanguageSelect = styled(Select)`
  width: auto;
  min-width: 140px;
`;

const FooterNote = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
`;

// ============================================================================
// Constants
// ============================================================================

const steps = [
  { id: 1, label: 'Invite' },
  { id: 2, label: 'Profile' },
  { id: 3, label: 'Company' },
  { id: 4, label: 'Complete' },
];

// ============================================================================
// Helper Functions
// ============================================================================

function getStepNumber(flowStep: FlowStep, onboardingStep?: string): number {
  if (flowStep === 'email') return 1;
  if (flowStep === 'complete') return 4;
  if (flowStep === 'onboarding') {
    if (onboardingStep === 'profile' || onboardingStep === 'duplicate') return 2;
    if (onboardingStep === 'company') return 3;
    if (onboardingStep === 'success') return 4;
  }
  return 1;
}

// ============================================================================
// Main Component
// ============================================================================

export function SupplierOnboarding() {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  
  // Use token from URL params or query string for flexibility
  const inviteToken = token || searchParams.get('token') || 'demo-token';
  
  const [flowStep, setFlowStep] = useState<FlowStep>('email');
  const [onboardingStep, setOnboardingStep] = useState<string>('profile');
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Load invite data
  useEffect(() => {
    const data = getInviteByToken(inviteToken);
    if (data) {
      setInviteData(data);
      setSelectedLanguage(data.preferredLanguage);
    }
    setLoading(false);
  }, [inviteToken]);

  const handleAcceptInvite = () => {
    setFlowStep('onboarding');
    setOnboardingStep('profile');
  };

  const handleLogin = () => {
    // Skip to success (simulating existing account login)
    setFlowStep('complete');
  };

  const handleBackToEmail = () => {
    setFlowStep('email');
  };

  const handleOnboardingComplete = () => {
    setFlowStep('complete');
  };

  const currentStepNumber = getStepNumber(flowStep, onboardingStep);

  // Loading state
  if (loading) {
    return (
      <Wrap>
        <Container>
          <Logo>Flexport</Logo>
          <Card>
            <CardBody>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Muted>Loading invitation...</Muted>
              </div>
            </CardBody>
          </Card>
        </Container>
      </Wrap>
    );
  }

  // Invalid invite
  if (!inviteData) {
    return (
      <Wrap>
        <Container>
          <Logo>Flexport</Logo>
          <Card>
            <CardBody>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.88)' }}>Invalid Invitation</h2>
                <Muted>This invitation link is invalid or has expired.</Muted>
                <div style={{ marginTop: '24px' }}>
                  <BackLink to="/">← Return to home</BackLink>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Container>
        <Logo>Flexport</Logo>
        
        {/* Language Selector - shown during onboarding flow */}
        {flowStep === 'onboarding' && (
          <LanguageSelector>
            <LanguageSelect
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </LanguageSelect>
          </LanguageSelector>
        )}

        {/* Step Indicator - shown during onboarding */}
        {flowStep === 'onboarding' && (
          <StepIndicator>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <StepContainer>
                  <Step
                    $active={currentStepNumber === step.id}
                    $completed={currentStepNumber > step.id}
                  >
                    {currentStepNumber > step.id ? '✓' : step.id}
                  </Step>
                  <StepLabel $active={currentStepNumber === step.id}>
                    {step.label}
                  </StepLabel>
                </StepContainer>
                {index < steps.length - 1 && (
                  <StepConnector $completed={currentStepNumber > step.id} />
                )}
              </React.Fragment>
            ))}
          </StepIndicator>
        )}

        {/* Email Preview Step */}
        {flowStep === 'email' && (
          <>
            <InviteEmailPreview
              inviteData={inviteData}
              onAcceptInvite={handleAcceptInvite}
              onLogin={handleLogin}
            />
            <FooterNote>
              This is a preview of the invitation email the supplier receives.<br />
              <BackLink to="/" style={{ marginTop: '8px', display: 'inline-block' }}>
                ← Back to prototype index
              </BackLink>
            </FooterNote>
          </>
        )}

        {/* Account Creation Flow */}
        {(flowStep === 'onboarding' || flowStep === 'complete') && (
          <SupplierAccountCreation
            inviteData={inviteData}
            initialStep={flowStep === 'complete' ? 'success' : 'profile'}
            onBack={handleBackToEmail}
            onComplete={handleOnboardingComplete}
          />
        )}
      </Container>
    </Wrap>
  );
}
