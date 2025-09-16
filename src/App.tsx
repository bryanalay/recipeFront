import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthCallback from './components/AuthCallback'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/Login/LoginPage'
import { AuthProvider } from './Context/AuthContext'
import Header from './components/Header'
import { ContentProvider } from './Context/ContentContext'
import PostView from './pages/Posts/PostView'
import NewRecipe from './components/Recipe/NewRecipe'
import Profile from './components/Profile/Profile'
import GenRecipe from './pages/Recipe/GenRecipe'
 
function App() {
  //const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/recipes" element={<Dashboard />} />
            <Route path="/recipe/:id" element={<PostView />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/newrecipe" element={<NewRecipe />} />
            <Route path="/genrecipe" element={<GenRecipe />} />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  )
}

export default App
