import React, {useCallback, useContext, useEffect} from 'react';
import {ActionType, AppContext} from '../context/AppContext';
import {handleMovieData} from '../utils/movieUtils';
import {useDebounce} from '../hooks/useDebounce';
import TextField from './TextField';
import * as _ from 'lodash';
import api from '../axios/api';

const Search: React.FC = () => {
    const {state, dispatch} = useContext(AppContext);

    const debouncedSearchValue = _.trim(useDebounce(state.searchText, 1000));

    useEffect(() => {
            const fetchData = async () => {
                if (debouncedSearchValue !== '') {
                    dispatch({type: ActionType.SetActiveGenre, payload: 'All Genres'});

                    await api.get(`/movies/searchMovies/${debouncedSearchValue}?page=${state.genreMoviesPage}`)
                        .then((res) => {
                            handleMovieData(dispatch, res);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                else {
                    await api.get(`/movies/?page=${state.genreMoviesPage}`)
                        .then((res) => {
                            handleMovieData(dispatch, res);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            }

            if(debouncedSearchValue) {
                dispatch({type: ActionType.SetDebouncedSearchValue, payload: debouncedSearchValue});
            }
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [debouncedSearchValue]);

    const handleSearchText = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: ActionType.SetSearchText, payload: e.currentTarget.value});
    }, [dispatch]);

    return (
        <>
            <TextField id='filter'
                       type='text'
                       autoComplete='off'
                       name='filter'
                       value={state.searchText}
                       placeholder='Search movie'
                       ariaLabel='filter'
                       handleOnchange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchText(e)} />
        </>
    )
};

export default Search;