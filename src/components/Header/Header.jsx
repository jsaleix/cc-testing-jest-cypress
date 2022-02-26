import './Header.scss';

export default function Header(){
    return(
        <header className='container'>
            <h1 
                style={{cursor: 'pointer'}}
                onClick={() => window.location.href = '/' }>My list</h1>
        </header>
    )
}