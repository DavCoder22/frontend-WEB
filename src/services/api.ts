import axios from 'axios'
import type { UserRole } from '../contexts/AuthContext'

// Configuración del load balancer
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

// Instancia principal de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// MOCKS PARA PRUEBAS DE DISEÑO Y NAVEGACIÓN
export const authService = {
  login: async (_: { email: string; password: string }) =>
    Promise.resolve({ data: { token: 'mock-token', user: { id: '1', name: 'Demo User', email: 'demo@demo.com', role: 'usuario' } } }),
  register: async (_: { email: string; password: string; name: string; role: UserRole }) =>
    Promise.resolve({ data: { token: 'mock-token', user: { id: '1', name: 'Demo User', email: 'demo@demo.com', role: _.role } } }),
  logout: async () => Promise.resolve({}),
  profile: async () => Promise.resolve({ data: { id: '1', name: 'Demo User', email: 'demo@demo.com', role: 'usuario' } }),
  forgotPassword: async (_: { email: string }) => Promise.resolve({ data: {} }),
}

export const catalogService = {
  getProducts: async () => Promise.resolve([
    { id: '1', name: 'Soporte 3D', description: 'Soporte para piezas', price: 15.99, category: 'Soportes', material: 'PLA', dimensions: { width: 10, height: 5, depth: 3 } },
    { id: '2', name: 'Pieza Prototipo', description: 'Prototipo funcional', price: 25.50, category: 'Prototipos', material: 'ABS', dimensions: { width: 8, height: 4, depth: 2 } },
    { id: '3', name: 'Decorativo', description: 'Figura decorativa', price: 12.00, category: 'Decorativos', material: 'Resina', dimensions: { width: 6, height: 6, depth: 6 } },
  ]),
  getProduct: async (id: string) => Promise.resolve({ id, name: 'Producto Demo', description: 'Descripción demo', price: 10, category: 'Demo', material: 'PLA', dimensions: { width: 5, height: 5, depth: 5 } }),
  getMaterials: async () => Promise.resolve([
    { id: 'm1', name: 'PLA Premium', tipo: 'filamento', fabricante: 'XYZ', disponible: true, stock: 1000, precio_por_unidad: 25.99, caracteristicas: { color: 'Natural', temperatura_impresion: 200 } },
    { id: 'm2', name: 'Resina Standard', tipo: 'resina', fabricante: 'UV Resins', disponible: true, stock: 5000, precio_por_unidad: 45.99, caracteristicas: { color: 'Transparente', temperatura_impresion: 25 } },
  ]),
  getMaterial: async (id: string) => Promise.resolve({ id, name: 'Material Demo', tipo: 'filamento', fabricante: 'XYZ', disponible: true, stock: 100, precio_por_unidad: 20, caracteristicas: { color: 'Negro', temperatura_impresion: 200 } }),
  search: async (query: string) => Promise.resolve([]),
}

export const quotationService = {
  createQuotation: async (data: any) => Promise.resolve({ data: { id: 'q1', ...data } }),
  getQuotations: async () => Promise.resolve({ data: [
    { id: 'q1', total: 100, status: 'pending', created_at: '2024-06-01', items: [] },
    { id: 'q2', total: 200, status: 'approved', created_at: '2024-06-02', items: [] },
  ] }),
  getQuotation: async (id: string) => Promise.resolve({ data: { id, total: 100, status: 'pending', created_at: '2024-06-01', items: [] } }),
  updateQuotation: async (id: string, data: any) => Promise.resolve({ data: { id, ...data } }),
  deleteQuotation: async (id: string) => Promise.resolve({}),
}

export const orderService = {
  createOrder: async (data: any) => Promise.resolve({ data: { id: 'o1', ...data } }),
  getOrders: async () => Promise.resolve({ data: [
    { id: 'o1', status: 'en_produccion', tracking: [{ status: 'recibido', date: '2024-06-01' }, { status: 'en_produccion', date: '2024-06-02' }] },
    { id: 'o2', status: 'entregado', tracking: [{ status: 'recibido', date: '2024-05-28' }, { status: 'entregado', date: '2024-05-30' }] },
  ] }),
  getOrder: async (id: string) => Promise.resolve({ data: { id, status: 'en_produccion', tracking: [{ status: 'recibido', date: '2024-06-01' }, { status: 'en_produccion', date: '2024-06-02' }] } }),
  updateOrder: async (id: string, data: any) => Promise.resolve({ data: { id, ...data } }),
  trackOrder: async (id: string) => Promise.resolve({ data: { id, status: 'en_produccion', tracking: [{ status: 'recibido', date: '2024-06-01' }, { status: 'en_produccion', date: '2024-06-02' }] } }),
}

// MOCKS PARA PAGOS Y MENSAJERÍA
// Para producción, reemplace estas funciones por llamadas reales a la API usando la URL base:
// Ejemplo: api.post(`${API_BASE_URL}/payments`, data)
// La URL base se configura con VITE_API_BASE_URL en el entorno.

export const paymentService = {
  createPayment: async (data: any) => Promise.resolve({ data: { id: 'p1', ...data } }),
  getPayments: async () => Promise.resolve({ data: [
    { id: 'p1', amount: 100, status: 'pendiente', date: '2024-06-01' },
    { id: 'p2', amount: 200, status: 'pagado', date: '2024-06-02' },
  ] }),
  getPayment: async (id: string) => Promise.resolve({ data: { id, amount: 100, status: 'pendiente', date: '2024-06-01' } }),
  processPayment: async (id: string) => Promise.resolve({ data: { id, status: 'pagado' } }),
}

export const messagingService = {
  getMessages: async () => Promise.resolve({ data: [
    { id: 'm1', from: 'usuario', to: 'impresor', content: '¿Cuándo estará listo mi pedido?', date: '2024-06-01' },
    { id: 'm2', from: 'impresor', to: 'usuario', content: 'Estará listo mañana.', date: '2024-06-01' },
  ] }),
  sendMessage: async (data: any) => Promise.resolve({ data: { id: 'm3', ...data } }),
  getConversation: async (id: string) => Promise.resolve({ data: [
    { id: 'm1', from: 'usuario', to: 'impresor', content: '¿Cuándo estará listo mi pedido?', date: '2024-06-01' },
    { id: 'm2', from: 'impresor', to: 'usuario', content: 'Estará listo mañana.', date: '2024-06-01' },
  ] }),
}

export default api 