import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'
import { 
  Package, 
  ShoppingCart, 
  Calculator, 
  CreditCard, 
  TrendingUp,
  Clock
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const { itemCount, total } = useCart()

  const stats = [
    {
      title: 'Productos en Catálogo',
      value: '150+',
      icon: Package,
      color: 'bg-blue-500',
      link: '/catalog'
    },
    {
      title: 'Items en Carrito',
      value: itemCount.toString(),
      icon: ShoppingCart,
      color: 'bg-green-500',
      link: '/cart'
    },
    {
      title: 'Cotizaciones Activas',
      value: '3',
      icon: Calculator,
      color: 'bg-purple-500',
      link: '/quotation'
    },
    {
      title: 'Total Carrito',
      value: `$${total.toFixed(2)}`,
      icon: CreditCard,
      color: 'bg-orange-500',
      link: '/cart'
    }
  ]

  const quickActions = [
    {
      title: 'Explorar Catálogo',
      description: 'Ver productos y materiales disponibles',
      icon: Package,
      link: '/catalog',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      title: 'Crear Cotización',
      description: 'Generar una nueva cotización',
      icon: Calculator,
      link: '/quotation',
      color: 'bg-purple-50 text-purple-700'
    },
    {
      title: 'Ver Carrito',
      description: 'Revisar items en el carrito',
      icon: ShoppingCart,
      link: '/cart',
      color: 'bg-green-50 text-green-700'
    },
    {
      title: 'Pagos',
      description: 'Gestionar pagos y facturas',
      icon: CreditCard,
      link: '/payment',
      color: 'bg-orange-50 text-orange-700'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-gray-600">
          Gestiona tus cotizaciones y pedidos de impresión 3D
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="card hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="card hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <h3 className="ml-3 font-medium text-gray-900">{action.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="card">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Cotización creada exitosamente
                </p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Producto agregado al carrito
                </p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Pedido en proceso de impresión
                </p>
                <p className="text-xs text-gray-500">Hace 3 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 