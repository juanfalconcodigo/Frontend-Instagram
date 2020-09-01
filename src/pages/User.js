import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../components/User/Profile';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publication';
import {Publication} from '../components/Publication/';

export default function User() {
    const {username}=useParams();
    const {data,startPolling,stopPolling}=useQuery(GET_PUBLICATIONS,{variables:{username}});
    useEffect(() => {
      startPolling(5000);
      return () => {
        stopPolling()
      }
    }, [startPolling,stopPolling])
    return (
        <>
          <Profile username={username} totalPublications={data?.getPublications.length}/>
          <Publication getPublications={data?.getPublications}/>
        </>
    )
}
