import TweetsPage from "./components/tweets/TweetsPage.js"
import TweetsDetailsPage from "./components/tweetsDetail/TweetsDetailsPage.js"
import TweetsNewPage from "./components/tweetsNew/TweetsNewPage.js"
import ErrorPage from "./components/errorPage/errorPage.js"
import LoginPage from "./components/loginPage/LoginPage.js"
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from "./components/loginPage/RequireAuth.js"


function App({ initialLogged }) {
    const [isLogged, setIsLogged] = React.useState(initialLogged);

    return (
        <div className="App">
            <Routes>
                <Route path='/login' element={<LoginPage onLogin={() => setIsLogged(true)} />} />
                <Route path='/tweets'
                    element={<TweetsPage isLogged={isLogged}
                        onLogout={() => { setIsLogged(false); localStorage.removeItem('token'); }} />} />
                <Route path="/tweets/:tweetId" element={<TweetsDetailsPage isLogged={isLogged}
                    onLogout={() => { setIsLogged(false); localStorage.removeItem('token'); }} />} />
                <Route path="/tweets/new" element={
                    <RequireAuth isLogged={isLogged} >
                        <TweetsNewPage isLogged={isLogged}
                        onLogout={() => { setIsLogged(false); localStorage.removeItem('token')}} />
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
