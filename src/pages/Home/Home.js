import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Grid } from 'semantic-ui-react';
import {Feed} from '../../components/Home/Feed';
import {UserNotFollowed} from '../../components/Home/UserNotFollowed';
import './Home.scss';



export default function Home() {
    const auth = useAuth();
    console.log(auth);
    return (
        <>
            <Grid className="home">
                <Grid.Column width={11} className="home__left">
                    <Feed/>
                </Grid.Column>
                <Grid.Column width={5} className="home__right">
                    <UserNotFollowed/>
                </Grid.Column>
            </Grid>
        </>
    )
}
