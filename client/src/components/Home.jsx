import React from "react";
import '../styles/Home.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import dog from "../images/dog.jpg";
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
    const [currentPage, setCurrentPage] = useState(1); 
    const [dogsPerPage, setDogsPerPage] = useState(8); 
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; 
    const currentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog); 
    const [_orden, setOrden] = useState('');
    const [clean, setClean] = useState({temperaments:"",created:"",weight:"", name:""}); 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => { 
       if(!allDogs.length > 0) {dispatch(getDogs())
        dispatch(getTemperaments())}
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
        setClean({
            ...clean, temperaments:e.target.value
        }); 
        e.target.value = "Filter Temperaments"
        setCurrentPage(1);
        setOrden(e.target.value);
    }
    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setClean({
            ...clean, created:e.target.value
        }); 
        e.target.value = "Filter by Origin"
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setClean({
            ...clean, name:e.target.value
        }); 
        e.target.value = "Sort by name"
        setCurrentPage(1);
        setOrden(e.target.value);
    }
    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setClean({
            ...clean, weight:e.target.value
        }); 
        e.target.value="Sort by weight"
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    
    return (
        <div>
            {currentDogs.length > 0 ?
            <div className="home">
                <div className="papeiners">
                    <hr></hr>
                </div>   
                <div className="header">
                    <img src={dog} alt="img not found" />
                    <p><strong>Dogs</strong></p>
                    <h3>Unconditional Love</h3>
                    <div className="padr">
                        <Link to='/dogs'>
                            <button className='elementNA' value="dog"> 
                                Create Dog
                            </button>
                        </Link>
                    </div>
                    <div className="padl">
                        <button className='elementNA' onClick={e => { handleClick(e) }} >
                           All Dogs
                        </button>
                    </div>
                    
                        <div className="pad">
                            <SearchBar 
                            setCurrentPage={setCurrentPage} />
                        </div>
                    
                    <div className="padw">
                        <select  className='elementNC'defaultValue='selected' onChange={e => handleSortByName(e)} >
                            <option hidden value="Sort by name">{clean.name || "Sort by name"}</option>
                            <option value='selected' disabled selected>Breed</option>
                            <option value='Ascendent'>A - Z</option>
                            <option value='Descendent'>Z - A</option>
                        </select>
                    </div>
                    <div className="padq">
                        <select className="elementNC" defaultValue='selected' onChange={e => handleSortByWeight(e)}  >
                            <option hidden value="Sort by weight">{clean.weight || "Sort by weight"}</option>
                            <option value='selected' disabled selected>Weight</option>
                            <option value='Lighter to heavier'>Lighter to heavier</option>
                            <option value='Heavier to lighter'>Heavier to lighter</option>
                        </select>
                    </div>
                    <div className="pade">
                        <select className='elementNC' defaultValue='selected' onChange={e => handleFilterCreated(e)}>
                            <option hidden value="Filter by Origin">{clean.created || "Filter by Origin"}</option>
                            <option value="selected" disabled selected >Origin</option>
                            <option value="Api Dogs">API</option>
                            <option value="In Database">DB</option>
                        </select>
                    </div>
                    <div className="padf">
                        <select className='elementNC' defaultValue='selected' name='temperaments' onChange={e => handleFilterTemperaments(e)} >
                            <option hidden value="Filter Temperaments">
                                {clean.temperaments || "Filter Temperaments"}
                            </option>
                            <option value='selected' disabled selected>Temperaments</option>
                            <option value='all'>All</option>
                            {allTemperaments.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>
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
                    )})}
                </div>
            <div >
            {<Paginado 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado = {paginado}
                currentPage={currentPage}/>}
            </div>
        </div>: <Loading/>} 
        </div>
    )
}
