import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/Login';
import Register from './views/Register';
import User from './views/User';
import Catalogues from './views/Catalogues';
import Layout from './views/Layout';
import { AuthProvider } from './authProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="users" element={<User />} />
            <Route path="catalogues" element={<Catalogues />} />
            {/* Puedes agregar más rutas aquí */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
