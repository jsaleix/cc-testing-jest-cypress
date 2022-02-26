import react, { useEffect, useState} from 'react';
import { NotificationManager } from 'react-notifications';
import { useAppContext } from '../../contexts/AppContext';
import AuthService from '../../services/Auth.service';

export default function Login(){
    const { data, dispatch } = useAppContext();

    const [ entries, setEntries ] = useState({email: '', password: ''});

    const log = async () => {
        let { email, password } = entries;

        let res = await AuthService.login(email, password);
        if(res){
            localStorage.setItem('token', JSON.stringify(res));
            dispatch({action: 'LOG_USER'});
            NotificationManager.success('You are now logged in', 'Welcome')
        }else{
            NotificationManager.error('Invalid credentials', 'Error')
        }
    };
    
    return(
        <div>
            <input 
                onChange={e => setEntries({...entries, email: e.target.value})}
                value={entries.email}
                required
                type="mail"/>
            <input
                onChange={e => setEntries({...entries, password: e.target.value})}
                value={entries.password}
                required
                type="password" />
            <button onClick={log}>Login</button>
        </div>
    )
}