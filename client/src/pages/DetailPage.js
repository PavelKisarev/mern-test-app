import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHTTP } from '../hooks/http.hook'
import LinkCard from '../components/LinkCard'

function DetailPage() {
    const { token } = React.useContext(AuthContext)
    const { request, loading } = useHTTP()
    const [link, setLink] = React.useState(null)

    const linkId = useParams().id

    const getLink = React.useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(data)
        } catch (e) {

        }
    }, [token, linkId, request])

    React.useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}

export default DetailPage
