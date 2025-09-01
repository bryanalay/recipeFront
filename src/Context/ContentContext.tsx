import { createContext, ReactNode, useContext, useState } from "react";
import { PostRecipeDataResponse } from "../services/types";

//interfaces de contexto
//metodos o estados para el contexto del contenido de la app
interface ContentContextType {
  posts: PostRecipeDataResponse[];
  setPosts: (posts:PostRecipeDataResponse[])=>void;
  deletePost?: (id:string)=>void;
  editPost?: (id:string, updatedPost:PostRecipeDataResponse)=>void;
  userRecipes: PostRecipeDataResponse[];
  setUserRecipes: (userRecipes:PostRecipeDataResponse[])=>void;
}

//interfaz del provider
interface ContentProviderProps {
  children: ReactNode;
}

const ContentContext = createContext<ContentContextType|undefined>(undefined);


const ContentProvider = ({children}:ContentProviderProps) =>{
  const [posts,setPosts] = useState<PostRecipeDataResponse[]>([]);
  const [userRecipes,setUserRecipes] = useState<PostRecipeDataResponse[]>([]);

  function deletePost(id:string){
    posts.filter(post => post._id !== id)
  }

  function editPost(id:string, updatedPost:PostRecipeDataResponse){
    const updatedPosts = posts.map(post => post._id === id ? updatedPost : post);
    //logica para actualizar el post en el backend si es necesario
    setPosts(updatedPosts);

  }
  return (
    <ContentContext.Provider value={{posts, setPosts, deletePost, editPost, userRecipes, setUserRecipes}}>
      {children}
    </ContentContext.Provider>
  )
}

const useContent = () => {
  const context = useContext(ContentContext);
  if(!context){
    throw new Error("useContent must be used within ContentProvider")
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ContentContext, ContentProvider, useContent }