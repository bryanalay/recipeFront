import axios from "axios";
import { SERVERNAME,authPath } from "../utils/";
import {userMailAccount} from "../utils/userTypes";

async function googleAuth(code:string, redirect_uri:string) {
  return await axios.post(SERVERNAME+authPath.googleAuth,{code, redirect_uri}).then((response)=>{return response.data});
}

async function mailAuth(newUser:userMailAccount){
  try {
    return await axios.post(SERVERNAME+authPath.mailAuth,newUser).then((response)=>{return response.data});
  } catch (error) {
    console.error("Error en mailAuth:", error);
  }
}

async function createAccountWithMail(newUser:userMailAccount) {
  try {
    return await axios.post(SERVERNAME+authPath.createUserMail, newUser).then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error("Error en createAccountWithMail:", error);
  }
}

interface User{
  id: string,
  email: string,
  username: string,
  role: string,
}

// interface UserDataResponse {
//   data: User;
//   message?: string;
// }

async function getUserData(token: string) :Promise<User | null> {
  try {
    const response = await axios.get<User>(
      SERVERNAME + authPath.getUserDataByToken,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error:unknown) {
    if(axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    console.error("Error fetching user data:", error);
    return null;
  }
}

export { mailAuth, googleAuth, createAccountWithMail, getUserData };