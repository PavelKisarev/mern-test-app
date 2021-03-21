import React from 'react'

export const useHTTP = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const request = React.useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                console.log(headers)
            }
            let response = await fetch(url, {
                method,
                body,
                headers
            })

            const data = await response.json()


            if (!response.ok) {
                throw new Error(data.message || 'Что то пошло не так')
            }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = React.useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}