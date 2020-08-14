import React,{useState,useEffect,useMemo} from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import {Auth} from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import { getToken, decodeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import { Home } from './pages/Home';
import moment from 'moment';

function App() {
  const [auth,setAuth]=useState(undefined);
  useEffect(()=>{
    const token=getToken();
    try {
      //ojo es recomendable usar rutas protegidas
      const encrypted=decodeToken(token);
      console.log('encrypted',encrypted);
      (encrypted.exp <= moment().unix()) ? setAuth(null): setAuth(encrypted);
    } catch (error) {
      console.log(error);
      setAuth(null);
    }
   /*  if(token){
      setAuth(token)
    }else{
      setAuth(null);
    } */
  },[auth]);

  const logout=()=>{
    console.log('cerrar sesion')
  }

  const setUser=(user)=>{
    setAuth(user);
  }

  const authData=useMemo(
    ()=>({
      auth,
      logout,
      setUser
    }),[auth]);

  return (
    <>
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
      {!auth?<Auth/>:<Home/>}
       <ToastContainer 
       position="top-right"
       autoClose={5000}
       hideProgressBar
       newestOnTop
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       />

      </AuthContext.Provider>
    </ApolloProvider>
    </>
  );
}

export default App;
