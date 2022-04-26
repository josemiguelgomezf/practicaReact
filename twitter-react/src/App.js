import TweetsPage from "./components/tweets/TweetsPage.js"
import TweetsDetailsPage from "./components/tweetsDetail/TweetsDetailsPage.js"
import TweetsNewPage from "./components/tweetsNew/TweetsNewPage.js"
import ErrorPage from "./components/errorPage/errorPage.js"
import LoginPage from "./components/loginPage/LoginPage.js"
import RegisterPage from "./components/registerPage/RegisterPage.js"
import * as React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RequireAuth from "./components/loginPage/RequireAuth.js"
import {resetClient} from "./api/client";


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
                <Route path='/tweets'
                    element={<TweetsPage isLogged={isLogged}
                        onLogout={() => {logout()}} />} />
                <Route path="/tweets/:tweetId" element={<TweetsDetailsPage isLogged={isLogged}
                    onLogout={() => {logout()}} />} />
                <Route path="/tweets/new" element={
                    <RequireAuth isLogged={isLogged} >
                        <TweetsNewPage isLogged={isLogged}
                        onLogout={() => {logout()}} />
                    </ RequireAuth>
                } />
                <Route path="/" element={<Navigate to="/tweets" />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </div>  
    );
}

export default App;
