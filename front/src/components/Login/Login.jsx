import react, { useEffect, useState} from 'react';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import { useAppContext } from '../../contexts/AppContext';
import AuthService from '../../services/Auth.service';
import './Login.scss';

const REQUIRED_AGE = 13;

const checkAge = (birthdate) => {
    return (moment().diff(moment(birthdate, 'DD/MM/YYYY'), 'years', false) >= REQUIRED_AGE);
}

export default function Login(){
    const { data, dispatch } = useAppContext();

    const [ entries, setEntries ] = useState({email: '', password: ''});
    const [ registerEntries, setRegisterEntries ] = useState({ email:'', password: '', passwordBis: '', lastname:'', firstname:'', birthdate:''});

    const log = async () => {
        let { email, password } = entries;
        if( !email && !password){
            NotificationManager.error('Missing credentials', 'Error')
            return;
        }

        if( !email ){
            NotificationManager.error('Missing email', 'Error')
            return;
        }
        if( !password ) {
            NotificationManager.error('Missing password', 'Error')
            return;
        }
        let res = await AuthService.login(email, password);
        if(res){
            localStorage.setItem('token', JSON.stringify(res));
            dispatch({action: 'LOG_USER'});
            NotificationManager.success('You are now logged in', 'Welcome')
        }else{
            NotificationManager.error('Invalid credentials', 'Error')
        }
    };

    const signup = async () => {
        let { email, password, passwordBis, lastname, firstname, birthdate } = registerEntries;
        try{

            if( !email || !lastname || !firstname || !birthdate){
                throw new Error('Missing field(s)');
            }

            birthdate = moment(birthdate).format("DD-MM-YYYY");
            if( !checkAge(birthdate)){
                throw new Error(`Invalid age (min ${REQUIRED_AGE})`);
            }

            if(password !== passwordBis){
                throw new Error('The passwords don\'t match ');
            }

            if(password.length < 8 || password.length > 40){
                throw new Error('Invalid password (min 8 chars, max 40');
            }

            let res = await AuthService.signup({...registerEntries, birthdate});
            if(res === true){
                NotificationManager.success('You can login now', 'Success');
            }else{
                throw new Error(res?.error);
            }

        }catch(e){
            NotificationManager.error(e.message || 'An error occured', 'Error');
        }
        
    }
    
    return(
        <div className='login-page container'>
            <div className='login'>
                <h2>Login</h2>
                <input
                    data-testid="login-email"
                    placeholder='Email'
                    onChange={e => setEntries({...entries, email: e.target.value})}
                    value={entries.email}
                    required
                    type="mail"/>
                <input
                    data-testid="login-password"
                    placeholder='Password'
                    onChange={e => setEntries({...entries, password: e.target.value})}
                    value={entries.password}
                    required
                    type="password" />
                <button onClick={log} data-testid="login-button">Login</button>
            </div>

            <div className='register'>
                <h2>Need an account ?</h2>
                <input 
                    data-testid="register-email"
                    placeholder='Email'
                    onChange={e => setRegisterEntries({...registerEntries, email: e.target.value})}
                    value={registerEntries.email}
                    required
                    type="mail"/>
                <input 
                    data-testid="register-firstname"
                    placeholder='Firstname'
                    onChange={e => setRegisterEntries({...registerEntries, firstname: e.target.value})}
                    value={registerEntries.firstname}
                    required
                    type="text"/>
                <input
                    data-testid="register-lastname"
                    placeholder='Lastname'
                    onChange={e => setRegisterEntries({...registerEntries, lastname: e.target.value})}
                    value={registerEntries.lastname}
                    required
                    type="text"/>
                <input 
                    data-testid="register-birthdate"
                    placeholder='Birthdate'
                    onChange={e => setRegisterEntries({...registerEntries, birthdate: e.target.value})}
                    value={registerEntries.birthdate}
                    required
                    type="date"/>
                <input
                    data-testid="register-password"
                    placeholder='Password'
                    onChange={e => setRegisterEntries({...registerEntries, password: e.target.value})}
                    value={registerEntries.password}
                    required
                    type="password" />
                <input
                    data-testid="register-password-bis"
                    placeholder='Password confirmation'
                    onChange={e => setRegisterEntries({...registerEntries, passwordBis: e.target.value})}
                    value={registerEntries.passwordBis}
                    required
                    type="password" />
                <button onClick={signup} data-testid="signup-button" >Sign Up</button>
            </div>
        </div>
    )
}