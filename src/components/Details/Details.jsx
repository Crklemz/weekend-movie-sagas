import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

function Details() {

    const history = useHistory();

    const backToList = () => {
        history.push('/')
    }

    return(
    <>
        <button onClick={backToList}>Back to List</button>
    </>
    )
}

export default Details;