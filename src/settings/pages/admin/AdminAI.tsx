import React from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, VStack } from '@/ui/primitives';

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const SectionDescription = styled.div`
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.60);
  margin-bottom: 16px;
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: rgba(106, 167, 255, 0.88);
  text-decoration: none;
  font-size: 13px;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLinkIcon = styled.span`
  font-size: 12px;
  display: inline-block;
  transform: rotate(45deg);
`;

const PromoCard = styled(Card)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
`;

const PromoCardContent = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const PromoCardLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PromoCardTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
`;

const PromoCardDescription = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.60);
  line-height: 1.4;
`;

const PromoCardButton = styled(Button)`
  flex-shrink: 0;
`;

const FeatureCard = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FeatureIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.76);
`;

const FeatureContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FeatureTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
`;

const FeatureDescription = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.60);
  line-height: 1.4;
`;

const FeatureBadge = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
  flex-shrink: 0;
`;

const IntegrationsCard = styled(Card)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const IntegrationsCardContent = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const IntegrationsCardLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const IntegrationsCardTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
`;

const IntegrationsCardDescription = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.60);
  line-height: 1.4;
`;

const ArrowIcon = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.76);
  flex-shrink: 0;
`;

export function AdminAI() {
  return (
    <SettingsPageLayout
      title="AI"
      subtitle="Automate your product development processes and operations with AI."
      headerRight={
        <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
          Docs
          <ExternalLinkIcon>↗</ExternalLinkIcon>
        </ExternalLink>
      }
    >
      <VStack $gap={14}>
        {/* Promotional Card */}
        <PromoCard>
          <PromoCardContent>
            <PromoCardLeft>
              <PromoCardTitle>Available on Business and Enterprise plans</PromoCardTitle>
              <PromoCardDescription>
                Access AI-automation, Flexport Agent, and all other Business features
              </PromoCardDescription>
            </PromoCardLeft>
            <PromoCardButton $variant="secondary">Start free trial</PromoCardButton>
          </PromoCardContent>
        </PromoCard>

        {/* Automation Section */}
        <div>
          <SectionTitle>Automation</SectionTitle>
          <SectionDescription>AI automation to handle routine, manual tasks for your team.</SectionDescription>
          <VStack $gap={12}>
            <FeatureCard>
              <FeatureIcon>⊕</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Triage Intelligence</FeatureTitle>
                <FeatureDescription>
                  Find related issues and infer properties like team, project, labels, and assignee
                </FeatureDescription>
              </FeatureContent>
              <FeatureBadge>Available on Business</FeatureBadge>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>💬</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Discussion summaries</FeatureTitle>
                <FeatureDescription>Control AI-generated summaries across Flexport</FeatureDescription>
              </FeatureContent>
              <FeatureBadge>Available on Business</FeatureBadge>
            </FeatureCard>
          </VStack>
        </div>

        {/* Flexport Agent Section */}
        <div>
          <SectionTitle>Flexport Agent</SectionTitle>
          <SectionDescription>
            Create issues and answer questions about your workspace with the Flexport Agent.
          </SectionDescription>
          <IntegrationsCard>
            <IntegrationsCardContent>
              <IntegrationsCardLeft>
                <IntegrationsCardTitle>Available integrations</IntegrationsCardTitle>
                <IntegrationsCardDescription>
                  Flexport Agent is available on Slack and Gong. Add integrations to your workspace to use.
                </IntegrationsCardDescription>
              </IntegrationsCardLeft>
              <ArrowIcon>›</ArrowIcon>
            </IntegrationsCardContent>
          </IntegrationsCard>
        </div>
      </VStack>
    </SettingsPageLayout>
  );
}
