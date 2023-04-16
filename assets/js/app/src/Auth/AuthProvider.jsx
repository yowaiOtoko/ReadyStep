import { createContext, useContext, useMemo } from "react";
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
  const login = async ({email, password}) => {
    return http.post('/login', {
      email,
      password
    }).then(
      (response) => {
        setUser(response.data.user)
        setToken(response.data.token)
        return response;
      }
    ).catch(
      (error) => {
        console.log(error);
      }

    )

  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);

  };

  const register = async ({firstName, lastName, email, password}) => {
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
    if(!token || !user){
      return false
    }

    const isExpired = Date.now() >= user.exp * 1000;
    return !isExpired;
  }

  const isStudent = () => {

    const token = parseJwt(localStorage.getItem(jwtConfig.storageTokenKeyName));
    const roles = token ? token.roles : [];
    return roles.includes('ROLE_STUDENT');
  }

  const isTeacher = () => {

    const token = parseJwt(localStorage.getItem(jwtConfig.storageTokenKeyName));
    const roles = token ? token.roles : [];
    return roles.includes('ROLE_TEACHER');
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      isLogged: isLogged(),
      isStudent: isStudent(),
      isTeacher: isTeacher(),
      token,
      authConfig: jwtConfig,
      studentHome: '/student/home',
      teacherHome: '/teach/home',
      adminHome: '/admin/home',
      loginPage: '/login',
    }),
    [user, token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


}

export const useAuth = () => {
  return useContext(AuthContext);
};