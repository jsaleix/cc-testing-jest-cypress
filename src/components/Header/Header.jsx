import { useAppContext } from '../../contexts/AppContext';
import helpers from '../../services/helpers';
import './Header.scss';

export default function Header(){
    const { data, dispatch } = useAppContext();

    const logout = () => {
        dispatch({action: 'LOGOUT_USER'});
        localStorage.removeItem('token');
    }

    return(
        <header className='container'>
            <h1 
                style={{cursor: 'pointer'}}
                onClick={() => window.location.href = '/' }>My list</h1>
                {data.isLoggedIn && 
                <div>
                    <p>{helpers.getTokenContent().email}</p>
                    <button onClick={logout}>LOGOUT</button>
                </div>}
        </header>
    )
}