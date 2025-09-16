import { useEffect, useState } from "react"
import { getCommentsByRecipeId, getRecipeById } from "../../services/recipeService"
import { Comment, CommentDataResponse, PostRecipeDataResponse, userPost } from "../../services/types";
import Recipe from "../Recipe/Recipe";
import PostSkeleton from "./PostSkeleton";
import PostCommentSkeleton from "./PostCommentSkeleton";
import { postComment } from "../../services/recipeService";

interface RecipePostViewProps{
  recipeId: string;
  user: userPost;
}

const RecipePostView = ({recipeId, user}:RecipePostViewProps) => {
  const [post, setPost ] = useState<PostRecipeDataResponse | null>(null);
  const [comments, setComments] = useState<CommentDataResponse | null>(null);
  const [newComment, setNewComment] = useState(""); // campo para escribir

  

  // simular envío de comentario
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(newComment.trim() === "") return;
    const comment:Comment = {
      _id: Math.random().toString(36).substring(2, 9), // id simulado
      comments_id: comments?._id || "",
      content: newComment,
      user: {
        _id: user._id,
        name: user.name // nombre simulado, en un caso real se obtendría del contexto o estado global
      }
    }
    if (comments) {
    setComments({
      ...comments,
      comments: [...comments.comments, comment], // aquí agregamos el nuevo comentario
    });
    
  }
  console.log("Enviar comentario:", newComment);
  // aquí iría tu lógica para hacer POST al backend
  async function SaveComment(){
    if(comments?._id != ''){

      await postComment(user._id, comments?._id ?? "", newComment)
    }else{
      console.log('No se pudo guardar el comentario');
    }
  }
  SaveComment()
  //setComments()
  setNewComment(""); 
  console.log('COMENTARIO AGREGADO: ', comments);
  }

  useEffect(()=>{
    async function getPost(recipeId:string){
      const response = await getRecipeById(recipeId);
      if(response) setPost(response);
    }
    async function getComments(recipeId:string){
      const response = await getCommentsByRecipeId(recipeId)
      if(response) setComments(response);
    }
    getPost(recipeId)
    getComments(recipeId)
  },[recipeId])

  return (
    <div>
      {post ? <Recipe datapost={post.recipe} userData={post.user}/>: <PostSkeleton/>}

      {/* campo para comentar */}
      <div className="m-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
          <textarea
            value={newComment}
            required
            onChange={(e)=>setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full md:flex-1 border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={2}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition"
          >
            Comentar
          </button>
        </form>
      </div>

      {/* listado de comentarios */}
      {comments ? (
        <div className="m-6">
          <h2 className="text-lg font-semibold mb-3">Comentarios</h2>
          <div className="space-y-4">
            {comments.comments.slice().reverse().map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center mb-2">
                  {/* Avatar inicial con la primera letra del nombre */}
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white mr-3">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {comment.user.name}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      ) : <PostCommentSkeleton/>}
    </div>
  )
}

export default RecipePostView
