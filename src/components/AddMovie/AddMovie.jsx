import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';


function AddMovie() {

    const [newMovieGenre, setNewMovieGenre] = useState('');
    let [newMovie, setNewMovie] = useState({title: '', poster: '', description: ''});

    const dispatch = useDispatch();
    const history = useHistory('');
    const movies = useSelector(store => store.movies);

    const goHome = () => {
        history.push('/')
    }

    const handleTitleChange = (event) => {
        setNewMovie({...newMovie, title: event.target.value})
    }
    const handlePosterChange = (event) => {
        setNewMovie({...newMovie, poster: event.target.value})
    }
    const handleDetailsChange = (event) => {
        setNewMovie({...newMovie, description: event.target.value})
    }

    const addMovie = () => {
        dispatch({type: 'POST_MOVIE', payload: newMovie})
        dispatch({type: 'POST_GENRE', payload: newMovieGenre.id})
        history.push('/')
    }

    return(
    <>
        <h3>Add Movies Here!!!</h3>
        <form onSubmit={addMovie}>
                <input type="text" value={newMovie.title} onChange={handleTitleChange} placeholder="Movie Title" />
                <input type="url" value={newMovie.poster} onChange={handlePosterChange} placeholder="Movie Poster URL" />
                <input type="textarea" value={newMovie.description} onChange={handleDetailsChange} placeholder="Movie Details"/>
            <select name="Category" onChange={(event) => setNewMovieGenre(event.target.value)}>
                <option id="1" value="Adventure">Adventure</option>
                <option id="2" value="Animated">Animated</option>
                <option id="3" value="Biographical">Biographical</option>
                <option id="4" value="Comedy">Comedy</option>
                <option id="5" value="Disaster">Disaster</option>
                <option id="6" value="Drama">Drama</option>
                <option id="7" value="Epic">Epic</option>
                <option id="8" value="Fantasy">Fantasy</option>
                <option id="9" value="Musical">Musical</option>
                <option id="10" value="Romantic">Romantic</option>
                <option id="11" value="Science Fiction">Science Fiction</option>
                <option id="12" value="Space-Opera">Space-Opera</option>
                <option id="13" value="Superhero">Superhero</option>            
            </select>
            
            <button onClick={goHome}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    </>
    )
}

export default AddMovie;


// This page should show:

// [] an input field (for the movie title)
// [] an input field (for the movie poster image URL))
// [] a textarea (for the movie description)
// [] a dropdown (for the genres)

// The Add Movie page should have the buttons:

// [] `Cancel` button, which should bring the user to the Home/List Page
// [] `Save` button, which should save these inputs in the database and bring the user to the 
// Home/List Page (which now has the new movie)

// **Base functionality does not require being able to select more than one genre for a new movie**

// > Hint: Look at the /api/movie POST route -- it's been made already but is performing 2 queries: one to store
//  the movie information and another to store the genre in the junction table.

// > Hint: You'll want to use the genres that are in the db for your dropdown
