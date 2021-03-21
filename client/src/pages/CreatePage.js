import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHTTP } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

function CreatePage() {
    const history = useHistory()
    const auth = React.useContext(AuthContext)
    const { request } = useHTTP()
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHendler = async (event) => {
        event.preventDefault()
        if (event.key === 'Enter') {
            try {
                console.log(`Bearer ${auth.token}`)
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })

                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2 create-page blue darken-2" style={{ paddingTop: '30px' }}>
                <form autoComplete="off">
                    <div className="input-field">
                        <input
                            id="link"
                            type="text"
                            className="validate"
                            value={link}
                            onChange={e => {
                                setLink(e.target.value)
                                console.log(e.target.value)
                            }
                            }
                            onKeyPress={pressHendler}
                        />
                        <label htmlFor="link">Вставьте ссылку сюда</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePage
