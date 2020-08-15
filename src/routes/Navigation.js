import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import routes from './routes';
export default function Navigation(){
    return (
        <Router>
            <Switch>
            {routes.map((e,i)=>(
                <Route key={i} path={e.path} render={(props)=>(
                    <e.layout>
                        <e.component {...props}/>
                    </e.layout>
                )} exact={e.exact}/>
            ))}
            </Switch>
        </Router>
    )
}