import TweetsPage from "./components/tweets/TweetsPage.js"
import TweetsDetailsPage from "./components/tweetsDetail/TweetsDetailsPage.js"
import LoginPage from "./components/loginPage/LoginPage.js"
import * as React from 'react';


function App({ initialLogged }) {
    const [isLogged, setIsLogged] = React.useState(initialLogged);

    return (
        <div className="App">
            {isLogged   ? <TweetsPage isLogged={isLogged} onLogout={() => { setIsLogged(false); localStorage.removeItem('token'); }} />
                        : <LoginPage onLogin={() => setIsLogged(true)} />}
        {/* <TweetsPage />
        <TweetsDetailsPage /> */}
        </div>  
    );
}

export default App;
