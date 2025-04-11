import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./component/CardContext.jsx";
import { WishlistContext, WishlistProvider } from './component/WishlistContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </WishlistProvider>
  </StrictMode>,
)


