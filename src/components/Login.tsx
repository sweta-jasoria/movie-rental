import React, {useContext, useEffect, useState} from 'react';
import {ActionType, AppContext} from '../context/AppContext';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import TextField from './TextField';
import Button from './Button';
import Card from '../components/Card';
import api from '../axios/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {dispatch} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
       document.title = 'Login';

       return () => {
           document.title = 'Movies';
       }
    }, []);

    const onSubmit = async (data: any) => {
        await api.post('/user/login', data)
            .then((res) => {
                setErrorMessage(res.data.message);

                if(res.headers['x-auth-token']) {
                    localStorage.setItem('token', res.headers['x-auth-token']);

                    dispatch({type: ActionType.IsLoggedIn, payload: true});
                    navigate('/movies');
                }
            })
            .catch((error) => {
                console.error('Error registering user', error);
            })
    }

    const {register, handleSubmit} = useForm();

    return (
        <>
            {
                errorMessage !== '' && (
                    <p className='text-danger text-center fw-bold mt-4'
                       style={{fontSize: 'var(--error-size)'}}>
                        {errorMessage}
                    </p>
                )
            }

            <Card>
                <form className='form_display row px-4 py-4'
                      autoComplete='off'
                      onSubmit={handleSubmit(onSubmit)}>

                        <div className='col-12'>
                            <TextField labelText='Email'
                                       id='email'
                                       type='email'
                                       value={email}
                                       name='email'
                                       registerProps={register('email')}
                                       ariaLabel='email'
                                       handleOnchange={(e) => {setEmail(e.target.value)}} />
                        </div>

                       <div className='col-12'>
                           <TextField labelText='Password'
                                      id='password'
                                      type='password'
                                      value={password}
                                      ariaLabel='password'
                                      name='password'
                                      registerProps={register('password')}
                                      handleOnchange={(e) => {setPassword(e.target.value)}} />
                       </div>

                    <Button btnLabel='Login' />
                </form>
            </Card>
        </>
    )
}

export default Login;