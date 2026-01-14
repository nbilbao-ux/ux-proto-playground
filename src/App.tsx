import React from 'react';
import '@ffa/latitude-typescript';
import WeChatOnboarding from './WeChatOnboarding';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

/**
 * Main App component for the UX Proto Playground
 * 
 * WeChat Supplier Onboarding Prototype
 * A mobile-first, conversational onboarding flow for Chinese suppliers
 */
function App() {
  return (
    <AppContainer>
      <WeChatOnboarding />
    </AppContainer>
  );
}

export default App;

