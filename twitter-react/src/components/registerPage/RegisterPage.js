import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from './service';
import { configureClient } from '../../api/client'

function RegisterPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = React.useState({
        email: '',
        username: '',
        name: '',
        password: '',
    });

    const { email, username, name, password } = credentials;

    const [error, setError] = React.useState(null);

    const handleChange = event => {
        setCredentials(credentials => ({
            ...credentials,
            [event.target.name]:
            event.target.value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            setError(null);
            await register(credentials);
            const { accessToken } = await login(credentials);
            configureClient({ accessToken });
            localStorage.setItem('token', accessToken);
            navigate("/");
        }
        catch (error) {
            setError(error);
        }
    }

    return <div className="registerPage">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Email'
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <input
                placeholder='username'
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
            />
            <input
                placeholder='name'
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <input
                placeholder='password'
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            <button type="submit" disabled={!email || !username || !name || !password}>Register</button>
        </form>
        {error &&
            <div>
                <p>{error.message}</p>
                <div onClick={() => { setError(null) }}>X</div>
            </div>}
    </div>
}

export default RegisterPage;