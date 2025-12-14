import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './lib/stripe.ts'

import { Provider } from 'react-redux'
import { store } from './store/store.ts'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </StrictMode>,
)
