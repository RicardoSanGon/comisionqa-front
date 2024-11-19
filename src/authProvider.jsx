
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies"; 
import { fetchDataPost, fetchData2 } from "./fetchData";
import authConfig from "./configs/authConfig";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const defaultProvider = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const navigate = useNavigate();
    useEffect(() => {
      setLoading(true);
    const initAuth = async () => {
        const cookies = parseCookies(); 
        const storedToken = cookies[authConfig.storageTokenKeyName];
        if (storedToken !== undefined && storedToken !== null) {
            
            try {
                const response = await fetchData2(authConfig.meEndpoint, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setUser({ ...response }); 
            } catch (error) {
                console.error("Error fetching user data:", error);
                handleLogout(); 
            } finally {
                setLoading(false);
            }
        } else {
            console.log("No hay token almacenado, cerrando sesión.");
        }
    };
    initAuth();
}, []);

  const handleLogin = (params, errorCallback) => {
      if (!params || !params.email || !params.password) {
    return;
  }
    setLoading(true);

    fetchDataPost(authConfig.loginEndpoint, params)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error en el login');
        }
        setCookie(
          null,
          authConfig.storageTokenKeyName,
          data.token,
          {
            maxAge: 60 * 60 * 24 * 365,
            path: "/", 
            sameSite: 'strict'
          }
          );
          const profileResponse = await fetchData2(authConfig.meEndpoint, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        setUser({ ...profileResponse });
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        if (errorCallback) errorCallback(err.message);
      });
  };


  const handleLogout = () => {
    setUser(null);
    destroyCookie({}, authConfig.storageTokenKeyName, {
      path: "/",
    });
    navigate('/');
  };

  const values = {
    user,
    setUser,
    login: handleLogin,
    logout: handleLogout,
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export { AuthContext, AuthProvider };