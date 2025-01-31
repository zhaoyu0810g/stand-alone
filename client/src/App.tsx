import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Shell } from './shell/Shell';

import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';

import "react-resizable/css/styles.css";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          <Shell />
        </FluentProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
