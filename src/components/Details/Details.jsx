import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';


function Details() {

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    const dispatch = useDispatch();
    const history = useHistory();

   

    const backToList = () => {
        history.push('/')
    }

    return(
    <>
        <main>
            <button onClick={backToList}>Back to List</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} /> 
                            <h4>{genres.name}</h4>
                            <p>{movie.description}</p>
                        </div>

                    );
                })}
            </section>
        </main>
    </>
    )
}

export default Details;

// This should show all details **including ALL genres** 
// for the selected movie. You will need to store this data in redux!

//  > Hint : You can make a GET request for a specific movie. 
// Remember `req.params` and `:id`?
