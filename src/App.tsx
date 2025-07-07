import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Quotation from './pages/Quotation'
import Payment from './pages/Payment'
import Messaging from './pages/Messaging'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import Orders from './pages/Orders'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="quotation" element={<Quotation />} />
            <Route path="payment" element={<Payment />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App 