import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// ============================================================================
// Types
// ============================================================================

export interface PrototypeNavProps {
  /** Override the previous page path (optional) */
  prevPath?: string | null;
  /** Override the next page path (optional) */
  nextPath?: string | null;
  /** Custom label for the back button */
  backLabel?: string;
  /** Custom label for the forward button */
  forwardLabel?: string;
  /** Custom callback for forward button (overrides nextPath navigation) */
  onForward?: () => void;
  /** Custom callback for back button (overrides prevPath navigation) */
  onBack?: () => void;
  /** Callback to load demo data */
  onLoadDemoData?: () => void;
  /** Callback to reset form data */
  onResetData?: () => void;
  /** Whether demo data is currently loaded (for visual feedback) */
  isDemoDataLoaded?: boolean;
}

// ============================================================================
// Prototype Flow Configuration
// ============================================================================

/**
 * Define the order of pages in the prototype flow.
 * Add new pages here to include them in the navigation sequence.
 */
const PROTOTYPE_FLOW: string[] = [
  '/',
  '/supplier-onboarding',
  '/settings/account/profile',
  // Add more pages to the flow as needed
];

// ============================================================================
// Styled Components
// ============================================================================

const NavFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  &:first-child {
    justify-content: flex-start;
  }

  &:nth-child(2) {
    justify-content: center;
  }

  &:last-child {
    justify-content: flex-end;
  }
`;

const NavButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: ${({ $variant }) =>
    $variant === 'primary' ? 'rgba(106, 167, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ $variant }) =>
    $variant === 'primary' ? 'rgba(106, 167, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)'};

  &:hover:not(:disabled) {
    background: ${({ $variant }) =>
      $variant === 'primary' ? 'rgba(106, 167, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ $variant }) =>
      $variant === 'primary' ? 'rgba(106, 167, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const IndexLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const NavLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-right: 4px;
`;

// ============================================================================
// Helper Functions
// ============================================================================

function getCurrentFlowIndex(pathname: string): number {
  // Exact match first
  const exactIndex = PROTOTYPE_FLOW.indexOf(pathname);
  if (exactIndex !== -1) return exactIndex;

  // Check for partial matches (for nested routes)
  for (let i = 0; i < PROTOTYPE_FLOW.length; i++) {
    if (pathname.startsWith(PROTOTYPE_FLOW[i]) && PROTOTYPE_FLOW[i] !== '/') {
      return i;
    }
  }

  return -1;
}

// ============================================================================
// Component
// ============================================================================

export function PrototypeNav({
  prevPath,
  nextPath,
  backLabel = 'Back',
  forwardLabel = 'Forward',
  onForward,
  onBack,
  onLoadDemoData,
  onResetData,
  isDemoDataLoaded = false,
}: PrototypeNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = getCurrentFlowIndex(location.pathname);

  // Determine previous and next paths
  const computedPrevPath = prevPath !== undefined 
    ? prevPath 
    : currentIndex > 0 
      ? PROTOTYPE_FLOW[currentIndex - 1] 
      : null;

  const computedNextPath = nextPath !== undefined 
    ? nextPath 
    : currentIndex >= 0 && currentIndex < PROTOTYPE_FLOW.length - 1 
      ? PROTOTYPE_FLOW[currentIndex + 1] 
      : null;

  const isAtIndex = location.pathname === '/';

  // Forward is enabled if there's a callback OR a valid path
  const forwardEnabled = !!onForward || !!computedNextPath;
  // Back is enabled if there's a callback OR a valid path
  const backEnabled = !!onBack || !!computedPrevPath;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (computedPrevPath) {
      navigate(computedPrevPath);
    }
  };

  const handleForward = () => {
    if (onForward) {
      onForward();
    } else if (computedNextPath) {
      navigate(computedNextPath);
    }
  };

  return (
    <NavFooter>
      {/* Left Section - Index */}
      <NavSection>
        {!isAtIndex && (
          <IndexLink to="/">
            <span>←</span>
            Index
          </IndexLink>
        )}
      </NavSection>

      {/* Center Section - Demo Data & Reset */}
      <NavSection>
        <NavButton 
          onClick={onLoadDemoData}
          disabled={!onLoadDemoData || isDemoDataLoaded}
          title={isDemoDataLoaded ? "Demo data loaded" : "Load demo data"}
          $variant={isDemoDataLoaded ? 'primary' : undefined}
        >
          {isDemoDataLoaded ? '✓ Demo data' : 'Demo data'}
        </NavButton>
        <IconButton 
          onClick={onResetData}
          disabled={!onResetData}
          title="Reset to empty"
        >
          ↺
        </IconButton>
      </NavSection>

      {/* Right Section - Navigation Controls */}
      <NavSection>
        <NavLabel>Navigate:</NavLabel>
        <NavButton
          onClick={handleBack}
          disabled={!backEnabled}
          title={computedPrevPath ? `Go to ${computedPrevPath}` : 'No previous page'}
        >
          <span>←</span>
          {backLabel}
        </NavButton>

        <NavButton
          $variant="primary"
          onClick={handleForward}
          disabled={!forwardEnabled}
          title={onForward ? 'Continue' : computedNextPath ? `Skip to ${computedNextPath}` : 'No next page'}
        >
          {forwardLabel}
          <span>→</span>
        </NavButton>
      </NavSection>
    </NavFooter>
  );
}

export default PrototypeNav;
