import React, { useEffect, useState } from 'react';
import imageNotFound from '../../../assets/images/avatar.png';
import './Feed.scss';
import { GET_PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Action } from '../../Modal/ModalPublication/Action';
import { CommentForm } from '../../Modal/ModalPublication/CommentForm';
import {ModalPublication} from '../../Modal/ModalPublication';

export default function Feed() {
    const [show, setShow] = useState(false);
    const [publicationSelect, setPublicationSelect] = useState(null);
    const { data, loading,startPolling,stopPolling } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);
    const [publications, setPublications] = useState([]);
    useEffect(() => {
        getData();
        console.log("entrooooooo")
        startPolling(5000);
        return()=>{
            stopPolling();
        }
    }, [data,startPolling,stopPolling]);

    const getData = async () => {
        setPublications(data?.getPublicationsFolloweds)
    }

    const handleModalPublication=(e)=>{
        setShow(true);
        setPublicationSelect(e)
    }

    if (loading) return null;
    return (
        <>
            <div className="feed">
                {publications && publications.map((e, i) => (
                    <div key={i} className="feed__box">
                        <Link to={`/${e.idUser.username}`}>
                            <div className="feed__box-user">
                                <Image src={e.idUser.avatar || imageNotFound} avatar />
                                <span>{e.idUser.name}</span>
                            </div>
                        </Link>
                        <div className="feed__box-photo" style={{ backgroundImage: `url(${e.file})` }} onClick={()=>handleModalPublication(e)} />
                        <div className="feed__box-actions">
                            <Action publication={e} />
                        </div>
                        <div className="feed__box-form">
                            <CommentForm publication={e} />
                        </div>
                    </div>
                ))}
            </div>
            {show&&(
                <ModalPublication show={show} setShow={setShow} publication={publicationSelect}/>
            )}

        </>
    )
}
