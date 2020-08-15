import React from 'react';
import './UserNotFound.scss';
import { Link } from 'react-router-dom';

export default function UserNotFound() {
    return (
        <>
        <div className="user-not-found">
           <p>Usuario no encontrado</p>
           <p>
               Es posible que el enlace seguido es incorrecto o el usuario haya
               eliminado su cuenta
           </p> 
           <Link to="/">Volver a la Home</Link>
        </div>
        </>
    )
}
