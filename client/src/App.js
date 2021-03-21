import 'materialize-css'

import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import Loader from './components/Loader'

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if (!ready) {
    return <Loader />
  }


  return (
    <AuthContext.Provider value={
      { login, logout, token, userId, isAuth }
    }>
      <Router >
        {isAuth && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router >
    </AuthContext.Provider>
  );
}

export default App;
