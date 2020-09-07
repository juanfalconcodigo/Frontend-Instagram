import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import './UserNotFollowed.scss';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import imageNotFound from '../../../assets/images/avatar.png';

export default function UserNotFollowed() {
    const [users, setUsers] = useState([]);
    const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

    useEffect(() => {
        getData();
        return () => {

        };
    }, [data]);

    const getData = () => {
        console.log(data?.getNotFolloweds);
        setUsers(data?.getNotFolloweds);
    }

    if (loading) return null;
    return (
        <>
            <div className="user-not-followed">
                <h3>Sugerencias para ti</h3>
                {users && users.map((e, i) => (
                    <Link key={i} to={`/${e.username}`} className="user-not-followed__user">
                        <Image src={e.avatar || imageNotFound} avatar />
                        <span>{e.name}</span>

                    </Link>
                ))}

            </div>
        </>
    )
}
