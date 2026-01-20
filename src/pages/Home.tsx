import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, PageSubtitle, PageTitle, VStack } from '@/ui/primitives';

const Wrap = styled.div`
  padding: 26px;
  max-width: 980px;
`;

export function Home() {
  return (
    <Wrap>
      <VStack $gap={14}>
        <div>
          <PageTitle>Enterprise app prototype</PageTitle>
          <PageSubtitle>Use this sandbox to iterate on settings IA, patterns, and layouts.</PageSubtitle>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Experiences</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Settings</FieldLabel>
                <FieldHint>
                  This is a lightweight UI prototype (no backend). The goal is to push design concepts quickly: page layout,
                  navigation taxonomy, and settings patterns.
                </FieldHint>
              </div>
              <FieldControl>
                <Link to="/settings/account/profile">
                  <Button $variant="primary">Open settings</Button>
                </Link>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Supplier Onboarding</FieldLabel>
                <FieldHint>
                  A multi-step workflow for adding new suppliers to your network. Includes company information, contacts,
                  compliance documents, and review steps.
                </FieldHint>
              </div>
              <FieldControl>
                <Link to="/supplier-onboarding">
                  <Button $variant="primary">Start onboarding</Button>
                </Link>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </Wrap>
  );
}

