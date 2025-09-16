import React, { useState, FormEvent, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyCW59fPoJt7IkAd9pTbvL37iPQ0cKlqWZk",
  authDomain: "almi-bb52e.firebaseapp.com",
  projectId: "almi-bb52e",
  storageBucket: "almi-bb52e.appspot.com",
  messagingSenderId: "988456719615",
  appId: "1:988456719615:web:274caf336f59367d7d68ca",
  measurementId: "G-Y5PZ4L6HJ3"
};
initializeApp(firebaseConfig);

export interface RecipeDataResponse {
  _id: string;
  images?: string[];
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  isPublished?: boolean;
}

const initialRecipeState: Omit<RecipeDataResponse, '_id'> = {
  images: [],
  title: '',
  description: '',
  ingredients: [''],
  steps: [''],
  isPublished: false,
};

const NewRecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState(initialRecipeState);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'ingredients' | 'steps') => {
    const newArray = [...recipe[field]];
    newArray[index] = e.target.value;
    setRecipe({ ...recipe, [field]: newArray });
  };

  const handleAddInput = (field: 'ingredients' | 'steps') => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ''] });
  };

  const handleRemoveInput = (index: number, field: 'ingredients' | 'steps') => {
    const newArray = recipe[field].filter((_, i) => i !== index);
    setRecipe({ ...recipe, [field]: newArray });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      setError(null);
      const files = Array.from(e.target.files);
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('images', file);
      });

      try {
        const response = await fetch('https://myrecipeapi.onrender.com/api/upload/image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al subir imágenes al servidor');
        }

        const { downloadURLs } = await response.json();
        setRecipe((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...downloadURLs],
        }));
        console.log('Imágenes subidas con éxito:', downloadURLs);
      } catch (error: any) {
        setError(`Error al subir imágenes: ${error.message}`);
        console.error('Error uploading images:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log('esta es la recipe que se subira', recipe);
      const response = await fetch('https://myrecipeapi.onrender.com/api/recipe/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la receta');
      }

      console.log('Receta guardada con éxito:', await response.json());
      setRecipe(initialRecipeState);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setError(null);
      navigate('/recipes');
    } catch (error: any) {
      setError(`Error al guardar la receta: ${error.message}`);
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <div className="max-w-screen mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 min-w-screen md:min-w-[450px] lg:min-w-[600px]">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="space-y-1">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-500 outline-none min-h-[80px]"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">Ingredientes</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                required
                className="flex-1 px-3 py-2 border-b border-gray-300 focus:border-gray-500 outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveInput(index, 'ingredients')}
                className="px-2 py-1 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddInput('ingredients')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            + Añadir ingrediente
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">Pasos</h3>
          {recipe.steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={step}
                onChange={(e) => handleArrayChange(e, index, 'steps')}
                required
                className="flex-1 px-3 py-2 border-b border-gray-300 focus:border-gray-500 outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveInput(index, 'steps')}
                className="px-2 py-1 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddInput('steps')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            + Añadir paso
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">Imágenes</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
          />
          {uploading && <p className="text-sm text-gray-600">Subiendo imágenes...</p>}
        </div>

        {recipe.images && recipe.images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {recipe.images.map((image, index) => (
              <div key={index} className="relative">
                {image && (
                  <div>
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-20 h-20 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setRecipe((prev) => ({
                          ...prev,
                          images: prev.images?.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="isPublished" className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={recipe.isPublished}
              onChange={(e) => setRecipe({ ...recipe, isPublished: e.target.checked })}
              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-600">Publicar receta</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 text-sm text-gray-600 border border-gray-300 ${
            uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
        >
          Crear Receta
        </button>
      </form>
    </div>
  );
};

export default NewRecipeForm;