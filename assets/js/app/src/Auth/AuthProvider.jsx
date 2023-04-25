import { createContext, useContext, useMemo, useState } from "react";
import { redirect } from "react-router-dom";

import { useLocalStorage } from "./useLocalStorage";
import { jwtConfig } from "../_helper/auth/jwtConfig";
import { useHttp } from "../_helper/http/useHttp";
import { parseJwt } from "../_helper/utils";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(jwtConfig.tokenUserKeyName, {});
  const [token, setToken] = useLocalStorage(jwtConfig.storageTokenKeyName);
  const http = useHttp();



  // call this function when you want to authenticate the user
  const login = (email, password) => {
    return http.post('/login', {
      email,
      password
    }).then(
      (response) => {

        setUser(response.data.user)
        setToken(response.data.token)

        return response.data.user;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  };

  const logout = () => {
    setUser(null);
    setToken(null);

  };

  const register = ({firstName, lastName, email, password}) => {
    return http.post('/signup', {
      firstName,
      lastName,
      email,
      password
    }).then(
      (response) => {
        if(response.success){
          setUser(response.data.user)
          setToken(response.data.token)
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }

    )
  }

  const isLogged = () =>
  {
    console.log(token,  user)
    if(!token || !user){
      return false
    }

    const isExpired = Date.now() >= user.exp * 1000;
    return !isExpired;
  }

  const isStudent = () => {

    const t = parseJwt(token);
    const roles = t ? t.roles : [];
    return roles.includes('ROLE_STUDENT');
  }

  const isTeacher = () => {

    const t = parseJwt(token);
    const roles = t ? t.roles : [];
    console.log("roles.includes('ROLE_TEACHER')", roles.includes('ROLE_TEACHER'))
    return roles.includes('ROLE_TEACHER');
  }

 console.log("PROVIDER", token)
  const value =  {
    user,
    token,
    login,
    logout,
    register,
    isLogged: isLogged(),
    isStudent: isStudent(),
    isTeacher: isTeacher(),
    authConfig: jwtConfig,
    studentHome: '/learn/home',
    teacherHome: '/teach/home',
    adminHome: '/admin/home',
    loginPage: '/login',
  }

  // const value = useMemo(
  //   () => {
  //     console.log("memo", token, user)

  //     return {
  //     user,
  //     login,
  //     logout,
  //     register,
  //     isLogged: isLogged(),
  //     isStudent: isStudent(),
  //     isTeacher: isTeacher(),
  //     token,
  //     authConfig: jwtConfig,
  //     studentHome: '/student/home',
  //     teacherHome: '/teach/home',
  //     adminHome: '/admin/home',
  //     loginPage: '/login',
  //   }},
  //   [user, token]
  // );
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


}

export const useAuth = () => {
  return useContext(AuthContext);
};