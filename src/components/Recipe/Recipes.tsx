import { useEffect, useMemo } from 'react';
import { useContent } from '../../Context/ContentContext';
import Recipe from './Recipe';
import { getRecipes } from '../../services/recipeService';
import PostSkeleton from '../Posts/PostSkeleton';
import { NavLink } from 'react-router-dom';
import { PostRecipeDataResponse } from '../../services/types';

const Recipes = () => {
  const { posts, setPosts } = useContent();

  useEffect(() => {
    async function fetchRecipes() {
      const response = await getRecipes();
      if (response) {
        // Memoiza los datos para evitar nuevas referencias
        const memoizedResponse = response.map((item: PostRecipeDataResponse) => ({
          _id: item._id,
          recipe: {
            _id: item.recipe._id,
            title: item.recipe.title,
            description: item.recipe.description,
            ingredients: item.recipe.ingredients,
            steps: item.recipe.steps,
            images: item.recipe.images,
          },
          user: item.user, // Use 'user' instead of 'userData'
        }));
        setPosts(memoizedResponse);
      }
    }
    fetchRecipes();
  }, [setPosts]);

  const recipeData = useMemo(() => {
    return posts.slice().reverse();
  }, [posts]);

  console.log('Recipes renderizado');
  console.log('recipeData:', recipeData);
  console.log('recipeData[0].recipe.images:', recipeData[0]?.recipe.images);

  return (
    <div className="min-h-screen w-full flex flex-col md:p-5 bg-gray-100">
      {recipeData.length !== 0 ? (
        recipeData.map((recipe) => (
          <NavLink key={recipe._id} to={`/recipe/${recipe._id}`}>
            <Recipe key={recipe._id} datapost={recipe.recipe} />
          </NavLink>
        ))
      ) : (
        <PostSkeleton />
      )}
    </div>
  );
};

export default Recipes;