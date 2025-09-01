import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import NewRecipeForm from "../Posts/NewRecipeForm";


const NewRecipe = () => {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { token } = auth;
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen w-full">
      {token? 
        <NewRecipeForm/>
        : 
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Debes iniciar sesión para crear una receta
          </h2>
          <NavLink
            to={"/login"}
            className="bg-indigo-500 rounded-xl text-white px-3 py-2 text-sm font-medium border-b-2 border-indigo-500"
          >
            Inicia sesión
          </NavLink>
        </div>}
    </div>

  )
}

export default NewRecipe