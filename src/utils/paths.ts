export const SERVERNAME = "https://myrecipeapi.onrender.com";

export const authPath = {
  googleAuth: "/api/auth/google",
  mailAuth: "/api/auth/login",
  createUserMail: "/api/user/new",
  getUserDataByToken: "/api/user/token",
}

export const PostsPath = {
  getPostById: (id: string) => `/api/posts/${id}`,
  getRecipes: "/api/postRecipe/all",
  getrecipeById: (id:string)=>`/api/postRecipe/${id}`,
  getCommentsByRecipeId: (id:string)=>`/api/postRecipe/comments/${id}`,
  newComment: `/api/postrecipe/comments/new`,
  getRecipesByUserId: (id:string)=>`/api/postRecipe/user/${id}`,
  newRecipe: '/api/recipe/new',
  genRecipe: '/api/ia/gen-recipe',
  deleteRecipe: (id:string) => `/api/postrecipe/${id}`,
}