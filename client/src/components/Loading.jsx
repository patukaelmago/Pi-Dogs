import React from 'react';
import loading from '../styles/loading-dog.gif';
import '../styles/Loading.css';
import '../styles/Paginado.css';
import { useSelector } from 'react-redux';

export default function Loading(){
    const allDogs = useSelector((state) => state.dogs);

    return (
        <div>
            <div >
                <img className='loading' src={loading} alt='Loading'/>
            </div>
        </div>
    )
} 