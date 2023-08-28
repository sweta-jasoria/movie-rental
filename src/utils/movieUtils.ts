import React from 'react';
import {ActionType, Action} from '../context/AppContext';

export function handleMovieData(dispatch: React.Dispatch<Action>, res: any) {
    const {data, totalPages, count} = res.data;

    dispatch({type: ActionType.GetMovies, payload: data})
    dispatch({type: ActionType.SetTotalPages, payload: totalPages});
    dispatch({type: ActionType.SetTotalMovies, payload: count});
};