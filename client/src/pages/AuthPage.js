import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHTTP } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.error.hook'

function AuthPage() {

    const auth = React.useContext(AuthContext)
    const message = useMessage()

    const { loading, error, request, clearError } = useHTTP()

    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })

    React.useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeFormHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/registration', 'POST', { ...form })
            message(data.message)
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            message(data.message)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>AUTH PAGE</h2>
                <div className="card blue">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <form className="" autoComplete="off">
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate"
                                    name="email"
                                    onChange={changeFormHandler}
                                    autoComplete="off"
                                    value={form.email}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    className="validate"
                                    name="password"
                                    onChange={changeFormHandler}
                                    autoComplete="off"
                                    value={form.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </form>
                    </div>
                    <div className="card-action set-btn-pos">
                        <button
                            className="btn green darken-1"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn purple lighten-1"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
