import React, { useState } from 'react';
import './Profile.scss';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import { Grid, Image } from 'semantic-ui-react';
import imageNotFound from '../../../assets/images/avatar.png';
import { UserNotFound } from '../../UserNotFound';
import {ModalBasic} from '../../Modal/ModalBasic';
import {AvatarForm} from '../AvatarForm';
import userAuth from '../../../hooks/useAuth';
export default function Profile({username}) {
    
    const [showModal,setShowModal]=useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null)
    const {data,loading,error}=useQuery(GET_USER,{
        variables:{username}
    });
    const {auth}=userAuth();



    if(loading) return null;
    if(error)return <UserNotFound/>;
    console.log(username,data.getUser);
    /* console.log('userAuth',auth); */



    const handleChildren=(type)=>{
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil");
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth}/>);
                setShowModal(true);
                break;
            default:
                break;
        }
    }
    return (
        <>
           <Grid className="profile">
               <Grid.Column width={5} className="profile__left">
                   <Image avatar src={data.getUser.avatar?data.getUser.avatar:imageNotFound} onClick={()=>username===auth.username && handleChildren("avatar")}/>
               </Grid.Column>
               <Grid.Column width={11} className="profile__right">
                   <div>Header Profile</div>
                   <div>Followers</div>
                   <div className="other">
                        <p className="name">{data.getUser.username}</p>
                        {data.getUser.siteWeb&&(
                            <a href={data.getUser.siteWeb} target="_blank" rel="noopener noreferrer" className="siteWeb">{data.getUser.siteWeb}</a>
                        )}
                        {data.getUser.description&&(
                            <p className="description">{data.getUser.description}</p>
                        )}
                   </div>
                </Grid.Column>
           </Grid>
           <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
              {childrenModal}
           </ModalBasic>
        </>
    )
}
