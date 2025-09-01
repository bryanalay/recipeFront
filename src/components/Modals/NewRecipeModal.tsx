import NewRecipeForm from "../Posts/NewRecipeForm";
import Modal from "./Modal";

interface NewRecipeModalProps {
  isOpen?: boolean;
  onClose?: ()=>void;
}

const NewRecipeModal = ({ isOpen,  onClose }:NewRecipeModalProps) => {
  isOpen = false;
  return (
    <div className=''>
      <Modal isOpen={isOpen} onClose={()=>onClose}>
        <NewRecipeForm />
      </Modal>
    </div>
  )
}

export default NewRecipeModal