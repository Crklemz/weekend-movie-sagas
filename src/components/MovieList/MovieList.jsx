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

    const goToDetails = (id) => {
        //send id of the picture clicked to the reducer
         dispatch({type: 'FETCH_MOVIE', payload: {id: id} })
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
                            <img src={movie.poster} id={movie.id} alt={movie.title} onClick={event => goToDetails(event.target.id)}/>
                        </div>

                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;