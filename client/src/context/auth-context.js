import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const AuthContext = createContext({
  currentUser: null,
  setUser: () => { },
  logout: () => { },
  getProfile:()=>{},
  resetUser:()=>{},
  favoriteProducts:null,
  isFavoriteLoading:true,
  isLoading:true
})

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState( null);
  const [isLoading,setIsLoading]=useState(true);
  const [favoriteProducts,setFavoriteProducts]=useState(null);
  const [isFavoriteLoading,setIsFavoriteLoading]=useState(true);

  const [err, setErr] = useState({
    registerErr: null,
    loginErr: null,
    logoutErr: null
  })
  axios.defaults.withCredentials = true;
  // const register = async (inputs) => {
  //   const res = await axios.post('http://localhost:8000/register', {
  //     name: inputs.name,
  //     email: inputs.email,
  //     password: inputs.password
  //   })
  //   if (res.data.status == 'success') {
  //     setErr(prevErr => ({
  //       ...prevErr,
  //       registerErr: null
  //     }))
  //   } else {
  //     setErr(prevErr => ({
  //       ...prevErr,
  //       registerErr: res.data.Error
  //     }))

  //   }

  // }
  // const login = async (inputs) => {
  //   const res = await axios.post('http://localhost:8000/login', inputs);
  //   if (res.data.status === "success") {
  //     setCurrentUser(res.data.user)
  //   }
  //   else {
  //     setCurrentUser(null)
  //     setErr(prevErr => ({
  //       ...prevErr,
  //       loginErr: "Email Or Password Incorrect"
  //     }))
  //   }

  // }
  const resetUser = () => {
    setCurrentUser(null);
  }
  const logout = async (inputs) => {
     axios.get('http://localhost:8000/logout').then(
      res => {
        setCurrentUser(null);
        window.location.reload(true);
      }
    ).catch(err => console.log(err))
  }

  const setUser=()=>{
    getProfile();
  }
  const getProfile=async ()=>{
    axios.get('http://localhost:8000/profile/id=1').then(
      res=>{
        setCurrentUser(res.data.user)
        setIsLoading(false);
        getFavoriteProducts();
      }
    ).catch(err=>{
      console.log(err);
      setCurrentUser(null);
      setIsLoading(false);
      setIsFavoriteLoading(false);
    })
  }

  useEffect(() => {
    getProfile();
  }, [])

  const getFavoriteProducts=async()=>{
    setIsFavoriteLoading(true)
    try {
      const response = await axios.get(`http://localhost:8000/userFavoriteProducts`);
      setFavoriteProducts(response.data.favoriteProductIds)
      setIsFavoriteLoading(false)
  } catch (error) {
      console.error('Error fetching favorite products:', error);
      setIsFavoriteLoading(false)
  }
  }
  return <AuthContext.Provider value={{ currentUser, setUser, logout,isLoading,resetUser,favoriteProducts,isFavoriteLoading}}>{props.children}</AuthContext.Provider>
}
