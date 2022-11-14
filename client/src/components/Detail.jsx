import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions/index';
import { useEffect } from "react";
import '../styles/Detail.css';
import Loading from "./Loading";

export default function Detail(props){
    const dispatch = useDispatch();
    const history=useHistory();
    const myDog = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        
    },[dispatch])

    function handleHistory(){
        history.push("/home")
    }

    return (
        <div className="detail-container">
            {
                myDog.length?
                <>
                <div className='detail-card'>
                    <div top-row background-top-row>
                    <h1 className="top-row background-top-row"> {myDog[0].name}</h1>
                    </div>
                    <img src={myDog[0].image} alt={myDog[0].name} ></img>
                    <h2 className="temp">{myDog[0].createdInDb === true ? myDog[0].temperaments?.map(t => t.name +"/ ") :  myDog[0].temperaments?.join(', ')}</h2>
                    <br/>
                    <h3>Weight:     {myDog[0].weightMin} - {myDog[0].weightMax}</h3>
                    <h3>Height:     {myDog[0].heightMin} - {myDog[0].heightMax}</h3>
                    <h3>Lifespan:     {myDog[0].lifespan}</h3>
                    
                </div>
                <div className="back-container-d">
                <button onClick={handleHistory} className="back-d">Back</button>
                </div>
                </>
                : <Loading/>
            }
        </div>
    )
}
