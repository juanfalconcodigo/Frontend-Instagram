import React, { useState, useEffect } from 'react'
import { GET_COMMENTS } from '../../../../gql/comment';
import { useQuery } from '@apollo/client';
import ImageNotFound from '../../../../assets/images/avatar.png';
import './Comment.scss';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
export default function Comment({ publication }) {
    const { data, loading,startPolling,stopPolling } = useQuery(GET_COMMENTS, { variables: { idPublication: publication?.id } });
    const [comments, setComments] = useState([]);
    useEffect(() => {
        startPolling(5000);
        return () => {
            stopPolling();
        };
    }, [startPolling,stopPolling]);


    useEffect(() => {
        const getData = () => {
            setComments(data?.getComments);
            console.log(data?.getComments)
        }
        getData();
    }, [data]);

    if (loading) return null;


    return (
        <>
            <div className="comments">
                {comments && comments.map((e, i) => (
                    <Link to={`/${e.idUser.username}`} key={i} className="comment">
                        <Image src={e.idUser.avatar || ImageNotFound} avatar />
                        <div>
                            <p>{e.idUser.username}</p>
                            <p>{e.comment}</p>
                        </div>

                    </Link>
                ))}
            </div>
        </>
    )
}
