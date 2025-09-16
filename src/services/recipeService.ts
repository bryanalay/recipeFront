import axios from "axios";
import { SERVERNAME,PostsPath } from "../utils";
import { CommentDataResponse, newCommentResponse, PostPublishedRecipeResponse, PostRecipeDataResponse, RecipeDataResponse } from "./types";

async function getRecipes(): Promise<PostRecipeDataResponse[] | null> {
  try {
    const response = await axios.get<PostRecipeDataResponse[]>(SERVERNAME + PostsPath.getRecipes);
    if (!response.data) {
      return null;
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    console.error('Error fetching recipe data:', error);
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

async function postComment(user_id:string, comments_id:string, content:string):Promise<newCommentResponse|null>{
  try {
    const response = await axios.post<newCommentResponse>(SERVERNAME+PostsPath.newComment,{
      user_id,
      comments_id,
      content,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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

async function postRecipe(recipe:RecipeDataResponse):Promise<RecipeDataResponse|PostPublishedRecipeResponse|null>{
  try {

    const { title, description, ingredients, steps, images, isPublished} = recipe

    const response = await axios.post<RecipeDataResponse>(SERVERNAME+PostsPath.newRecipe,{
      title, description, ingredients, steps,images, isPublished
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    // if(!response.data){
    //   return null;
    // }
    return response.data
  } catch (error: unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      throw new Error('Unauthorized');
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

interface aigenResponse {
  id:string,
  object:string,
  choices:[
    {
      message:{
        role:string,
        content:string
      }
    }
  ]
}

async function genRecipe(role:string, content:string){
  // función para generar receta con IA
  const promtRecipe = `Eres un asistente que genera recetas de cocina en formato markdown, incluyendo título, descripción, ingredientes y pasos. Tu tarea es crear una receta basada en el siguiente nombre o descripción: "${content}". Asegúrate de que la receta sea clara, detallada y fácil de seguir. Utiliza un lenguaje amigable y atractivo para invitar a los usuarios a probar la receta.`
  const response = await axios.post<aigenResponse>(SERVERNAME+PostsPath.genRecipe,{role, content:promtRecipe},{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.choices[0]?.message.content
}

async function deleteRecipe(id:string):Promise<void|null>{
  try {
    const response = await axios.delete(SERVERNAME+PostsPath.deleteRecipe(id),{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    return response.data
  } catch (error: unknown) {
    if(axios.isAxiosError(error)&& error.response?.status === 401){
      throw new Error('Unauthorized');
    }
    console.error("Error fetching recipe data:", error)
    return null;
  }
}

export { getRecipes, getRecipeById, getCommentsByRecipeId, postComment, getRecipesByUserId, postRecipe, genRecipe, deleteRecipe };