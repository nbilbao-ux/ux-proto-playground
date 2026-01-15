import React from 'react';
import styled from 'styled-components';
import { Button, HStack, Tag } from '@/ui/primitives';

const Bar = styled.div`
  padding: 12px 16px;
  background: rgba(106,167,255,0.08);
  border-top: 1px solid rgba(106,167,255,0.20);
  border-bottom: 1px solid rgba(106,167,255,0.20);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'ghost' | 'danger';
    disabled?: boolean;
  }>;
}

export function BulkActionBar({ selectedCount, onClearSelection, actions }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <Bar>
      <HStack gap={12} align="center">
        <Tag tone="accent">{selectedCount} selected</Tag>
        <Button variant="ghost" onClick={onClearSelection}>
          Clear selection
        </Button>
      </HStack>
      <HStack gap={8}>
        {actions.map((action, idx) => (
          <Button
            key={idx}
            variant={action.variant || 'ghost'}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.label}
          </Button>
        ))}
      </HStack>
    </Bar>
  );
}
