import { useParams } from "react-router-dom"
import RecipePostView from "../../components/Posts/RecipePostView"
import { useAuth } from "../../Context/AuthContext";
import { userPost } from "../../services/types";

const PostView = () => {
  const { id } = useParams<{id:string}>()
  console.log('id de id paramsss', id);
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const  { user } = auth;
  const userAuth: userPost = {
    _id: user?.id ?? "",
    name: user?.name ?? "",
    email: user?.email ?? ""
  };
  return (
    <div>
      {id ? <RecipePostView user={userAuth} recipeId={id}/> : <div>Invalid post ID</div>}
    </div>
  )
}

export default PostView