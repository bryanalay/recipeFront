import { useState, useCallback } from 'react';
import { RecipeDataResponse, userPost } from '../../services/types';
import { useAuth } from '../../Context/AuthContext';
import { useContent } from '../../Context/ContentContext';
import DeleteModal from '../Modals/DeleteModal';
import { deleteRecipe } from '../../services/recipeService';

interface RecipePostProps {
  datapost: RecipeDataResponse;
  userData?: userPost;
}

const Recipe = ({ datapost, userData }: RecipePostProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const auth = useAuth();
  const { user, setIsOpenModal, isOpenModal, token } = auth;
  const { deletePost } = useContent();

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // async function handleDeletePost(){
  //   if(!datapost._id) return;
  //   const response = await deleteRecipe(datapost._id)
  //   if(response){
  //     deletePost(datapost._id);
      
  //     console.log('Receta eliminada:', datapost._id);
  //   } else {
  //     console.error('Error al eliminar receta');
  //   }
  // }

  const handleCloseModal = useCallback(
    async (confirm: boolean) => {
      if (confirm) {
        setIsDeleting(true);
        try {
          if(!datapost._id) throw new Error('No hay id de receta');
          if(!token) throw new Error('No hay token');
          const response = await deleteRecipe(datapost._id );
          console.log(response);
          console.log('Receta eliminada:', datapost._id);
          if(datapost._id){
            deletePost(datapost._id);
          }
        } catch (error) {
          console.error('Error al eliminar receta:', error);
        } finally {
          setIsDeleting(false);
        }
      }
      setIsOpenModal(false);
    },
    [setIsOpenModal, deletePost, datapost._id, token]
  );

  const handleNextImage = useCallback(() => {
    if (datapost.images && datapost.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % (datapost.images?.length ?? 1));
    }
  }, [datapost.images]);

  const handlePrevImage = useCallback(() => {
    if (datapost.images && datapost.images.length > 0) {
      setCurrentImageIndex((prev) => {
        const length = datapost.images?.length ?? 1;
        return (prev - 1 + length) % length;
      });
    }
  }, [datapost.images]);

  console.log('Recipe renderizado', datapost._id);
  console.log('datapost.images:', datapost.images);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4 relative" key={datapost._id}>
      {isOpenModal && <DeleteModal deleteAction={handleCloseModal} isOpen={isOpenModal} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {userData && (user?.id === userData?._id && (
          <button
            onClick={() => setIsOpenModal(true)}
            disabled={isDeleting}
            className={`absolute top-2 right-2 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              isDeleting
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            aria-label="Eliminar receta"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        ))}
        <div className="relative">
          <img
            src={datapost.images?.[currentImageIndex] ?? '/fallback.jpg'}
            alt={datapost.title}
            className="w-full h-96 object-cover rounded-t-md"
          />
          {datapost.images && datapost.images.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2">
              <button
                onClick={handlePrevImage}
                className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                aria-label="Imagen anterior"
              >
                ←
              </button>
              <button
                onClick={handleNextImage}
                className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                aria-label="Siguiente imagen"
              >
                →
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-3">
          <div className="text-xl font-semibold">{datapost.title}</div>
          <div className="text-gray-700">{datapost.description}</div>
          <div>
            <h3 className="font-semibold">Ingredientes:</h3>
            <p>{datapost.ingredients}</p>
          </div>
          <div>
            <h3 className="font-semibold">Pasos:</h3>
            <p>{datapost.steps}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;