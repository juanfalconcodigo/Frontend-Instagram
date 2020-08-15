import React from 'react';
import './Profile.scss';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import { Grid, Image } from 'semantic-ui-react';
import imageNotFound from '../../assets/images/avatar.png';
import { UserNotFound } from '../UserNotFound';

export default function Profile({username}) {
    
    const {data,loading,error}=useQuery(GET_USER,{
        variables:{username}
    });
    if(loading) return null;
    if(error)return <UserNotFound/>;
    console.log(username,data.getUser);
    return (
        <>
           <Grid className="profile">
               <Grid.Column width={5} className="profile__left">
                   <Image avatar src={imageNotFound}/>
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
        </>
    )
}
