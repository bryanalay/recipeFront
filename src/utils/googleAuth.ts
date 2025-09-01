export const getGoogleAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:5173/auth/callback", // Debe coincidir con el URI configurado en Google Console
    client_id: "917540164191-k9vbv4tbhq7alitcgq63drsk2r50ik57.apps.googleusercontent.com", // Reemplaza con tu Client ID
    access_type: "offline", // Para obtener un refresh token (opcional)
    response_type: "code", // Flujo de código de autorización
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email", // Alcances requeridos
    prompt: "consent", // Fuerza la pantalla de consentimiento (opcional)
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};