import React, { useEffect, useState } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { getUserData } from '../services';
import { useAuth } from '../Context/AuthContext';
import { loggedUser } from '../utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Define rutas donde el header no debe aparecer
  const hiddenRoutes = ['/login', '/signup', '/admin'];
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login, logOut, token } = auth;

  useEffect(() => {
    async function fetchUserData(token: string) {
      const response = await getUserData(token);
      if (!response) {
        localStorage.removeItem('token');
        console.error('Token is invalid or expired');
        return;
      }

      const userData: loggedUser = {
        name: response?.username,
        email: response.email,
        role: response.role,
        id: response.id,
      };
      login(userData, token);
      setIsMenuOpen(false);
    }

    console.log('Pide a la api informacion con el token guardado en localstorage');
    const tokenSaved = localStorage.getItem('token');
    if (tokenSaved) {
      try {
        fetchUserData(tokenSaved);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  // Verifica si la ruta actual está en el array hiddenRoutes
  if (hiddenRoutes.includes(location.pathname)) {
    return null; // No renderiza el header
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Usamos Link para la navegación interna */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="./recipeslogo.png" alt="" className='h-10 md:h-12'/>
            </Link>
          </div>

          {/* Desktop Navigation - Usamos NavLink para resaltar el enlace activo */}
          <nav className="hidden md:flex space-x-8 justify-center items-center">
            <NavLink
              to="/newrecipe"
              className={
                `bg-indigo-300 rounded-xl text-white   px-3 py-2 text-sm font-medium
                  border-b-2 border-indigo-500 hover:bg-indigo-500 block h-full text-center
                `
              }
            >
              Nueva receta
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
                  isActive ? 'border-b-2 border-indigo-500' : ''
                }`
              }
            >
              Recetas
            </NavLink>
            <NavLink
              to="/genrecipe"
              className={
                "bg-indigo-500 rounded-xl text-white   px-3 py-2 text-sm font-medium border-b-2 border-indigo-700 hover:bg-indigo-700 block h-full text-center"                
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Genera receta IA
            </NavLink>
            {token &&<NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
                  isActive ? 'border-b-2 border-indigo-500' : ''
                }`
              }
            >
              Profile
            </NavLink>}
            {token ? <button onClick={logOut} className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Logout
                </button>:
                <NavLink
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
                  isActive ? 'border-b-2 border-indigo-500' : ''
                }`
              }
            >
              Login
            </NavLink>}
          </nav>

          <div className='hidden'>
            {/* User Profile or Login/Signup Links */}
            {auth?.user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{auth.user.name}</span>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <button onClick={logOut} className="text-gray-600 hover:text-gray-900">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-600 hover:text-gray-900">
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/newrecipe"
              className={
                `bg-indigo-300 text-white px-3 py-2 w-full text-base font-medium block`
                
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Nueva receta
            </NavLink>
            <NavLink
              to="/genrecipe"
              className={
                `bg-indigo-500 text-white px-3 py-2 w-full text-base font-medium block`
                
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Genera receta IA
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium ${
                  isActive ? 'bg-gray-200' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Recetas
            </NavLink>
            {/* <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium ${
                  isActive ? 'bg-gray-200' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Busqueda IA
            </NavLink> */}
            {token && <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium ${
                  isActive ? 'bg-gray-200' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </NavLink>}  
            {token && <button onClick={logOut} className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium ${
                  isActive ? 'bg-gray-200' : ''
                }">
                  Logout
                </button>} 
            {!token && <NavLink
              to="/login"
              className={({ isActive }) =>
                `block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium ${
                  isActive ? 'bg-gray-200' : ''
                }`
              }
            >
              Login
            </NavLink>}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;