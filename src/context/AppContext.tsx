import React, {ReactNode, useReducer, createContext} from 'react';

export interface moviesProps {
    _id: string;
    title: string;
    genre: any;
    numberInStock: number;
    dailyRentalRate: number;
    liked: boolean;
}

export interface genresProps {
    _id: string;
    name: string;
}

//state
interface State {
    movies: moviesProps[];
    searchedMovies: moviesProps[];

    genres: genresProps[];
    activeGenre: string;
    activeGenreId: string;

    searchText: string;
    debouncedSearchValue: string | undefined;

    page: number;
    totalPages: number;
    totalMovies: number;

    currentUser: any;
    isLoggedIn: boolean;

    genreMoviesPage: number;
}

//action type enum
export enum ActionType {
    GetMovies = 'getAllMovies',
    GetSearchedMovies = 'getSearchedMovies',

    GetGenres = 'getGenres',
    SetActiveGenre = 'setActiveGenre',
    SetActiveGenreId = 'setActiveGenreId',

    SetSearchText = 'setSearchText',
    SetDebouncedSearchValue = 'setDebouncedSearchValue',

    SetPage = 'setPage',
    SetTotalPages = 'setTotalPages',
    SetTotalMovies = 'setTotalMovies',

    SetCurrentUser = 'setCurrentUser',
    IsLoggedIn = 'isLoggedIn',

    SetGenreMoviesPage = 'setGenreMoviesPage',

    OnChangeEvent = 'onChangeEvent'
}

//action type
type MoviesAction = {
    type: ActionType.GetMovies | ActionType.GetSearchedMovies,
    payload: moviesProps[];
}

type GenresAction = {
    type: ActionType.GetGenres,
    payload: genresProps[];
}

type ActiveGenreAction = {
    type: ActionType.SetActiveGenre | ActionType.SetActiveGenreId,
    payload: string;
}

type SearchTextAction = {
    type: ActionType.SetSearchText | ActionType.SetDebouncedSearchValue,
    payload: string;
}

type CurrentUserAction = {
    type: ActionType.SetCurrentUser,
    payload: any;
}

type LoggedInAction = {
    type: ActionType.IsLoggedIn,
    payload: boolean;
}

type PageAction = {
    type: ActionType.SetPage
          | ActionType.SetTotalPages
          | ActionType.SetTotalMovies
          | ActionType.SetGenreMoviesPage;
    payload: number;
}

type OnChangeEventAction = {
    type: ActionType.OnChangeEvent,
    name: string;
    value: string;
}

export type Action = MoviesAction
              | GenresAction
              | ActiveGenreAction
              | SearchTextAction
              | PageAction
              | OnChangeEventAction
              | CurrentUserAction
              | LoggedInAction;

export const initialState: State = {
    movies: [],
    searchedMovies: [],

    genres: [],
    activeGenre: 'All Genres',
    activeGenreId: '',

    searchText: '',
    debouncedSearchValue: '',

    page: 1,
    totalPages: 0,
    totalMovies: 0,

    currentUser: null,
    isLoggedIn: false,

    genreMoviesPage: 1
}

//reducer
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.GetMovies:
            return {...state, movies: action.payload}
        case ActionType.GetSearchedMovies:
            return {...state, searchedMovies: action.payload}
        case ActionType.GetGenres:
            return {...state, genres: action.payload}
        case ActionType.SetActiveGenre:
            return {...state, activeGenre: action.payload}
        case ActionType.SetActiveGenreId:
            return {...state, activeGenreId: action.payload}
        case ActionType.SetSearchText:
            return {...state, searchText: action.payload}
        case ActionType.SetDebouncedSearchValue:
            return {...state, debouncedSearchValue: action.payload}
        case ActionType.SetGenreMoviesPage:
            return {...state, genreMoviePage: action.payload}
        case ActionType.SetPage:
            return {...state, page: action.payload}
        case ActionType.SetTotalPages:
            return {...state, totalPages: action.payload}
        case ActionType.SetTotalMovies:
            return {...state, totalMovies: action.payload}
        case ActionType.OnChangeEvent:
            return {...state, [action.name]: action.value}
        case ActionType.SetCurrentUser:
            return {...state, currentUser: action.payload}
        case ActionType.IsLoggedIn:
            return {...state, isLoggedIn: action.payload}
    }
}

//app context
interface AppContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<AppContextProps>({
    state: initialState,
    dispatch: () => {}
});


//app context provider
interface AppContextProviderProps {
    children: ReactNode
}

export const AppContextProvider = ({children}: AppContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}
