import React from 'react';
import styled from 'styled-components';
import { Button, Card, CardBody, HStack, Tag, VStack } from '@/ui/primitives';
import type { MatchCandidate } from '../types';

const CandidateCard = styled(Card)<{ $selected: boolean }>`
  cursor: pointer;
  border-color: ${(p) => (p.$selected ? 'rgba(106,167,255,0.45)' : 'var(--border)')};
  background: ${(p) => (p.$selected ? 'rgba(106,167,255,0.08)' : 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))')};
  
  &:hover {
    border-color: rgba(106,167,255,0.35);
  }
`;

const CandidateName = styled.div`
  font-size: 14px;
  font-weight: 650;
  color: rgba(255,255,255,0.88);
  margin-bottom: 4px;
`;

const CandidateDetails = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 8px;
`;

const ConfidenceBar = styled.div<{ $confidence: number }>`
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${(p) => p.$confidence}%;
    background: ${(p) => {
      if (p.$confidence >= 90) return 'rgba(78,224,138,0.8)';
      if (p.$confidence >= 70) return 'rgba(255,210,122,0.8)';
      return 'rgba(255,92,122,0.8)';
    }};
    transition: width 200ms ease;
  }
`;

interface MatchCandidateSelectorProps {
  candidates: MatchCandidate[];
  selectedCandidateId?: string;
  onSelect: (candidateId: string | null) => void;
  onCreateNew?: () => void;
  loading?: boolean;
}

export function MatchCandidateSelector({
  candidates,
  selectedCandidateId,
  onSelect,
  onCreateNew,
  loading,
}: MatchCandidateSelectorProps) {
  if (loading) {
    return <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Matching...</div>;
  }

  if (candidates.length === 0) {
    return (
      <VStack gap={12}>
        <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
          No matches found in Global Network
        </div>
        {onCreateNew && (
          <Button variant="primary" onClick={onCreateNew}>
            Create new entity
          </Button>
        )}
      </VStack>
    );
  }

  return (
    <VStack gap={12}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
        Found {candidates.length} potential match{candidates.length !== 1 ? 'es' : ''} in Global Network:
      </div>
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.globalEntityId}
          $selected={selectedCandidateId === candidate.globalEntityId}
          onClick={() => onSelect(candidate.globalEntityId)}
        >
          <CardBody>
            <HStack justify="space-between" align="flex-start">
              <div style={{ flex: 1 }}>
                <CandidateName>{candidate.name}</CandidateName>
                {candidate.details && (
                  <CandidateDetails>
                    {Object.entries(candidate.details)
                      .filter(([_, v]) => v)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' • ')}
                  </CandidateDetails>
                )}
                <ConfidenceBar $confidence={candidate.confidence} />
                <div style={{ marginTop: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                  {candidate.confidence}% confidence
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                {candidate.hasAccount ? (
                  <Tag tone="success">Has account</Tag>
                ) : (
                  <Tag tone="warning">No account</Tag>
                )}
                {selectedCandidateId === candidate.globalEntityId && (
                  <Tag tone="accent">Selected</Tag>
                )}
              </div>
            </HStack>
          </CardBody>
        </CandidateCard>
      ))}
      {onCreateNew && (
        <div style={{ paddingTop: 8 }}>
          <Button variant="ghost" onClick={onCreateNew} style={{ width: '100%' }}>
            Create new (no match)
          </Button>
        </div>
      )}
    </VStack>
  );
}
