import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/api'

export type UserRole = 'usuario' | 'impresor' | 'admin'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
  role: UserRole | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authService.profile()
        .then(response => {
          const userData = response.data
          setUser({
            ...userData,
            role: userData.email === 'dsmalquin@uce.edu.ec' ? 'admin' : (userData.role as UserRole)
          })
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      setUser({
        ...userData,
        role: userData.email === 'dsmalquin@uce.edu.ec' ? 'admin' : (userData.role as UserRole)
      })
    } catch (error) {
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const response = await authService.register({ name, email, password, role })
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      setUser({
        ...userData,
        role: userData.email === 'dsmalquin@uce.edu.ec' ? 'admin' : (userData.role as UserRole)
      })
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    role:
      user?.email === 'dsmalquin@uce.edu.ec'
        ? 'admin'
        : user?.role || null,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 