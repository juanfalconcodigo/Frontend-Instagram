import React,{useState,useEffect,useMemo} from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import {Auth} from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';
import moment from 'moment';


function App() {
  const [auth,setAuth]=useState(undefined);
  useEffect(()=>{
    const token=getToken();
    try {
      //ojo es recomendable usar rutas protegidas
      const encrypted=decodeToken(token);
      console.log('encrypted',encrypted);
      (encrypted.exp <= moment().unix()) ? logout(): setAuth(encrypted);
    } catch (error) {
      console.log(error);
      setAuth(null);
    }
   /*  if(token){
      setAuth(token)
    }else{
      setAuth(null);
    } */
  },[]);

  const logout=()=>{
    console.log('cerrar sesion');
    removeToken();
    setAuth(null);
    
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

    if(auth===undefined) return null;

  return (
    <>
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
      {!auth?<Auth/>:<Navigation/>}
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
