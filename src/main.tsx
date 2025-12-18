import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { PasswordVaultProvider } from './contexts/PasswordVaultContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <PasswordVaultProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PasswordVaultProvider>
    </LanguageProvider>
  </StrictMode>,
)
