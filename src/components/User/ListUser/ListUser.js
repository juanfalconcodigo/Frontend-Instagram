import React from 'react';
import ImageNotFound from '../../../assets/images/avatar.png'
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import './ListUser.scss';


export default function ListUser({ users, setShow }) {
    const history = useHistory();

    const goToUser = (username) => {
        setShow(false);
        history.push(`/${username}`)
    }
    return (
        <>
            <div className="list-users">
                {users.length === 0 ? (<p className="list-users__not_users">No tiene seguidores</p>) :
                    users.map((e, i) => (
                        <div key={i} className="list-users__user" onClick={()=>goToUser(e.username)}>
                            <Image src={e.avatar || ImageNotFound} avatar />
                            <div>
                                <p>{e.name}</p>
                                <p>{e.username}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
