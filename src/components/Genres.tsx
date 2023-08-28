import React, {useCallback, useContext, useEffect} from 'react';
import {ActionType, AppContext, genresProps} from '../context/AppContext';
import {handleMovieData} from '../utils/movieUtils';
import api from '../axios/api';

const Genres: React.FC = () => {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        api.get<genresProps[]>('/genres')
            .then((res) => {
                dispatch({type: ActionType.GetGenres, payload: res.data})
            })
            .catch((error) => console.error(error));
    }, [dispatch]);

    const handleGenre = useCallback(async (genreName: string, genreId: string) => {
        await dispatch({type: ActionType.SetActiveGenre, payload: genreName});
        await dispatch({type: ActionType.SetActiveGenreId, payload: genreId});
        dispatch({type: ActionType.SetPage, payload: 1});

        if(genreName === 'All Genres') {
            await api.get(`/movies?page=${state.page}`)
                .then((res) => {
                    handleMovieData(dispatch, res)
                })
                .catch((error) => console.error(error));
        }
        else {
            await api.get(`/movies/${genreId}?page=${state.page}`)
                .then((res) => {
                    handleMovieData(dispatch, res);
                })
                .catch((error) => console.error(error));
        }
    }, [dispatch, state.genreMoviesPage, handleMovieData]);

    return (
        <ul className='list-group mt-4'>
            {
                state.genres.map((genre: genresProps) => (
                    <li key={genre._id}
                        className={`list-group-item ${state.activeGenre === genre.name ? 'active' : ''}`}
                        style={{cursor: 'pointer', fontSize: 'var(--text-size)'}}
                        onClick={() => handleGenre(genre.name, genre._id)}>
                        {genre.name}
                    </li>
                ))
            }
        </ul>
    )
}

export default Genres;