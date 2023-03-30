import { createContext, useContext, useMemo } from "react";
import { redirect } from "react-router-dom";
import { post } from "../_helper/utils";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", '');


  // call this function when you want to authenticate the user
  const login = async ({email, password}) => {
    return post('/login', {
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
    return post('/signup', {
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


  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


}

export const useAuth = () => {
  return useContext(AuthContext);
};