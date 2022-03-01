import {useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useAppContext } from './contexts/AppContext';

import Login from './components/Login/Login';
import Header from './components/Header/Header';

import Todolists from './pages/Todolists/Todolists';
import Todolist from './pages/Todolist/Todolist';

export default function AppRouter(){
    const { data } = useAppContext();
    
    return(
        <>
            <Header/>
            <Router>
                {!data.isLoggedIn
                ? <Login/> 
                : <Switch>
                    <Route path="/todolist/:listId" component={Todolist} />
                    <Route path="/" component={Todolists} />
                </Switch>}
            </Router>
            <NotificationContainer/>
        </>
    )
}