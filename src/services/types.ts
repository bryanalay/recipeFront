//defino interfaces de respuesta de la api

//userResponses
export interface UserDataResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

//recipes response
export interface RecipeDataResponse {
  _id: string;
  images?:  []
  title: string;
  description: string;
  ingredients: string[];
  steps: string[]
}

export interface Comment {
  _id: string,
  comments_id: string,
  content: string,
  user: userCommenter
}

interface userCommenter {
  _id: string,
  name: string
}

export interface CommentDataResponse {
  _id: string,
  recipe: string
  comments: Comment[],
}

export interface newCommentResponse {
  comments_id: string,
  content: string,
  _id: string,
  user: string,
}

export interface userPost {
  _id: string,
  name: string,
  email: string,
}

export interface PostRecipeDataResponse {
  _id: string;
  user: userPost;
  recipe: RecipeDataResponse;
}