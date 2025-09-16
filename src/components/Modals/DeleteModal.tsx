import { useCallback } from 'react';
import Modal from './Modal';

interface DeleteModalProps {
  deleteAction: (confirm: boolean) => void;
  isOpen: boolean;
}

const DeleteModal = ({ deleteAction, isOpen }: DeleteModalProps) => {
  // Estabiliza las funciones de los botones
  const handleCancel = useCallback(() => {
    deleteAction(false);
  }, [deleteAction]);

  const handleDelete = useCallback(() => {
    console.log('Eliminar receta');
    deleteAction(true); // Confirma la eliminación
  }, [deleteAction]);

  console.log('DeleteModal renderizado', isOpen); // Para debug

  return (
    <Modal onClose={handleCancel} isOpen={isOpen} title="Eliminar post">
      <p>¿Estás seguro que deseas eliminar este post?</p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;