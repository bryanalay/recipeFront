import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"


const useAuth = () =>{

    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  }

const Home = () => {

  const { token } = useAuth()

  return (
    <div className="min-h-screen w-full flex flex-col p-5 bg-gray-100">
      <div className="max-w-xs overflow-auto break-words ">Home, {token}</div>
    </div>
  )
}

export default Home