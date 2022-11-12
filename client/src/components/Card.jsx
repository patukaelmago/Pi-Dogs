import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

export default function Card ({image, name, temperaments, weightMin, weightMax, id}){
  
    return (
      <div className='card-container'>
        <Link to={`/detail/${id}`}>
          <div className='card'>
            <div className='background-top-row'>
              <h2 className='info'>{name}</h2>
            </div>
            <div className='temps'>
              {temperaments && typeof temperaments[0] === 'object'? temperaments?.map(t=>(
              t.name + ', '
              )):temperaments?.join(', ')}
            </div >
            <div className="image-container">
                <img className="imagenenen" src={image} alt={`${name}`} height= '250px' width='200px'/>
            </div>
            <div className='weight'>
              <h4 className='info'>Min Weight: {weightMin} kg</h4>
              <h4 className='info'>Max Weight: {weightMax} kg</h4>
            </div>
          </div>
        </Link>
      </div>
    )
}