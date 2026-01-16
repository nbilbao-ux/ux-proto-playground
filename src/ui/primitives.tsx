import React from 'react';
import styled from 'styled-components';

export const HStack = styled.div<{ $gap?: number; $align?: string; $justify?: string }>`
  display: flex;
  align-items: ${(p) => p.$align ?? 'center'};
  justify-content: ${(p) => p.$justify ?? 'flex-start'};
  gap: ${(p) => (p.$gap ?? 12)}px;
`;

export const VStack = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.$gap ?? 12)}px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 650;
  letter-spacing: -0.02em;
`;

export const PageSubtitle = styled.p`
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.4;
`;

export const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: 0 18px 60px var(--shadow);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CardTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255,255,255,0.88);
`;

export const CardBody = styled.div`
  padding: 14px 16px;
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--border);
`;

export const Muted = styled.span`
  color: var(--text-muted);
`;

export const Tag = styled.span<{ tone?: 'neutral' | 'accent' | 'danger' | 'success' | 'warning' }>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.76);

  ${(p) =>
    p.tone === 'accent'
      ? `border-color: rgba(106,167,255,0.28); background: rgba(106,167,255,0.12); color: rgba(195,220,255,0.95);`
      : ''}
  ${(p) =>
    p.tone === 'danger'
      ? `border-color: rgba(255,92,122,0.28); background: rgba(255,92,122,0.12); color: rgba(255,210,219,0.95);`
      : ''}
  ${(p) =>
    p.tone === 'success'
      ? `border-color: rgba(78,224,138,0.26); background: rgba(78,224,138,0.10); color: rgba(210,255,232,0.95);`
      : ''}
  ${(p) =>
    p.tone === 'warning'
      ? `border-color: rgba(255,210,122,0.26); background: rgba(255,210,122,0.10); color: rgba(255,240,210,0.95);`
      : ''}
`;

export const Input = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 9px 10px;
  outline: none;
  font-size: 13px;

  &:focus {
    border-color: rgba(106,167,255,0.45);
    box-shadow: 0 0 0 4px rgba(106,167,255,0.14);
  }

  &::placeholder { color: var(--text-faint); }
`;

export const Select = styled.select`
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 9px 10px;
  outline: none;
  font-size: 13px;

  &:focus {
    border-color: rgba(106,167,255,0.45);
    box-shadow: 0 0 0 4px rgba(106,167,255,0.14);
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' }>`
  border-radius: 10px;
  border: 1px solid var(--border);
  padding: 9px 10px;
  font-size: 13px;
  cursor: pointer;
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.88);

  &:hover { background: rgba(255,255,255,0.05); }
  &:active { transform: translateY(1px); }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(p) =>
    p.$variant === 'primary'
      ? `border-color: rgba(106,167,255,0.30);
         background: linear-gradient(180deg, rgba(106,167,255,0.22), rgba(106,167,255,0.12));
         &:hover:not(:disabled) { background: linear-gradient(180deg, rgba(106,167,255,0.28), rgba(106,167,255,0.14)); }`
      : ''}

  ${(p) =>
    p.$variant === 'ghost'
      ? `background: transparent; border-color: transparent; &:hover:not(:disabled) { background: rgba(255,255,255,0.05); }`
      : ''}

  ${(p) =>
    p.$variant === 'danger'
      ? `border-color: rgba(255,92,122,0.30);
         background: linear-gradient(180deg, rgba(255,92,122,0.20), rgba(255,92,122,0.10));
         &:hover:not(:disabled) { background: linear-gradient(180deg, rgba(255,92,122,0.26), rgba(255,92,122,0.12)); }`
      : ''}
`;

const ToggleWrap = styled.button<{ $checked: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid ${(p) => (p.$checked ? 'rgba(106,167,255,0.45)' : 'var(--border)')};
  background: ${(p) => (p.$checked ? 'rgba(106,167,255,0.30)' : 'rgba(255,255,255,0.03)')};
  position: relative;
  padding: 0;
  cursor: pointer;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 4px rgba(106,167,255,0.14);
  }
`;

const ToggleKnob = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 3px;
  left: ${(p) => (p.$checked ? '23px' : '3px')};
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(255,255,255,0.92);
  transition: left 140ms ease;
`;

export function Toggle(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-label': string;
}) {
  return (
    <ToggleWrap
      type="button"
      role="switch"
      aria-checked={props.checked}
      aria-label={props['aria-label']}
      $checked={props.checked}
      onClick={() => props.onChange(!props.checked)}
    >
      <ToggleKnob $checked={props.checked} />
    </ToggleWrap>
  );
}

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 16px;
  padding: 12px 16px;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
`;

export const FieldHint = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-muted);
`;

export const FieldControl = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Checkbox for bulk selection
const CheckboxWrap = styled.label<{ $checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid ${(p) => (p.$checked ? 'rgba(106,167,255,0.45)' : 'var(--border)')};
  background: ${(p) => (p.$checked ? 'rgba(106,167,255,0.30)' : 'rgba(255,255,255,0.03)')};
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: rgba(106,167,255,0.45);
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Checkmark = styled.span<{ $checked: boolean }>`
  position: absolute;
  color: rgba(255,255,255,0.95);
  font-size: 12px;
  opacity: ${(p) => (p.$checked ? 1 : 0)};
  transition: opacity 140ms ease;
`;

export function Checkbox(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-label': string;
}) {
  return (
    <CheckboxWrap $checked={props.checked}>
      <CheckboxInput
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        aria-label={props['aria-label']}
      />
      <Checkmark $checked={props.checked}>✓</Checkmark>
    </CheckboxWrap>
  );
}

// Modal wrapper
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: 0 18px 60px var(--shadow);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
`;

const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  color: rgba(255,255,255,0.88);
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

export function Modal(props: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!props.isOpen) return null;

  return (
    <ModalOverlay onClick={props.onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{props.title}</ModalTitle>
          <Button $variant="ghost" onClick={props.onClose} aria-label="Close modal">
            ×
          </Button>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
      </ModalContent>
    </ModalOverlay>
  );
}
