import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

export default function Card ({image, name, temperaments, weightMin, weightMax, id}){
  
    return (
      <div className='size'>
      
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
            <div  className='image-container' /* object-fit='contain' */>
            <img src={image} alt={`${name}`} width='100px' heigth='80px'object-fit='contain' className='image-dog'/>

            </div>
             
            <div className='weight'>
            <h4 className='info'>Min Weight: {weightMin} kg</h4>
            <h4 className='info'>Max Weight: {weightMax} kg</h4>
            </div>
        </div>
        </Link>
       </div>
     
      </div>
    )
}