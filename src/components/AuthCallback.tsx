import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { googleAuth } from "../services/authService";
import { useAuth } from "../Context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(location.search);
      console.log('este es el location', location);
      console.log('este es el location.search', location.search);
      console.log('este es el params', params);
      const code = params.get("code"); // Extrae el código de autorización

      if (code) {
        try {
          // Intercambia el código por un token en el backend
          const googleAuthServerResponse = await googleAuth(code, "http://localhost:5173/auth/callback");
          // const response = await axios.post("https://myrecipeapi.onrender.com/api/auth/google", {
          //   code,
          //   redirect_uri: "http://localhost:5173/auth/callback",
          // });

          const { user, token } = googleAuthServerResponse
          console.log('respuesta de post a /api/auth/google ',googleAuthServerResponse);
          console.log("Usuario:", user);

          // Guarda el token o datos del usuario (por ejemplo, en localStorage)
          localStorage.setItem("token", token);
          if (auth && typeof auth.login === "function") {
            auth.login(user, token);
          }
          
          navigate("/recipes"); // Redirige al usuario a la página deseada
        } catch (error) {
          console.error("Error al obtener el token:", error);
          navigate("/login"); // Redirige al login si falla
        }
      }
    };

    getToken();
  }, [location, navigate]);

  return <div>Cargando...</div>;
};

export default AuthCallback;