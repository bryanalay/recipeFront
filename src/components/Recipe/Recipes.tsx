import { useEffect } from "react";
import { useContent } from "../../Context/ContentContext";
//import { RecipeDataResponse } from "../../services/types";
import Recipe from "./Recipe";
import { getRecipes } from "../../services/recipeService";
import PostSkeleton from "../Posts/PostSkeleton";
import { NavLink } from "react-router-dom";

// interface RecipesProps {
//   recipes: RecipeDataResponse[];
// }

const Recipes = () => {
  const {posts,setPosts} = useContent()

  useEffect(() => {
    async function fetchRecipes() {
      const response = await getRecipes();
      if(response){
        setPosts(response);
      }
    }
    fetchRecipes();
  },[setPosts])
  
  return (
    <div className="min-h-screen w-full flex flex-col md:p-5 bg-gray-100">
      {posts.length != 0 ?
      posts.slice().reverse().map((recipe) => (
        <NavLink key={recipe._id} to={`/recipe/${recipe._id}`}>
          <Recipe key={recipe._id} datapost={recipe.recipe}/>
        </NavLink>
      ))
      :<PostSkeleton />
    }
    </div>
  )
}

export default Recipes