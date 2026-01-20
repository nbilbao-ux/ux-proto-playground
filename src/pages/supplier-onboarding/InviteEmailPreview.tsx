import React from 'react';
import styled from 'styled-components';
import type { InviteData } from './types';

// ============================================================================
// Styled Components
// ============================================================================

const EmailMockupContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
`;

const EmailHeader = styled.div`
  background: #252525;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const EmailToolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const EmailDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const EmailMetaRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;
`;

const EmailMetaLabel = styled.span`
  color: rgba(255,255,255,0.4);
  min-width: 60px;
  flex-shrink: 0;
`;

const EmailMetaValue = styled.span`
  color: rgba(255,255,255,0.85);
`;

const EmailSubject = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255,255,255,0.95);
  margin-top: 12px;
`;

const EmailBody = styled.div`
  padding: 32px 24px;
  background: #ffffff;
  color: #1a1a1a;
`;

const EmailLogo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 24px;
`;

const EmailTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px;
`;

const EmailSubtitle = styled.p`
  font-size: 15px;
  color: #555;
  margin: 0 0 24px;
  line-height: 1.5;
`;

const EmailCompanyBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #f5f7fa;
  border-radius: 12px;
  margin-bottom: 24px;
`;

const EmailCompanyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const EmailCompanyInfo = styled.div`
  flex: 1;
`;

const EmailCompanyName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const EmailInviterName = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

const EmailBenefitsList = styled.ul`
  margin: 0 0 28px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const EmailBenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

const EmailBenefitCheck = styled.span`
  color: #10b981;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
`;

const EmailCTAButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,102,204,0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmailLoginLink = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #666;

  button {
    color: #0066cc;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const EmailFooter = styled.div`
  padding: 20px 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #888;
  text-align: center;
  line-height: 1.6;
`;

const EmailDivider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 24px 0;
`;

// ============================================================================
// Component
// ============================================================================

interface InviteEmailPreviewProps {
  inviteData: InviteData;
  onAcceptInvite: () => void;
  onLogin: () => void;
}

export function InviteEmailPreview({ inviteData, onAcceptInvite, onLogin }: InviteEmailPreviewProps) {
  return (
    <EmailMockupContainer>
      <EmailHeader>
        <EmailToolbar>
          <EmailDot $color="#ff5f57" />
          <EmailDot $color="#febc2e" />
          <EmailDot $color="#28c840" />
        </EmailToolbar>
        <EmailMetaRow>
          <EmailMetaLabel>From:</EmailMetaLabel>
          <EmailMetaValue>Flexport &lt;noreply@flexport.com&gt;</EmailMetaValue>
        </EmailMetaRow>
        <EmailMetaRow>
          <EmailMetaLabel>To:</EmailMetaLabel>
          <EmailMetaValue>{inviteData.supplierContactEmail}</EmailMetaValue>
        </EmailMetaRow>
        <EmailSubject>
          {inviteData.inviterFirstName} {inviteData.inviterLastName} from {inviteData.clientCompanyName} has invited you to connect on Flexport
        </EmailSubject>
      </EmailHeader>
      
      <EmailBody>
        <EmailLogo>Flexport</EmailLogo>
        
        <EmailTitle>You're Invited!</EmailTitle>
        <EmailSubtitle>
          {inviteData.clientCompanyName} has invited you to join Flexport's supply chain network.
        </EmailSubtitle>
        
        <EmailCompanyBadge>
          <EmailCompanyIcon>🏢</EmailCompanyIcon>
          <EmailCompanyInfo>
            <EmailCompanyName>{inviteData.clientCompanyName}</EmailCompanyName>
            <EmailInviterName>Invited by {inviteData.inviterFirstName} {inviteData.inviterLastName}</EmailInviterName>
          </EmailCompanyInfo>
        </EmailCompanyBadge>
        
        <EmailBenefitsList>
          <EmailBenefitItem>
            <EmailBenefitCheck>✓</EmailBenefitCheck>
            <span>Streamlined booking and shipment management with your trading partners</span>
          </EmailBenefitItem>
          <EmailBenefitItem>
            <EmailBenefitCheck>✓</EmailBenefitCheck>
            <span>Real-time visibility into your shipments and inventory</span>
          </EmailBenefitItem>
          <EmailBenefitItem>
            <EmailBenefitCheck>✓</EmailBenefitCheck>
            <span>Simplified documentation and compliance management</span>
          </EmailBenefitItem>
          <EmailBenefitItem>
            <EmailBenefitCheck>✓</EmailBenefitCheck>
            <span>Direct communication channel with {inviteData.clientCompanyName}</span>
          </EmailBenefitItem>
        </EmailBenefitsList>

        <EmailCTAButton onClick={onAcceptInvite}>
          Accept Invite & Create Account
        </EmailCTAButton>
        
        <EmailLoginLink>
          Already have an account? <button onClick={onLogin}>Log in</button>
        </EmailLoginLink>
        
        <EmailDivider />
        
        <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 8px' }}>
            <strong>{inviteData.inviterFirstName} {inviteData.inviterLastName}</strong> ({inviteData.inviterEmail}) has invited you to connect on Flexport.
          </p>
          <p style={{ margin: 0 }}>
            By accepting this invitation, you'll be able to collaborate on shipments and bookings with {inviteData.clientCompanyName}.
          </p>
        </div>
      </EmailBody>
      
      <EmailFooter>
        This invitation was sent by Flexport on behalf of {inviteData.clientCompanyName}.<br />
        If you didn't expect this email, you can safely ignore it.<br />
        <span style={{ marginTop: '8px', display: 'block' }}>
          © 2026 Flexport, Inc. · San Francisco, CA
        </span>
      </EmailFooter>
    </EmailMockupContainer>
  );
}
