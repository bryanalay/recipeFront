import axios from "axios";
import { SERVERNAME,PostsPath } from "../utils";
import { CommentDataResponse, newCommentResponse, PostRecipeDataResponse, RecipeDataResponse } from "./types";

async function getRecipes(): Promise<PostRecipeDataResponse[]|null>{
  try {
    const response = await axios.get<PostRecipeDataResponse[]>(SERVERNAME+PostsPath.getRecipes);
    if(!response.data){
      return null;
    }
    return response.data;
  } catch (error:unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      return null;
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

async function getRecipeById(recipeId:string):Promise<PostRecipeDataResponse|null>{
  try {
    const response = await axios.get<PostRecipeDataResponse>(SERVERNAME+PostsPath.getrecipeById(recipeId))
    if(!response.data){
      return null;
    }
    return response.data
  } catch (error:unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      return null;
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

async function getRecipesByUserId(userId:string):Promise<PostRecipeDataResponse[]|null>{
  try {
    const response = await axios.get<PostRecipeDataResponse[]>(SERVERNAME+PostsPath.getRecipesByUserId(userId))
    if(!response.data){
      return null;
    }
    return response.data
  } catch (error:unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      return null;
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

async function getCommentsByRecipeId(recipeId:string):Promise<CommentDataResponse|null>{
try {
    const response = await axios.get<CommentDataResponse>(SERVERNAME+PostsPath.getCommentsByRecipeId(recipeId))
    if(!response.data){
      return null;
    }
    return response.data
  } catch (error:unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      return null;
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

async function newComment(user_id:string, comments_id:string, content:string):Promise<newCommentResponse|null>{
  try {
    const response = await axios.post<newCommentResponse>(SERVERNAME+PostsPath.newComment,{
      user_id,
      comments_id,
      content,
    })
    if(!response.data){
      return null;
    }
    return response.data
  } catch (error: unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      return null;
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

// async function newRecipe(recipe:RecipeDataResponse,):Promise<string|null>{
//   try {
//     const response = await axios.post<RecipeDataResponse>(SERVERNAME+PostsPath.newComment,{
//       user_id,
//       comments_id,
//       content,
//     })
//     if(!response.data){
//       return null;
//     }
//     return response.data
//   } catch (error: unknown) {
//     if(axios.isAxiosError(error)&& error.response?.status === 401){
//       return null;
//     }
//     console.error("Error fetching recipe data:", error)
//     return null;
//   }
// }

export { getRecipes, getRecipeById, getCommentsByRecipeId, newComment, getRecipesByUserId };