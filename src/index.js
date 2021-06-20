import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE', fetchMovie);
    yield takeEvery('FETCH_GENRE', fetchGenre);
    yield takeEvery('POST_MOVIE', postMovie);

}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get(`/api/movie?query=SELECT * FROM movies ORDER BY "title" ASC`);
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}


function* fetchMovie(action) {
    console.log('in fetchMovie, action payload is -->', action.payload);
    //get specific movie
    try {
        const movie = yield axios.get(`/api/movie?query=SELECT * FROM movies WHERE "movies".title = '${action.payload}'`);
        console.log('get specific movie', movie.data);
        yield put({type: 'SET_MOVIES', payload: movie.data})
    } catch {
        console.log('get specific movie - error');
    }
}

function* fetchGenre(action) {
    try {
        const genre = yield axios.get(`/api/genre?query=SELECT "genres".id, "genres".name, "movies".title
        FROM "genres"
        JOIN "movies_genres" ON "movies_genres".genre_id = "genres".id
        JOIN "movies" ON "movies".id = "movies_genres".movie_id        
         WHERE "movies".title = '${action.payload}'`);
        console.log('get specific movie genre', genre.data);
        yield put({type: 'SET_GENRES', payload: genre.data})
    } catch {
        console.log('get specific movie genre - error');
    }
}

function* postMovie(action) {
    console.log('in postMovie', action.payload);
    try{
      yield axios.post(`/api/movie`, action.payload)
      yield put({type: 'FETCH_MOVIES' })
    } catch (error) {
      console.log('error in postMovie', error);
    }
  }

//   function* postGenre(action) {
//     try{
//       yield axios.post(`/api/movie`, action.payload)
//       yield put({type: 'FETCH_GENRE' })
//     } catch (error) {
//       console.log('error in postGenre', error);
//     }
//   }



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
