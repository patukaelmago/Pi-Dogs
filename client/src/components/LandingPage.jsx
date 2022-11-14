import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage(){
    return (
        <div className='landingContainer'>
            <Link to='/home'>
            <button className='landingButton'><h1><span> Welcome to Dogs </span></h1></button>
            </Link>
        </div>
    )
}