const authConfig = {
  loginEndpoint: 'http://localhost:5002/api/auth/login', // Verifica que esta URL sea correcta
  meEndpoint: 'http://localhost:5002/api/auth/profile',
  storageTokenKeyName: 'authToken',
};

export default authConfig;