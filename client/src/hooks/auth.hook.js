import React from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = React.useState(null)
    const [ready, setReady] = React.useState(null)
    const [userId, setUserID] = React.useState(null)


    const login = React.useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserID(id)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = React.useCallback(() => {
        setToken(null)
        setUserID(null)

        localStorage.removeItem(storageName)
    }, [])



    React.useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}