import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import noimage from '../../../assets/images/avatar.png'
import useAuth from '../../../hooks/useAuth';
import './RightHead.scss';

export default function RightHead() {
    const {auth:{username}}=useAuth();
    return (
       <>
       <div className="right-header">
           <Link to="/">
             <Icon name="home"/>
           </Link>
           <Icon name="plus"/>
           <Link to={`/${username}`}>
             <Image avatar src={noimage}/>
           </Link>
           
       </div>
       </>
    )
}
