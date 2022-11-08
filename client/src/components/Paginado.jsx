import React from 'react';
import styles from '../styles/Paginado.css'

export default function Paginado({dogsPerPage, currentPage, allDogs, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
          <div className='flechas-container'>
            {
              currentPage > 1 ? <button className='flechas' onClick={()=>paginado(currentPage - 1)}> ❮ </button>:
              <button className='flechas' disabled> ❮ </button>
            }
             {
              currentPage < pageNumbers.length ? <button className='flechas' onClick={()=>paginado(currentPage + 1)}> ❯ </button>:
              <button className='flechas' disabled> ❯ </button>
            }
          </div>
            <div className='paginado'>
        {
          pageNumbers?.map(num=>(
            <span key={num}>
              <button className='number' onClick={()=>paginado(num)} ><strong>{num}</strong></button>
            </span>
          ))
        }
           </div>
    </nav>
      )
    }
        
