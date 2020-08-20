import React from 'react';
import { Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import {PasswordForm} from '../PasswordForm';
import {EmailForm} from '../EmailForm';
import {DescriptionForm} from '../DescriptionForm';
import {SiteWebForm} from '../SiteWebForm';
import './SettingsForm.scss';







export default function SettingsForm({setShowModal,setTitleModal,setChildrenModal,getUser,refetch}) {
    const {logout}=useAuth();
    const history=useHistory();
    const client=useApolloClient();
    const handleLogout=()=>{
        client.clearStore();
        logout();
        history.push('/');
    }
    const handleChangePassword=()=>{
        setTitleModal("Cambiar contraseña");
        setChildrenModal(<PasswordForm handleLogout={handleLogout}/>)
    }
    const handleEmail=()=>{
        setTitleModal("Cambiar email");
        setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch}/>)
    }

    const handleDescription=()=>{
        setTitleModal("Actualizar tu biografía");
        setChildrenModal(<DescriptionForm setShowModal={setShowModal} refetch={refetch} currentDescription={getUser.description}/>)
    }
    const handleSiteWeb=()=>{
        setTitleModal("Actualizar tu sitio web");
        setChildrenModal(<SiteWebForm setShowModal={setShowModal} refetch={refetch} currentSiteWeb={getUser.siteWeb}/>)
    }
    return (
        <div className="settings-form">
            <Button onClick={handleChangePassword}>Cambiar contraseña</Button>
            <Button onClick={handleEmail}>Cambiar email</Button>
            <Button onClick={handleDescription}>Descripción</Button>
            <Button onClick={handleSiteWeb}>Sitio Web</Button>
            <Button onClick={handleLogout}>Cerrar sesión</Button>
            <Button onClick={()=>setShowModal(false)}>Cancelar</Button>
        </div>
    )
}
