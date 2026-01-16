import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardBody } from '@/ui/primitives';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.76);
  padding: 8px 10px;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover { 
    background: rgba(255,255,255,0.04); 
  }
`;

const ActionBar = styled.div<{ $isSticky?: boolean }>`
  position: ${(p) => (p.$isSticky ? 'fixed' : 'relative')};
  bottom: ${(p) => (p.$isSticky ? '0' : 'auto')};
  left: ${(p) => (p.$isSticky ? '272px' : 'auto')};
  right: ${(p) => (p.$isSticky ? '0' : 'auto')};
  width: 100%;
  max-width: ${(p) => (p.$isSticky ? 'none' : '800px')};
  margin: ${(p) => (p.$isSticky ? '0' : '0 auto')};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: var(--bg);
  border-top: 1px solid var(--border);
  z-index: ${(p) => (p.$isSticky ? '100' : 'auto')};
  box-shadow: ${(p) => (p.$isSticky ? '0 -4px 12px rgba(0, 0, 0, 0.15)' : 'none')};
  
  @media (max-width: 1120px) {
    left: ${(p) => (p.$isSticky ? '0' : 'auto')};
  }
`;

const FormWrapper = styled.div.attrs<{ $needsPadding?: boolean }>((props) => ({
  style: {
    paddingBottom: props.$needsPadding ? '80px' : '0',
  },
}))<{ $needsPadding?: boolean }>``;

export interface DrillDownViewProps {
  /** The back link text (e.g., "< Locations") */
  backLinkText: string;
  /** The path to navigate back to */
  backPath: string;
  /** The title of the form (e.g., "New location" or "Edit location") */
  title: string;
  /** The form content */
  children: React.ReactNode;
  /** The submit button label (e.g., "Create" or "Update") */
  submitLabel: string;
  /** Whether the form is in a loading/submitting state */
  isLoading?: boolean;
  /** Whether the submit button should be disabled */
  isSubmitDisabled?: boolean;
  /** Callback when cancel is clicked */
  onCancel: () => void;
  /** Callback when submit is clicked */
  onSubmit: () => void;
  /** Optional visibility section (shown before Cancel button) */
  visibilitySection?: React.ReactNode;
  /** Optional delete button */
  onDelete?: () => void;
  /** Whether delete button should be disabled */
  isDeleteDisabled?: boolean;
}

export function DrillDownView({
  backLinkText,
  backPath,
  title,
  children,
  submitLabel,
  isLoading = false,
  isSubmitDisabled = false,
  onCancel,
  onSubmit,
  visibilitySection,
  onDelete,
  isDeleteDisabled = false,
}: DrillDownViewProps) {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleBack = () => {
    navigate(backPath);
  };

  useEffect(() => {
    const checkContentHeight = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const contentBottom = rect.bottom;
        const viewportHeight = window.innerHeight;
        // Check if content extends past viewport (accounting for action bar height ~68px)
        setIsSticky(contentBottom > viewportHeight - 80);
      }
    };

    // Initial check
    checkContentHeight();
    
    // Check on resize
    window.addEventListener('resize', checkContentHeight);
    window.addEventListener('scroll', checkContentHeight);
    
    // Use MutationObserver to detect content changes
    const observer = new MutationObserver(checkContentHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    // Also check after a short delay to catch async content
    const timeoutId = setTimeout(checkContentHeight, 100);

    return () => {
      window.removeEventListener('resize', checkContentHeight);
      window.removeEventListener('scroll', checkContentHeight);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [children]);

  return (
    <>
      <SettingsPageLayout title="" subtitle="">
        <BackLink onClick={handleBack}>
          <span aria-hidden="true">‹</span>
          <span>{backLinkText}</span>
        </BackLink>
        
        <div ref={contentRef}>
          <FormWrapper $needsPadding={isSticky}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardBody style={{ padding: 0 }}>
                {children}
              </CardBody>
            </Card>
            {!isSticky && (
              <ActionBar $isSticky={false}>
                {onDelete && (
                  <Button
                    $variant="danger"
                    onClick={onDelete}
                    disabled={isDeleteDisabled || isLoading}
                    style={{ marginRight: 'auto' }}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  $variant="ghost"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  $variant="primary"
                  onClick={onSubmit}
                  disabled={isSubmitDisabled || isLoading}
                >
                  {isLoading ? 'Processing...' : submitLabel}
                </Button>
              </ActionBar>
            )}
          </FormWrapper>
        </div>
      </SettingsPageLayout>
      
      {isSticky && (
        <ActionBar $isSticky={true}>
          {onDelete && (
            <Button
              $variant="danger"
              onClick={onDelete}
              disabled={isDeleteDisabled || isLoading}
              style={{ marginRight: 'auto' }}
            >
              Delete
            </Button>
          )}
          <Button
            $variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            $variant="primary"
            onClick={onSubmit}
            disabled={isSubmitDisabled || isLoading}
          >
            {isLoading ? 'Processing...' : submitLabel}
          </Button>
        </ActionBar>
      )}
    </>
  );
}
