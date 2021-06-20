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
                            <h3>{movies[0].title}</h3>
                            <img src={movies[0].poster} /> 
                            <h4>Genres: {genres.map(genreList => {
                                return (
                                    <div key={genreList.id}>
                                        <p>{genreList.name}</p>
                                    </div>
                                );
                            })}</h4>
                            <p>{movies[0].description}</p>
        </main>
    </>
    )
}

export default Details;

// This should show all details **including ALL genres** 
// for the selected movie. You will need to store this data in redux!

//  > Hint : You can make a GET request for a specific movie. 
// Remember `req.params` and `:id`?
