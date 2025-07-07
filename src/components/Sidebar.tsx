import { NavLink } from 'react-router-dom'
import {
  Home,
  Package,
  ShoppingCart,
  Calculator,
  CreditCard,
  MessageSquare,
  ClipboardList,
  Users,
  Settings
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = () => {
  const { role } = useAuth()

  // Menú para usuario (cliente)
  const userNavItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/catalog', icon: Package, label: 'Catálogo' },
    { path: '/cart', icon: ShoppingCart, label: 'Carrito' },
    { path: '/quotation', icon: Calculator, label: 'Cotización' },
    { path: '/payment', icon: CreditCard, label: 'Pagos' },
    { path: '/messaging', icon: MessageSquare, label: 'Mensajería' },
  ]

  // Menú para impresor
  const printerNavItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/orders', icon: ClipboardList, label: 'Pedidos' },
    { path: '/messaging', icon: MessageSquare, label: 'Mensajería' },
    { path: '/clients', icon: Users, label: 'Clientes' },
    { path: '/settings', icon: Settings, label: 'Configuración' },
  ]

  const navItems = role === 'impresor' ? printerNavItems : userNavItems

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="mt-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg mx-3 transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar 