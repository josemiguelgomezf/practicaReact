import * as React from 'react';
import './AdvertsNewPage.css'
import Layout from '../layout/Layout'
import { createAdvert} from '../adverts/service'
import { Navigate, useNavigate } from 'react-router-dom';

const AdvertsNewPage = ({ isLogged, onLogout }) => {
    const [credentials, setCredentials] = React.useState({
        name: '',
        sale: false,
        price: '',
        tags: [],
    });

    const { name, sale, price, tags } = credentials;
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const advertCreado = await createAdvert({ credentials });
            navigate(`/adverts/${advertCreado.id}`);
        }
        catch (error) {
            setError(error);
        }
    }

    if (error) {
        return <Navigate to="/errorPage" />
    }

    const handleChange = event => {
        setCredentials(credentials => ({
            ...credentials,
            [event.target.name]:
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
        }));
    };


    return (
        <Layout title="NEW ADVERT" isLogged={isLogged} onLogout={onLogout}>
            <div className="advertsNewPage">
                    <h1>REGISTER</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder='Name'
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                    />
                    <div>
                        <label htmlFor="sale">Sale?</label>
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="sale"
                            checked={sale}
                            onChange={handleChange}
                        />
                    </div>
                        <input
                            placeholder='Price'
                            type="text"
                            name="price"
                            value={price}
                            onChange={handleChange}
                    />
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value={tags}
                                checked={tags[0] = "Male"}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value={tags}
                                checked={tags[1] = "FeMale"}
                                onChange={handleChange}
                            />
                            FeMale
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value={tags}
                                checked={tags[2] = "asasMale"}
                                onChange={handleChange}
                            />
                            asasMale
                        </label>
                    </div>
                        <div>
                            <button type="submit" disabled={!name || !sale || !price || !tags}>CREATE</button>
                        </div>
                    </form>
                    {error &&
                        <div className="errorDiv">
                            <p>{error.message}</p>
                            <button onClick={() => { setError(null) }}>X</button>
                        </div>}
                </div>
        </Layout>
    )
}

export default AdvertsNewPage;