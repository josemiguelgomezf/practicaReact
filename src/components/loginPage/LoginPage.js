import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from './service';
import { configureClient } from '../../api/client'
import './LoginPage.css'

function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        remember: false,
    });

    const { email, password, remember } = credentials;

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
            if (credentials.remember) {
                localStorage.setItem('token', accessToken);
            }
            configureClient({ accessToken });
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
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
            />
            <div>
                <label htmlFor="remember">Do you want to be remember?</label>
                <input
                    className="checkbox"
                    type="checkbox"
                    name="remember"
                    checked={remember}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={(!email || !password || isLoading)}>LOGIN</button>
        </form>
        <div className="registerDiv">
            <p>Aren't yet register?</p>
            <button onClick={() => { navigate("/register") }}>REGISTER</button>
        </div>
        {isLoading && <div className="dots-bars-1"></div>}
        {error &&
            <div className="errorDiv">
            <p>{error.message}</p>
            <button onClick={() => { setError(null) }}>X</button>
            </div>}
    </div>
}

export default LoginPage;