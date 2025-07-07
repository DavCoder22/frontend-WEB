import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { catalogService } from '../services/api'
import { useCart } from '../contexts/CartContext'
import { Search, Filter, Plus, Minus, Package } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  material?: string
}

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const { addItem } = useCart()

  const { data: products = [], isLoading, error } = useQuery(
    ['products', searchTerm, selectedCategory, selectedMaterial],
    () => catalogService.getProducts()
  )

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      material: product.material,
      dimensions: product.dimensions
    })
  }

  const categories = ['Soportes', 'Piezas', 'Prototipos', 'Decorativos']
  const materials = ['PLA', 'ABS', 'PETG', 'TPU', 'Resina']

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar el catálogo</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Catálogo de Productos</h1>
        <p className="text-gray-600">Explora nuestra colección de productos 3D</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <label htmlFor="category-select" className="sr-only">Filtrar por categoría</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
              title="Filtrar por categoría"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div className="relative">
            <label htmlFor="material-select" className="sr-only">Filtrar por material</label>
            <select
              id="material-select"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="input-field"
              title="Filtrar por material"
            >
              <option value="">Todos los materiales</option>
              {materials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('')
              setSelectedMaterial('')
            }}
            className="btn-secondary"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            
            {product.dimensions && (
              <div className="text-xs text-gray-500 mb-3">
                <p>Dimensiones: {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</p>
              </div>
            )}
            
            {product.material && (
              <div className="text-xs text-gray-500 mb-3">
                <p>Material: {product.material}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn-primary text-sm px-3 py-1"
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron productos</p>
        </div>
      )}
    </div>
  )
}

export default Catalog 