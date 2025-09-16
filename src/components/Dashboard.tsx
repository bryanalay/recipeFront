import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { getRecipes } from "../services/recipeService";
import { getUserData } from "../services";
import Recipes from "./Recipe/Recipes";

const Dashboard = () => {

  const auth = useAuth()
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { setToken } = auth;
  console.log('estoy en dashboard, se repide?');
  useEffect(()=>{
    const tokenSaved = localStorage.getItem('token');
    if (tokenSaved && typeof setToken === "function") {
      const response = getRecipes()
      console.log('response from getRecipes', response);
      const recipes = getUserData(tokenSaved);
      console.log('userdata', recipes);
      setToken(tokenSaved)
    }
  },[setToken])
  return (
    <div className="min-h-screen w-full flex flex-col md:p-5 bg-gray-100">
      <Recipes />
    </div>
  );
};

export default Dashboard;