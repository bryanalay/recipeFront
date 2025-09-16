import { createContext, ReactNode, useContext, useState, useCallback, useMemo } from 'react';
import { PostRecipeDataResponse } from '../services/types';

interface ContentContextType {
  posts: PostRecipeDataResponse[];
  setPosts: (posts: PostRecipeDataResponse[]) => void;
  deletePost: (id: string) => void;
  editPost: (id: string, updatedPost: PostRecipeDataResponse) => void;
  userRecipes: PostRecipeDataResponse[];
  setUserRecipes: (userRecipes: PostRecipeDataResponse[]) => void;
}

interface ContentProviderProps {
  children: ReactNode;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const ContentProvider = ({ children }: ContentProviderProps) => {
  const [posts, setPostsState] = useState<PostRecipeDataResponse[]>([]);
  const [userRecipes, setUserRecipesState] = useState<PostRecipeDataResponse[]>([]);

  const setPosts = useCallback((posts: PostRecipeDataResponse[]) => {
    setPostsState(posts);
  }, []);

  const setUserRecipes = useCallback((userRecipes: PostRecipeDataResponse[]) => {
    setUserRecipesState(userRecipes);
  }, []);

  const deletePost = useCallback((id: string) => {
    setPostsState((prevPosts) => prevPosts.filter((post) => post._id !== id));
  }, []);

  const editPost = useCallback((id: string, updatedPost: PostRecipeDataResponse) => {
    setPostsState((prevPosts) =>
      prevPosts.map((post) => (post._id === id ? updatedPost : post))
    );
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);
  const memoizedUserRecipes = useMemo(() => userRecipes, [userRecipes]);

  console.log('ContentProvider renderizado');
  console.log('memoizedPosts:', memoizedPosts);

  return (
    <ContentContext.Provider
      value={{
        posts: memoizedPosts,
        setPosts,
        deletePost,
        editPost,
        userRecipes: memoizedUserRecipes,
        setUserRecipes,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export { ContentContext, ContentProvider, useContent };