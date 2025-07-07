import { useCart } from '../contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, Package } from 'lucide-react'

const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/quotation')
  }

  if (!items || items.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carrito de Compras</h1>
          <p className="text-gray-600">Tu carrito está vacío</p>
        </div>
        <div className="card text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No tienes productos en tu carrito</p>
          <button
            onClick={() => navigate('/catalog')}
            className="btn-primary"
          >
            Explorar Catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carrito de Compras</h1>
          <p className="text-gray-600">{items.length} productos en el carrito</p>
        </div>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Cart Items */}
      <div className="card">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  {item.material && (
                    <p className="text-sm text-gray-600">Material: {item.material}</p>
                  )}
                  {item.dimensions && (
                    <p className="text-sm text-gray-600">
                      {item.dimensions.width} × {item.dimensions.height} × {item.dimensions.depth} cm
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} c/u
                  </p>
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="card">
        <div className="space-y-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button
            onClick={handleCheckout}
            className="btn-primary w-full py-3"
          >
            Proceder a Cotización
          </button>
          <button
            onClick={() => navigate('/catalog')}
            className="btn-secondary w-full py-3"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart 