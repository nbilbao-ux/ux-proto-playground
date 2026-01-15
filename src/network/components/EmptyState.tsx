import React from 'react';
import styled from 'styled-components';
import { Button, Muted, VStack } from '@/ui/primitives';

const EmptyWrap = styled.div`
  padding: 60px 20px;
  text-align: center;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 650;
  color: rgba(255,255,255,0.88);
  margin-bottom: 8px;
`;

const EmptyDescription = styled(Muted)`
  font-size: 13px;
  margin-bottom: 20px;
`;

interface EmptyStateProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, primaryAction, secondaryAction }: EmptyStateProps) {
  return (
    <EmptyWrap>
      <VStack gap={12}>
        <div>
          <EmptyTitle>{title}</EmptyTitle>
          {description && <EmptyDescription>{description}</EmptyDescription>}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {primaryAction && (
            <Button variant="primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </VStack>
    </EmptyWrap>
  );
}
