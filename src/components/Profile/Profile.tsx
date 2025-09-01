import { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useContent } from "../../Context/ContentContext";
import PostSkeleton from "../Posts/PostSkeleton";
import { NavLink } from "react-router-dom";
import { getRecipesByUserId } from "../../services/recipeService";
import Recipe from "../Recipe/Recipe";

const Profile = () => {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user,token } = auth;
  const { userRecipes, setUserRecipes } = useContent()

  useEffect(()=>{
    async function fetchUserRecipes(userId:string){
      if(!userId) return;
      const recipes = await getRecipesByUserId(userId)
      if(recipes){
        setUserRecipes(recipes)
      }
      console.log('recetas del usuario');
    }
    if (user?.id) {
      fetchUserRecipes(user.id);
    }
  },[setUserRecipes,token])

  return (
    <div className="min-h-screen bg-gray-100 flex items-stretch justify-center">
      {/* Contenedor general */}
      {token?<div className="bg-white shadow-md overflow-hidden w-full max-w-sm md:max-w-full
      flex flex-col">
        {/* Portada */}
        <div className="h-32 md:h-48 bg-indigo-300 relative">
          <img
            src="/cover.jpg"
            alt="cover"
            className="w-full h-full object-cover"
          />
          {/* Avatar sobre portada */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0">
            <img
              src="/recipeslogo.png"
              alt="profile-logo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="pt-16 md:pt-20 px-6 md:px-12 pb-6 text-center md:text-left">
          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500 md:text-base">
              {user?.role === "admin" ? "Administrador" : "Usuario"}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Extra section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 md:text-xl">
              Tus Recetas
            </h3>
            {userRecipes?
            <div className="min-h-screen w-full flex flex-col md:p-5 bg-gray-100">
              {userRecipes.length != 0 ?
                userRecipes.map((recipe) => (
                  <NavLink key={recipe._id} to={`/recipe/${recipe._id}`}>
                    <Recipe key={recipe._id} datapost={recipe.recipe}/>
                  </NavLink>
                ))
                :<PostSkeleton />
              }
            </div> : <PostSkeleton/>}
          </div>
        </div>
      </div>:
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Debes iniciar sesión para ver tu perfil
          </h2>
          <NavLink
            to={"/login"}
            className="bg-indigo-500 rounded-xl text-white px-3 py-2 text-sm font-medium border-b-2 border-indigo-500"
          >
            Inicia sesión
          </NavLink>
        </div>
      }
    </div>
  );
};

export default Profile;
