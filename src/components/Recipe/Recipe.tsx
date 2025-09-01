import { useEffect, useState } from 'react';
import { RecipeDataResponse } from '../../services/types';

interface RecipePostProps {
  datapost: RecipeDataResponse;
}

const Recipe = ({ datapost }: RecipePostProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!datapost.images || datapost.images.length <= 1) return;

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % datapost.images!.length);
      setProgress(100);
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1, 0)); // baja 1% cada 50ms → 5s total
    }, 50);

    return () => {
      clearInterval(imageInterval);
      clearInterval(progressInterval);
    };
  }, [datapost.images]);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4" key={datapost._id}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <img
            src={datapost.images?.[currentImageIndex] ?? '/fallback.jpg'}
            alt={datapost.title}
            className="w-full h-96 object-cover rounded-t-md"
          />
          <div className="w-full bg-gray-100 h-1 rounded-b-full">
            <div
              className="bg-gray-200 h-1 rounded-b-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
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
