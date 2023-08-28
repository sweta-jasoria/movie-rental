import React from 'react';
import Search from './Search';
import Genres from './Genres';
import MoviesTable from './MoviesTable';
import Pagination from './Pagination';

const Movies: React.FC = () => {
    return (
        <div className='ps-4 pe-4'>
            <div className='row mt-3 d-flex justify-content-center'>
                <div className='col-6'>
                    <Search />
                </div>
            </div>

            <div className='row mt-2'>
                <div className='col-2'>
                    <Genres />
                </div>
                <div className='col'>
                    <Pagination />

                    <MoviesTable />
                </div>
            </div>
        </div>
    )
};

export default Movies;

//set page 1 in pagination state.debouncedSearchValue