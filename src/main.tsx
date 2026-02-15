import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WalletContextProvider } from './context/wallet-context.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <WalletContextProvider>
    <Toaster richColors={true} />
    <App />
  </WalletContextProvider>,
)
