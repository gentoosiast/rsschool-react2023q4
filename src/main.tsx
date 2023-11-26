import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>Hello, RS School!</h1>
  </StrictMode>,
);
