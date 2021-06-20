import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';


function Details() {

    const movies = useSelector(store => store.movies);


    const history = useHistory();

    const backToList = () => {
        history.push('/')
    }

    return(
    <>
        <button onClick={backToList}>Back to List</button>
        <h3>{movies.title}</h3>
        <img src={movies.poster}/>
        <p>{movies.description}</p>
        {/* bring in pic of the movie */}
        {/* bring in details */}
    </>
    )
}

export default Details;

// This should show all details **including ALL genres** 
// for the selected movie. You will need to store this data in redux!

//  > Hint : You can make a GET request for a specific movie. 
// Remember `req.params` and `:id`?
