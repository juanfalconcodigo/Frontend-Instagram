import React from 'react'
import './Home.scss';
import useAuth from '../../hooks/useAuth';


export default function Home() {
    const auth=useAuth();
    console.log(auth);
    return (
        <>
        <p>Home</p>
        </>
    )
}
