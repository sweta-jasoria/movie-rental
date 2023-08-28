import React, {useContext, useEffect} from 'react';
import {AppContext, ActionType} from '../context/AppContext';
import {useNavigate} from 'react-router-dom';

const Logout: React.FC = () => {
    const {dispatch} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');

        dispatch({type: ActionType.IsLoggedIn, payload: false});
        navigate('/movies');
    }, []);

    return null;
}

export default Logout;