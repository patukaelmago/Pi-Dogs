import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../redux/actions';
import '../styles/SearchBar.css';

function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    /* const [currentPage, setCurrentPage] = useState(1); */
    

    /* useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]); */

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
     function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogs(name));
        setCurrentPage(1);
     }
    return (
        <div className='group'> 
            <input
                className='input'
                type='search'
                placeholder='   Search Dog ...'
                onChange={ handleInputChange }
                value={name}
            />
            <button className='searcho' type='search' onClick={handleSubmit}><strong>Search</strong></button>
        </div>
    )
}

export default SearchBar