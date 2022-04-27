import * as React from 'react';
import './errorPage.css'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    return <div>
    <div className="errorPage">
        <h1>ERROR</h1>
        <div>
            <p>Error page! Something didn't work!</p>
            <button onClick={() => { navigate("/adverts") }}>BACK</button>
        </div>
        </div>
        {<Footer />}
    </div>
}

export default ErrorPage;