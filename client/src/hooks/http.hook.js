import {useState, useCallback} from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const resp = await fetch(url, { method, body, headers })
            const data = await resp.json()

            if(!resp.ok) {
                if(resp.status === 401) {
                    throw new Error("401")
                } else {
                    throw new Error(data.message || 'Something went wrong :(')
                }
            }

            setLoading(false)
            return data

        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}