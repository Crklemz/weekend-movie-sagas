import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory('');
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToDetails = (title) => {
        //send title of the picture clicked to the generators
         dispatch({type: 'FETCH_MOVIE', payload: title })
         dispatch({type: 'FETCH_GENRE', payload: title })
        //send user to details page
        history.push('/details')
    }

    const goToAddMovie = () => {
        history.push('/addmovie')
    }

    return (
        <main>
            <nav onClick={goToAddMovie}>Add Movies</nav>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={event => goToDetails(event.target.alt)}/>
                        </div>

                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;