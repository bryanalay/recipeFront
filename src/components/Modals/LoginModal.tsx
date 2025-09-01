import { useAuth } from "../../Context/AuthContext";
import Login from "../Login"
import Modal from "./Modal"

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
export const LoginModal = () => {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { loginModal, setLoginModal } = auth;
  return (
    <Modal isOpen={loginModal} onClose={()=>{setLoginModal(false)}} title="Login">
      <Login/>
    </Modal>
  )
}
