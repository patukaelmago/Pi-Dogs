import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

export default function Card ({image, name, temperaments, weightMin, weightMax, id}){
  
    return (
      <Link to={`/detail/${id}`}>
       <div className='card-container'>
        <div className='card'>
          <div className='background-top-row'>
            <h2 className='info'>{name}</h2>
          </div>
            <div className='temps'>
            {temperaments && typeof temperaments[0] === 'object'? temperaments?.map(t=>(
            t.name + ', '
            )):temperaments?.join(', ')}
            </div>
              <img src={image} alt={`${name}`} width='120px' heigth='100px' object-fit='cover' className='image-dog'/>
            <div className='weight'>
            <h4 className='info'>Min Weight: {weightMin} kg</h4>
            <h4 className='info'>Max Weight: {weightMax} kg</h4>
            </div>
        </div>
       </div>
      </Link>
    )
}