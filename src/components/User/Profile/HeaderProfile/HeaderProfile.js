import React from 'react';
import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW,FOLLOW,UN_FOLLOW } from '../../../../gql/follow';
import './HeaderProfile.scss';


export default function HeaderProfile({ getUser, auth, handleChildren }) {
    const { data, loading } = useQuery(IS_FOLLOW, { variables: { username: getUser.username } });
    const[follow]=useMutation(FOLLOW,{
        update(cache,{data:{follow}}){
            cache.writeQuery({
                variables:{
                    username: getUser.username
                },
                query:IS_FOLLOW,
                data:{
                    isFollow:follow
                }
            });
        }
    });
    const [unFollow]=useMutation(UN_FOLLOW,{
        update(cache,{data:{unFollow}}){
            cache.writeQuery({
                variables:{
                    username: getUser.username
                },
                query:IS_FOLLOW,
                data:{
                    isFollow:!unFollow
                }
            });
        }
    });

    console.log(data);

    const bottonFollow = () => {
        if (data?.isFollow) {
            return (
                <Button className="btn-danger" onClick={handleUnFollow}>Dejar de seguir</Button>
            )
        } else {
            return (
                <Button className="btn-action" onClick={handleFollow}>Seguir</Button>
            )
        }
    }

    const handleFollow=async()=>{
       try {
        await follow({variables:{username:getUser.username}});
       } catch (error) {
           console.log(error.message);
       }  
    }

    const handleUnFollow=async()=>{
        try {
            await unFollow({variables:{username:getUser.username}});
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="header-profile">
                <h2>{getUser.username}</h2>
                {getUser.username === auth.username ? (
                    <Button onClick={() => handleChildren("settings")}>Ajustes</Button>
                ) : (
                        !loading && bottonFollow()
                    )}
            </div>
        </>
    )
}
