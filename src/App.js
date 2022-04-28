import AdvertsPage from "./components/adverts/AdvertsPage"
import AdvertsDetailsPage from "./components/advertDetail/AdvertsDetailsPage.js"
import AdvertsNewPage from "./components/advertNew/AdvertsNewPage.js"
import ErrorPage from "./components/errorPage/errorPage.js"
import LoginPage from "./components/loginPage/LoginPage.js"
import RegisterPage from "./components/registerPage/RegisterPage.js"
import * as React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RequireAuth from "./components/loginPage/RequireAuth.js"
import { resetClient } from "./api/client";
import './App.css';


function App({ initialLogged }) {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = React.useState(initialLogged);

    function logout(){
      setIsLogged(false); localStorage.removeItem('token'); resetClient();navigate("/");
    }

    return (
        <div className="App">
            <Routes>
            <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage onLogin={() => setIsLogged(true)} />} />
                <Route path='/adverts'
                    element={
                        <RequireAuth isLogged={isLogged} >
                        <AdvertsPage isLogged={isLogged}
                                onLogout={() => { logout() }} />
                        </ RequireAuth>
                    } />
                <Route path="/adverts/:advertId" element={
                    <RequireAuth isLogged={isLogged} >
                    <AdvertsDetailsPage isLogged={isLogged}
                            onLogout={() => { logout() }} />
                    </ RequireAuth>
                } />
                <Route path="/adverts/newAdvert" element={
                    <RequireAuth isLogged={isLogged} >
                        <AdvertsNewPage isLogged={isLogged}
                        onLogout={() => {logout()}} />
                    </ RequireAuth>
                } />
                <Route path="/" element={<Navigate to="/adverts" />} />
                <Route path="/errorPage" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/errorPage" />} />
            </Routes>
        </div>  
    );
}

export default App;
