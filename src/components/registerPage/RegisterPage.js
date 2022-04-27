import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './service';
import './RegisterPage.css'

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
            navigate("/login");
        }
        catch (error) {
            setError(error);
        }
    }

    return <div className="registerPage">
        <h1>REGISTER</h1>
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
            <div>
                <button type="submit" disabled={!email || !username || !name || !password}>REGISTER</button>
            </div>
        </form>
        {error &&
            <div className="errorDiv">
            <p>{error.message}</p>
            <button onClick={() => { setError(null) }}>X</button>
            </div>}
    </div>
}

export default RegisterPage;