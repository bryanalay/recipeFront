import React, { useState } from 'react';
import AiRecipe from '../../components/Recipe/AiRecipe';
import { genRecipe } from '../../services/recipeService';

const RecipeGenerator: React.FC = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeContent, setRecipeContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecipeContent(null);

    async function fetchPostRecipe(rl:string, cnt:string){
      const response = await genRecipe(rl,cnt)
      if(response){
        setRecipeContent(response);

      }else{
        setError('Failed to generate recipe. Please try again.');
      }
    }
    fetchPostRecipe('assistant', recipeName);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center py-8">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
          Recipe Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="recipeInput"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Enter Recipe Name
            </label>
            <input
              id="recipeInput"
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="e.g., Dulce de Leche"
              className="w-full px-4 py-3 bg-gray-50 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !recipeName.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate Recipe'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-indigo-800 font-medium">Cooking up your recipe...</p>
        </div>
      )}

      {recipeContent && (
        <div className="mt-8 w-full max-w-3xl">
          <AiRecipe content={recipeContent} />
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;