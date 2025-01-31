import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import "react-resizable/css/styles.css";

import './index.css'
import { App } from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          <App />
        </FluentProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
