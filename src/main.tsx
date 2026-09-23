// Ensure window.fetch has both getter and setter so external environments or proxies can safely assign it
try {
  if (typeof window !== 'undefined') {
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (!desc || (!desc.writable && !desc.set)) {
      let currentFetch = window.fetch;
      Object.defineProperty(window, 'fetch', {
        get() {
          return currentFetch;
        },
        set(val) {
          currentFetch = val;
        },
        configurable: true,
        enumerable: true,
      });
    }
  }
} catch {
  // Ignore if already configured
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
