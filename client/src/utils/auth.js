// client/src/utils/auth.js

const Auth = {
    // Get token from localStorage
    getToken: () => localStorage.getItem('id_token'),
  
    // Check if user is logged in
    loggedIn: () => !!localStorage.getItem('id_token'),
  
    // Save token to localStorage
    login: (idToken) => {
      localStorage.setItem('id_token', idToken);
    },
  
    // Remove token from localStorage
    logout: () => {
      localStorage.removeItem('id_token');
    }
  };
  
  export default Auth;  