import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { quotationService } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Calculator, FileText, Send } from 'lucide-react'

const Quotation = () => {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [quotationId, setQuotationId] = useState('')
  const [error, setError] = useState('')
  const [customerName, setCustomerName] = useState(user?.name || '')
  const [customerEmail, setCustomerEmail] = useState(user?.email || '')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')

  const handleCreateQuotation = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError('')
    try {
      // Estructura de la orden/cotización según los README
      const quotationData = {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        notes,
        items: items.map(item => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          material: item.material,
          dimensions: item.dimensions
        })),
        subtotal: total,
        shipping: 0,
        total,
        status: 'pending',
        created_at: new Date().toISOString()
      }
      const response = await quotationService.createQuotation(quotationData)
      setQuotationId(response.data.id)
      setSuccess(true)
      clearCart()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cotización')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Cotización Creada Exitosamente!
          </h2>
          <p className="text-gray-600 mb-4">
            Tu cotización ha sido generada y enviada a nuestro equipo.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            ID de Cotización: {quotationId}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/payment')}
              className="btn-primary w-full"
            >
              Proceder al Pago
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Crear Cotización</h1>
        <p className="text-gray-600">Revisa y completa los datos para tu cotización</p>
      </div>

      {/* Quotation Form */}
      <div className="card">
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleCreateQuotation() }}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                required
                className="input-field bg-gray-50"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                required
                className="input-field bg-gray-50"
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="input-field bg-gray-50"
                placeholder="Ej: 0999999999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="input-field bg-gray-50"
                placeholder="Especificaciones, requerimientos, etc."
                rows={2}
              />
            </div>
          </div>

          {/* Quotation Items */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Calculator className="h-6 w-6 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">Resumen de Productos</h2>
            </div>
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No hay productos para cotizar</p>
                <button
                  onClick={() => navigate('/catalog')}
                  className="btn-primary"
                  type="button"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity} | ${item.price.toFixed(2)} c/u
                      </p>
                      {item.material && (
                        <p className="text-sm text-gray-600">Material: {item.material}</p>
                      )}
                      {item.dimensions && (
                        <p className="text-sm text-gray-600">
                          Dimensiones: {item.dimensions.width} × {item.dimensions.height} × {item.dimensions.depth} cm
                        </p>
                      )}
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="btn-primary flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? 'Creando...' : 'Crear Cotización'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Quotation 