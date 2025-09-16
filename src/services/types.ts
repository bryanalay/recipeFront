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
  _id?: string;
  images?:  []
  title: string;
  description: string;
  ingredients: string[];
  steps: string[]
  isPublished?: boolean;
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

export interface PostPublishedRecipeResponse {
  newPostRecipe: PostRecipeDataResponse;
  recipe: RecipeDataResponse;
}

///response type for create recipe and published it
// const coso = {
//     "newPostRecipe": {
//         "_id": "68c45e5b0d2639316cf325b0",
//         "createdAt": "2025-09-12T17:54:35.835Z",
//         "updatedAt": "2025-09-12T17:54:35.835Z",
//         "__v": 0,
//         "user": "689528757ef48fc42ed60334",
//         "recipe": "68c45e5b0d2639316cf325ae"
//     },
//     "recipe": {
//         "title": "rrrrrrrrr",
//         "description": "rrrrrrrrrrrr",
//         "ingredients": [
//             "rrrrrrrrrrrrrrrrrrrrrrrrrrrr"
//         ],
//         "steps": [
//             "rrrrrrrrrrrrrrrrrrrrr"
//         ],
//         "images": [
//             "https://storage.googleapis.com/almi-bb52e.appspot.com/almimg/recipes/1757699661355_sunflower-banner__12_.gif?GoogleAccessId=firebase-adminsdk-fq85e%40almi-bb52e.iam.gserviceaccount.com&Expires=1773014400&Signature=MmAnaYYDWKQQ6rWwfF2H4v%2Bb5QwMIxUZlnAgYRxZitucZ2Hy9m8%2FxqHOguURM%2FkU13cdGiikR%2B8DTzVmyYkTQfLdu4xmdeANmYIwZ5STWiRpvt%2BkKy1m7HRXcIgIOKPRaqpiqI%2FiukcW%2FyLDVMqnsTcLAHTA0dZA4rKeTZpfWGQ9DwSn70%2B2FGOeuSyhLgGCRKYrDrsCkTmfaC1aJU4XFTU3biqu1A5QdTtejEvHknlOnwAuwQw8l7qRjLnVyc8BYK6asmO61vLzBWsvhO9HZkKJeEMIUJrLE6Uyq%2FgfBqTZIsqjw4Luwo2NmgHdGJBzyP5Rxy09AyK2JVD4I299YA%3D%3D"
//         ],
//         "_id": "68c45e5b0d2639316cf325ae",
//         "createdAt": "2025-09-12T17:54:35.762Z",
//         "updatedAt": "2025-09-12T17:54:35.762Z",
//         "__v": 0
//     }
// }