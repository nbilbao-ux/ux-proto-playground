import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Muted, PageSubtitle, PageTitle, VStack } from '@/ui/primitives';

const Wrap = styled.div`
  padding: 26px;
  max-width: 980px;
`;

export function Home() {
  return (
    <Wrap>
      <VStack gap={14}>
        <div>
          <PageTitle>Enterprise app prototype</PageTitle>
          <PageSubtitle>Use this sandbox to iterate on settings IA, patterns, and layouts.</PageSubtitle>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <Link to="/settings/account/profile">
              <Button variant="primary">Open settings</Button>
            </Link>
          </CardHeader>
          <CardBody>
            <Muted>
              This is a lightweight UI prototype (no backend). The goal is to push design concepts quickly: page layout,
              navigation taxonomy, and settings patterns.
            </Muted>
          </CardBody>
        </Card>
      </VStack>
    </Wrap>
  );
}

