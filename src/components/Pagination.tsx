import React, {CSSProperties, useCallback, useContext, useEffect} from 'react';
import {ActionType, AppContext} from '../context/AppContext';
import {handleMovieData} from '../utils/movieUtils';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';
import api from '../axios/api';

const Pagination: React.FC = () => {
    const {state, dispatch} = useContext(AppContext);
    const {debouncedSearchValue} = state;

    // use environment variable
    useEffect(() => {
        const fetchData = async () => {
            if(state.searchText === '') {
                if (state.activeGenre === 'All Genres') {
                    await api.get(`/movies?page=${state.page}`)
                        .then((res) => {
                           handleMovieData(dispatch, res);
                        })
                        .catch((error) => console.error(error));
                }
                else {
                    await api.get(`/movies/${state.activeGenreId}?page=${state.page}`)
                        .then((res) => {
                            handleMovieData(dispatch, res);
                        })
                        .catch((error) => console.error(error));
                }
            }

            if(state.searchText !== '') {
                if(state.activeGenre === 'All Genres') {
                    await api.get(`/movies/searchMovies/${debouncedSearchValue}?page=${state.page}`)
                        .then((res) => {
                            handleMovieData(dispatch, res);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.page])

    const handlePageChangePrev = useCallback(async () => {
        if(state.page > 1) {
            await dispatch({type: ActionType.SetPage, payload: state.page - 1});
        }
    }, [dispatch, state.page]);

    const handlePageChangeNext = useCallback(async () => {
        if(state.page < state.totalPages) {
            await dispatch({type: ActionType.SetPage, payload: state.page + 1});
        }
    }, [dispatch, state.page, state.totalPages]);

    const handlePageChange = useCallback(async (page: number) => {
        await dispatch({type: ActionType.SetPage, payload: page});
    }, [dispatch]);

    const startValue = Math.floor((state.page - 1) / 2) * 2;

    return (
        <>
                <nav aria-label='navigation'>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <Link className={state.page === 1 ? 'page-link disabled-link fw-bold' : 'page-link fw-bold'}
                                  to='#'
                                  aria-label='Previous'
                                  onClick={handlePageChangePrev}>
                                <span aria-hidden='true' style={state.page === 1 ? ({color: 'var(--grey)'} as CSSProperties) : {color: 'var(--blue)'}}>
                                    &laquo;
                                </span>
                            </Link>
                        </li>

                        {
                            state.totalPages === 2 && (
                            _.range(1, state.totalPages + 1).map((_, index) => (
                                <li className='page-item' key={index + 1}>
                                    <Link className={state.page === index + 1 ? 'page-link active' : 'page-link'}
                                          to="#"
                                          onClick={() => handlePageChange(index + 1)} >
                                        {index + 1}
                                    </Link>
                                </li>
                            ))
                            )
                        }

                        {
                            state.totalPages > 2 && (
                                _.range(1, 5).map((_, index) => (
                                                    <li className='page-item' key={startValue + index + 1}>
                                                        <Link className={state.page === startValue + index + 1 ? 'page-link active' : 'page-link'}
                                                              to="#"
                                                              style={state.totalPages < startValue + index + 1 ? ({display: 'none'} as CSSProperties): {display: 'inlineBlock'}}
                                                              onClick={() => handlePageChange(startValue + index + 1)}>
                                                            {startValue + index + 1}
                                                        </Link>
                                                    </li>
                                ))
                            )
                        }


                        <li className='page-item'>
                            <Link className={state.page === state.totalPages ? 'page-link disabled-link fw-bold' : 'page-link fw-bold'}
                                  to="#"
                                  aria-label="Next"
                                  onClick={handlePageChangeNext}>
                                <span aria-hidden="true" style={state.page === state.totalPages ? ({color: 'var(--grey)'}) : {color: 'var(--blue)'}}>
                                    &raquo;
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
        </>
    )
};

export default Pagination;