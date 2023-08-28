import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AppContext, moviesProps} from '../context/AppContext';
import {handleMovieData} from '../utils/movieUtils';
import LikeIcon from './LikeIcon';
import api from '../axios/api';

const MoviesTable: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        api.get(`/movies?page=${state.genreMoviesPage}`)
            .then((res) => {
                handleMovieData(dispatch, res);
            })
            .catch((error) => console.error(error));
    }, [dispatch]);

    const fetchMovies = useCallback(async () => {
        let url = `/movies`;

        if(state.searchText === '') {
            if(state.activeGenre !== 'All Genres') {
                url += `/${state.activeGenreId}?page=${state.page}`
            }
            else {
                url += `?page=${state.page}`
            }
        }
        else {
            url += `/searchMovies/${state.searchText}?page=${state.page}`
        }


        const res = await api.get(url);

        handleMovieData(dispatch, res);
    }, [dispatch, state.activeGenreId, state.activeGenre, state.page, state.searchText]);


    const handleLikeIcon = useCallback(async (movieId: string, movieLiked: boolean) => {
        const token = localStorage.getItem('token');

        if(!token) {
            setErrorMessage('Login to like a movie');
        }

        if(token) {
            const liked = !movieLiked;

            const config = {
                headers: {
                    'x-auth-token': token
                }
            }

            await api.put(`/movies/likeMovie/${movieId}`, {liked: liked}, config)
                .then((res) => console.log(res))
                .catch((error) => console.error(error));

            await fetchMovies();
        }
    }, [fetchMovies]);

    const handleDeleteMovie = useCallback(async (movieId: string) => {
        const token = localStorage.getItem('token');

        if(!token) {
            setErrorMessage('Login to delete a movie');
        }

        if(token) {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            }

            await api.delete(`/movies/deleteMovie/${movieId}`, config)
                .then((res) => console.log(res))
                .catch((error) => console.error(error));

            await fetchMovies();
        }
    }, [fetchMovies]);

    return (
        <div style={{fontSize: 'var(--text-size)'}}>
            {
                errorMessage !== '' && (
                    <p className='text-danger text-center fw-bold'
                       style={{fontSize: 'var(--error-size)'}}>
                        {errorMessage}
                    </p>
                )
            }

            <p className='mt-4'>There are {state.totalMovies} movies in database.</p>

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody data-testid='movies-list'>
                    {
                        state.movies.map((movie: moviesProps) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre[0].name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <LikeIcon liked={movie.liked}
                                              handleLikeIcon={() => handleLikeIcon(movie._id, movie.liked)} />
                                </td>
                                <td>
                                    <button className='btn btn-danger'
                                            style={{fontSize: 'var(--text-size)'}}
                                            onClick={() => handleDeleteMovie(movie._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default MoviesTable;






