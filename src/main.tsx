import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'
import { Toaster } from './components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
)
