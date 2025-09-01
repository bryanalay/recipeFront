import React, { useState, FormEvent, useRef } from 'react';

// Re-utiliza la interfaz proporcionada
export interface RecipeDataResponse {
  _id: string;
  images?: string[];
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
}

// Valores iniciales del formulario para un nuevo objeto de receta
const initialRecipeState: Omit<RecipeDataResponse, '_id'> = {
  images: [],
  title: '',
  description: '',
  ingredients: [''],
  steps: [''],
};

const NewRecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState(initialRecipeState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maneja los terrenos en los campos de texto del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Maneja los cambios para los arrays de ingredientes y pasos
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'ingredients' | 'steps') => {
    const newArray = [...recipe[field]];
    newArray[index] = e.target.value;
    setRecipe({ ...recipe, [field]: newArray });
  };

  // Añade un nuevo campo de entrada para ingredientes o pasos
  const handleAddInput = (field: 'ingredients' | 'steps') => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ''] });
  };

  // Elimina un campo de entrada para ingredientes o pasos
  const handleRemoveInput = (index: number, field: 'ingredients' | 'steps') => {
    const newArray = recipe[field].filter((_, i) => i !== index);
    setRecipe({ ...recipe, [field]: newArray });
  };

  // Maneja la carga de múltiples archivos de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files); // Convertir FileList a array
      const newImages: string[] = [];

      // Procesar cada archivo
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            // Actualizar el estado solo cuando todas las imágenes estén procesadas
            if (newImages.length === files.length) {
              setRecipe((prev) => ({
                ...prev,
                images: [...(prev.images || []), ...newImages],
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('New Recipe Submitted:', recipe); // Imprimir el estado actual
    // Aquí podrías enviar la receta al servidor
    // onAddRecipe(recipe);

    // Reiniciar el formulario
    setRecipe(initialRecipeState);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-screen mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 min-w-screen md:min-w-[450px] lg:min-w-[600px]">
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
            className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
          />
        </div>

        {recipe.images && recipe.images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {recipe.images.map((image, index) => (
              <div key={index} className="relative">
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
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 text-sm text-gray-600 border border-gray-300 hover:bg-gray-100"
        >
          Crear Receta
        </button>
      </form>
    </div>
  );
};

export default NewRecipeForm;