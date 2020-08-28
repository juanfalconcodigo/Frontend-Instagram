import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FOLLOWERS, FOLLOWEDS } from '../../../../gql/follow';
import { ModalBasic } from '../../../Modal/ModalBasic';
import { ListUser } from '../../ListUser';
import './Follower.scss';


export default function Follower({ username }) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [children, setChildren] = useState(null);
    const { data: dataFollowers, loading: loadingFollowers, startPolling: startPollingFollowers, stopPolling: stopPollingFollowers } = useQuery(FOLLOWERS, { variables: { username } });
    const { data: dataFolloweds, loading: loadingFolloweds, startPolling: startPollingFolloweds, stopPolling: stopPollingFolloweds } = useQuery(FOLLOWEDS,{variables:{username}});
    useEffect(() => {
        startPollingFollowers(5000);
        startPollingFolloweds(5000);
        return () => {
            stopPollingFollowers();
            stopPollingFolloweds();
        }
    }, [startPollingFollowers, stopPollingFollowers,startPollingFolloweds,stopPollingFolloweds]);


   

    if (loadingFollowers||loadingFolloweds) return null;

    const openFollowers = () => {
        setTitle("Seguidores");
        setChildren(<ListUser users={dataFollowers?.getFollowers} setShow={setShow} />);
        setShow(true);
    }

    const openFolloweds=()=>{
        setTitle("Seguidos");
        setChildren(<ListUser users={dataFolloweds?.getFolloweds} setShow={setShow} />);
        setShow(true);
    }

    return (
        <>
            <div className="followers">
                <p><span>**</span> publicaciones</p>
                <p className="link" onClick={openFollowers}><span>{dataFollowers?.getFollowers && dataFollowers.getFollowers.length}</span> seguidores</p>
                <p className="link" onClick={openFolloweds}><span>{dataFolloweds?.getFolloweds && dataFolloweds?.getFolloweds.length}</span> seguidos</p>
            </div>
            <ModalBasic show={show} setShow={setShow} title={title}>
                {children}
            </ModalBasic>
        </>
    )
}
