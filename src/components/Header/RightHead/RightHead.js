import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import noimage from '../../../assets/images/avatar.png'
import useAuth from '../../../hooks/useAuth';
import { GET_USER } from '../../../gql/user';
import { useQuery } from '@apollo/client';
import './RightHead.scss';



export default function RightHead() {
  const { auth: { username } } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username }
  });

  if(loading||error) return null;
  const {getUser}=data;

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon name="plus" />
        <Link to={`/${username}`}>
          <Image avatar src={(getUser.avatar)?getUser.avatar:noimage} />
        </Link>

      </div>
    </>
  )
}
