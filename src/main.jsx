import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log(
  '%c Designed & Built by Shlok Shah ',
  'background: #060614; color: #c8ff00; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 6px; border: 1px solid #c8ff00;'
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
