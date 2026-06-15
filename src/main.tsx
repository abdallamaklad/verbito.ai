import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import './index.css'
import { analytics } from './services/analytics.ts'

if (import.meta.env.PROD) {
  analytics.enable()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
