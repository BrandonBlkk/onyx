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
    const [token, setToken] = useState(localStorage.getItem('onyx_token'))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem('onyx_token')

            if (!storedToken) {
                setIsLoading(false)
                return
            }

            try {
                const response = await fetch('/onyx/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setUser(data.user)
                    setToken(storedToken)
                } else {
                    localStorage.removeItem('onyx_token')
                    setUser(null)
                    setToken(null)
                }
            } catch {
                localStorage.removeItem('onyx_token')
                setUser(null)
                setToken(null)
            } finally {
                setIsLoading(false)
            }
        }

        verifyToken()
    }, [])

    const login = (newToken, userData) => {
        localStorage.setItem('onyx_token', newToken)
        setToken(newToken)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('onyx_token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
