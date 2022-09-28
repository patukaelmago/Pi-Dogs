import React from "react";
import '../styles/Home.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    getDogs, 
    getTemperaments, 
    filterDogsByTemperament, 
    sortByName,  
    sortByWeight,
    filterCreated,
    clearDetail,
    } from "../redux/actions";
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);

     // Paginado:
    const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado local actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8); // Me guardo cuantos perros quiero por página.
    const indexOfLastDog = currentPage * dogsPerPage; // El índice del último perro de cada página va a ser el numero de la página multiplicado por la cantidad de perros por página.
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // El índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Los perros mostrados en cada página serán los que estén en la porción que va desde el primero hasta el último de cada página, de la lista total de perros.

    const [/*_orden*/, setOrden] = useState(''); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
     
    useEffect(() => { 
        dispatch(getDogs())
        dispatch(getTemperaments())
        dispatch(clearDetail())
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
        setCurrentPage(1);
    }

    function handleFilterTemperaments(e) {
        e.preventDefault(e);
        dispatch(filterDogsByTemperament(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value);
    }
    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
        
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }
    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    
    return (
        <div>
            {currentDogs.length > 0 ?

        <div className="home">
            
            <div className="divNB">
                <ul className="navbar">
                    <li className="content-select">
                        <select defaultValue="selected" className='elementNB' onChange={(e) => handleFilterCreated(e)}>
                            <option value="selected" disabled selected > 
                                Filter by Origin
                            </option>
                            <option value="api">API</option>
                            <option value="db">DB</option>
                        </select>
                    </li>
                    <li className="content-select">
                        <select  className='elementNB' onChange={e => handleSortByName(e)} >
                            <option value='selected' disabled selected>Sort by name</option>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </li>
                    <li className="content-select">
                        <select className="elementNB" onChange={e => handleSortByWeight(e)}  >
                            <option value='selected'  disabled selected>Sort by weight</option>
                            <option value='asc'>Lighter to heavier</option>
                            <option value='desc'>Heavier to lighter</option>
                        </select>
                    </li>
                    <li className="content-select">
                        <select className='elementNB' defaultValue='selected' name='temperaments' onChange={e => handleFilterTemperaments(e)} >
                            <option value='selected'  disabled selected>Filter by Temperaments</option>
                            <option value='all'>All</option>
                            {allTemperaments.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </li>
                    
                </ul>
                <div className="search-bar">
                    <Link to='/dogs'>
                        <button className='elementNB'> 
                            <strong>Create Dog</strong>
                        </button>
                    </Link>
                    <button className='elementNB' onClick={e => { handleClick(e) }} >
                        <strong>Refresh</strong>
                    </button>
                </div>
               
                    <SearchBar 
                    setCurrentPage={setCurrentPage} />
              
            </div>
            <div>
            {<Paginado 
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado = {paginado}
            currentPage={currentPage}/>}
            </div>
           
            <div className='cardsContainer'>
                {currentDogs?.map(d => {
                    return (
                        <Card 
                        key={d.id}
                        id={d.id}
                        image={d.image}
                        name={d.name}
                        temperaments={d.temperaments}
                        weightMin={d.weightMin}
                        weightMax={d.weightMax}
                        heightMin={d.heightMin}
                        heightMax={d.heightMax}
                         />
                    )
                })}
            </div>
        </div>
        : <Loading/> } </div>
    )
}
