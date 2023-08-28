import React, {useContext, useEffect} from 'react';
import {ActionType, AppContext} from '../context/AppContext';
import {Link} from 'react-router-dom';
import NavbarLink from './NavbarLink';
import jwtDecode from 'jwt-decode';

const Navbar: React.FC = () => {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            try {
                const currentUser = jwtDecode(token);
                dispatch({type: ActionType.SetCurrentUser, payload: currentUser});
            }
            catch(error) {
                console.error('Error decoding token', error);
            }
        }
    }, [state.isLoggedIn, dispatch]);

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'
             style={{ backgroundColor: '#fff'}}>
            <div className='container-fluid'>
                <Link className='navbar-brand fw-bold ps-4'
                      to='/'
                      style={{color: 'var(--light-green)', fontSize: 'var(--navbar-brand-size)', fontFamily: "'Marck Script', cursive"}}>
                    Movies
                </Link>

                <ul className='navbar-nav'>
                    {!state.isLoggedIn && (
                            <>
                            <NavbarLink to='/login'
                                        linkName='Login' />

                            <NavbarLink to='/register'
                                        linkName='Register' />
                            </>
                        )}

                        {state.isLoggedIn && (
                            <NavbarLink to='/logout'
                                        linkName='Logout' />
                        )}
                    </ul>
            </div>
        </nav>
    )
}

export default Navbar;

