import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from './service';

function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [credentials, setCredentials] = React.useState({
        username: '',
        password: '',
        remember: false,
    });

    const { username, password, remember } = credentials;

    const [isLoading, setIsLoading] = React.useState(false);

    const [error, setError] = React.useState(null);

    const handleChange = event => {
        setCredentials(credentials => ({
            ...credentials,
            [event.target.name]:
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value,
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            setError(null);
            setIsLoading(true);
            const { accessToken } = await login(credentials);
            localStorage.setItem('token', accessToken)
            onLogin();
            setIsLoading(false);
            const from = location.state?.from?.pathname || '/'
            console.log(from);
            navigate(from, { replace: true });
        }
        catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    return <div className="loginPage">
        <h1> Log in</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={handleChange}
            />
            <button type="submit" disabled={!username || !password || isLoading}>Login</button>
        </form>
        {isLoading && <div className="dots-bars-1"></div>}
        {error &&
            <div>
                <p>{error.message}</p>
                <div onClick={() => { setError(null) }}>X</div>
            </div>}
    </div>
}

export default LoginPage;