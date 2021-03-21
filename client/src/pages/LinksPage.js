import React from 'react'
import { useHTTP } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import LinkList from '../components/LinkList'

function LinksPage() {
    const [links, setLinks] = React.useState([])
    const { loading, request } = useHTTP()
    const auth = React.useContext(AuthContext)

    const fetchLinks = React.useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setLinks(fetched)
        } catch (e) {

        }
    }, [auth.token, request])

    React.useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <LinkList links={links} />
        </>
    )
}

export default LinksPage
