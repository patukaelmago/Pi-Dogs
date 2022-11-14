import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {  getTemperaments, postDog, clearDogs} from "../redux/actions";
import '../styles/Form.css';

function validURL(strurl){
    let validate = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!validate.test(strurl)
}
const validate = (input)=>{
    let errors ={};
    if(!input.name) errors.name = 'Name is required'
    if(input.name.length < 3 || input.name.length > 30) errors.name = 'Name must contain between 3 and 30 characters'
    if(!/^[a-zA-Z\s]+$/.test(input.name)) errors.name = 'Invalid name, must only contain letters'
    if(!input.temperaments) errors.temperaments = 'Chosse a temperament'
    if(input.weightMin < 1   )errors.weightMin = 'Must be a positive number'
    if(input.weightMin > 70 )errors.weightMin = 'Min value must be less than 70 kg'
    if(input.weightMin > input.weightMax)errors.weightMin = 'Min value must be less than Max value'
    if(input.weightMax < 1 )errors.weightMax = 'Value must be a positive number'
    if(input.weightMax > 100)errors.weightMax = 'Max value must be less than 100 kg'
    if(input.weightMax < input.weightMin)errors.weightMax = 'Max value must be higher than Min value'
    if(input.heightMin < 1 )errors.heightMin = 'Value must be a positive number'
    if(input.heightMin > 100)errors.heightMin='Min value must be less than 100 kg'
    if(input.heightMin > input.heightMax)errors.heightMin = 'Min value must be less than Max value'
    if(input.heightMax < 1 )errors.heightMax = 'Value must be a positive number'
    if(input.heightMax > 150)errors.heightMax='Max value must be less than 150 kg'
    if(input.heightMax < input.heightMin)errors.heightMax = 'Max value must be higher than Min value'
    if(input.lifespan < '1') errors.lifespan = 'The age must be a positive number '
    if(input.lifespan > '80')errors.lifespan = 'the value must be less than 80 years'
    if(!input.image || !validURL(input.image))errors.image = 'A valid image must be require'
    return errors
}

export default function Form(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});
    /* const [clean,setClean] = useState(""); */
    const [input, setInput] = useState({
        name:'',
        weightMin:0,
        weightMax:0,
        heightMin:0,
        heightMax:0,
        lifespan:'0',
        image:'',
        temperaments:[]
    });

    useEffect(()=>{
        dispatch(getTemperaments());
    },[dispatch]);

    function handleSelectTemperaments(e){
        if(input.temperaments.length < 4){
            setInput({
                ...input,
                temperaments:input.temperaments.includes(e.target.value) ? input.temperaments : [...input.temperaments, e.target.value]
            })

        }
        
    }

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postDog(input))
        dispatch(clearDogs())
        alert('Dog Created succesfully')
        history.push('/home')
    }

    function handleDelete(e){
        e.preventDefault()
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t=>t !== e.target.id)
        })
    }

    return (
        <>
        <div className="back-container-b">
            <Link to= '/home'><button className="back">Back </button></Link>
        </div>
        <div className="form-container">
          <div className="created-card">
            <h1>Create Dog</h1>
            <form onSubmit={handleSubmit}>
                <div className="name-div">
                    <label className="texto">Name</label>
                    <input className="input-name"
                    type= 'text'
                    placeholder='name...'
                    value= {input.name}
                    name= 'name'
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="error-name">{errors.name}</p>
                    )}
                </div>
                <div className="image-div">
                    <label className="texto">Image</label>
                    <input
                    className="input-name"
                    type= 'text'
                    placeholder="url..."
                    value= {input.image}
                    name= 'image'
                    onChange={handleChange}
                    />
                     {errors.image && (
                        <p className="error-img">{errors.image}</p>
                    )}
                </div >
                <div className="label">
                    <label className="texto">Height Min </label>
                    <input
                    className="input-form"
                    type= 'number'
                    value= {input.heightMin}
                    name= 'heightMin'
                    min='1'
                    max='70'
                    step={1}
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.heightMin && (
                        <p className="error">{errors.heightMin}</p>
                    )}
                </div>
                <div className="label">
                    <label className="texto">Height Max </label>
                    <input
                    className="input-form"
                    type= 'number'
                    value= {input.heightMax}
                    name= 'heightMax'
                    min='1'
                    max='100'
                    step={1}
                    onChange={handleChange}
                    />
                    {errors.heightMax && (
                        <p className="error">{errors.heightMax}</p>
                    )}
                </div>
                <div className="label">
                    <label className="texto">Weight Min </label>
                    <input
                    className="input-form"
                    type= 'number'
                    value= {input.weightMin}
                    name= 'weightMin'
                    onChange={handleChange}
                    />
                    {errors.weightMin && (
                        <p className="error-wm">{errors.weightMin}</p>
                    )}
                </div>
                <div className="label">
                    <label className="texto">Weight Max </label>
                    <input
                    className="input-form"
                    type= 'number'
                    value= {input.weightMax}
                    name= 'weightMax'
                    onChange={handleChange}
                    />
                    {errors.weightMax && (
                        <p className="error">{errors.weightMax}</p>
                    )}
                </div>
                <div className="label">
                    <label className="lifeSpan">Life Span </label>
                    <input
                    className="input-form"
                    type= 'number'
                    value= {input.lifespan}
                    name= 'lifespan'
                    onChange={handleChange}
                    />
                    {errors.lifespan && (
                        <p className="error-ls">{errors.lifespan}</p>
                    )}
                </div>
                <div className="temps-div">
                    <select className="select-form" onChange={handleSelectTemperaments} >
                        {temperaments?.map((t)=>(<option value={t.name}>{t.name}</option>)
                        )}
                    </select>
                        {errors.temperaments && (
                            <p className="error">{errors.temperaments}</p>
                        )}
                    <ul >
                        {input.temperaments.map(t=>(
                            <li className="x-button" key={t} >
                                {t}
                                <button id={t} type='button' onClick={handleDelete} >✗</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="submit-form">
                    {input.name.length < 2 || Object.keys(errors).length > 0 ? <button className="disable-button" disabled>Submit</button> : <button className="submit-button" type='submit'>Submit</button>}
                </div>
            </form>
          </div>
        </div>
    </>
  )
}
