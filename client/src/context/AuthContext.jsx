import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(sessionStorage.getItem('onyx_token'))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = sessionStorage.getItem('onyx_token')

            try {
                const response = await fetch('/onyx/api/v1/users/me', {
                    credentials: 'include',
                    headers: storedToken ? {
                        Authorization: `Bearer ${storedToken}`,
                    } : {},
                })

                if (response.ok) {
                    const data = await response.json()
                    const activeToken = storedToken || data.token

                    if (!activeToken) {
                        throw new Error('No authentication token available')
                    }

                    setUser(data.user)
                    sessionStorage.setItem('onyx_token', activeToken)
                    setToken(activeToken)
                } else {
                    sessionStorage.removeItem('onyx_token')
                    setUser(null)
                    setToken(null)
                }
            } catch {
                sessionStorage.removeItem('onyx_token')
                setUser(null)
                setToken(null)
            } finally {
                setIsLoading(false)
            }
        }

        verifyToken()
    }, [])

    const login = (newToken, userData) => {
        sessionStorage.setItem('onyx_token', newToken)
        setToken(newToken)
        setUser(userData)
    }

    const logout = () => {
        fetch('/onyx/api/v1/users/logout', {
            method: 'POST',
            credentials: 'include',
        }).catch(() => {})

        sessionStorage.removeItem('onyx_token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
