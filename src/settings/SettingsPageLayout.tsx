import React from 'react';
import styled from 'styled-components';
import { PageSubtitle, PageTitle, VStack } from '@/ui/primitives';

const Wrap = styled.div`
  padding: 26px 26px 60px;
  max-width: 1020px;
`;

export function SettingsPageLayout(props: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}) {
  return (
    <Wrap>
      <VStack gap={14}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <PageTitle>{props.title}</PageTitle>
            {props.subtitle ? <PageSubtitle>{props.subtitle}</PageSubtitle> : null}
          </div>
          {props.headerRight ? <div>{props.headerRight}</div> : null}
        </div>
        {props.children}
      </VStack>
    </Wrap>
  );
}

