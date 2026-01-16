import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalStyle } from '@/styles/GlobalStyle';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Get base path from the HTML base tag or detect from URL
// For GitHub Pages, Vite will inject a <base> tag during build
let basePath: string | undefined = undefined;
const baseTag = document.querySelector('base');
if (baseTag && baseTag.getAttribute('href')) {
  const href = baseTag.getAttribute('href')!;
  basePath = href !== '/' ? href : undefined;
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter basename={basePath === '/' ? undefined : basePath}>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>Error loading application</h1>
      <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
      <p>Check the browser console for more details.</p>
    </div>
  `;
}

