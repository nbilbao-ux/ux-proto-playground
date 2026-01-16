import React from 'react';
import styled from 'styled-components';
import { PageSubtitle, PageTitle, VStack } from '@/ui/primitives';

const Wrap = styled.div`
  padding: 24px 24px 60px;
  width: 100%;
  max-width: 1280px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
`;

const FormContent = styled.div<{ $wide?: boolean }>`
  width: 100%;
  max-width: ${(p) => (p.$wide ? '1280px' : '800px')};
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HeaderContainer = styled.div<{ $wide?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: ${(p) => (p.$wide ? '1280px' : '800px')};
`;

const FullWidthContent = styled.div`
  width: calc(100% + 480px);
  max-width: 1280px;
  margin-left: -240px;
  margin-right: -240px;
  
  @media (max-width: 1120px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

// Helper to check if a React element is a table or contains tables
function containsTable(element: React.ReactNode): boolean {
  if (!React.isValidElement(element)) return false;
  
  // Check the component type
  const type = (element.type as any);
  const typeName = type?.displayName || type?.name || '';
  const typeString = String(type);
  
  // Check for table-related component names
  if (typeName === 'table' || typeName === 'Table' || typeName === 'NotificationTable') return true;
  
  // Check for native HTML table elements
  if (typeString === 'table' || type === 'table') return true;
  
  // Check props for table indicators (like overflowX: 'auto' which often wraps tables)
  const props = element.props as any;
  if (props?.style?.overflowX === 'auto' || props?.style?.overflow === 'auto') {
    // This might be a table wrapper, check children
    if (props?.children) {
      const children = React.Children.toArray(props.children);
      if (children.some(child => containsTable(child))) return true;
    }
  }
  
  // Recursively check children
  if (props?.children) {
    const children = React.Children.toArray(props.children);
    if (children.some(child => containsTable(child))) return true;
  }
  
  return false;
}

export function SettingsPageLayout(props: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  wide?: boolean;
}) {
  const childrenArray = React.Children.toArray(props.children);
  const processedChildren = childrenArray.map((child, index) => {
    if (containsTable(child)) {
      return <FullWidthContent key={index}>{child}</FullWidthContent>;
    }
    return child;
  });

  return (
    <Wrap>
      <ContentWrapper>
        <HeaderContainer $wide={props.wide}>
          <div>
            <PageTitle>{props.title}</PageTitle>
            {props.subtitle ? <PageSubtitle>{props.subtitle}</PageSubtitle> : null}
          </div>
          {props.headerRight ? <div>{props.headerRight}</div> : null}
        </HeaderContainer>
        <FormContent $wide={props.wide}>{processedChildren}</FormContent>
      </ContentWrapper>
    </Wrap>
  );
}

// Export utility components for explicit control
SettingsPageLayout.FormContent = FormContent;
SettingsPageLayout.FullWidth = FullWidthContent;

