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
    const [selectedFile, setSelectedFile] = React.useState(null);
    const { name, sale, price, tags } = credentials;
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("sale", sale);
            formData.append("price", price);
            formData.append("tags", tags);
            if (selectedFile != null) {
                formData.append("photo", selectedFile);
            }
            const advertCreado = await createAdvert(formData);
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
                    <h1>CREATE ADVERT</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder="name" name="name" value={name} onChange={handleChange} />
                    <div>
                        <label htmlFor="sale">Sale?</label>
                        <input
                            type="checkbox"
                            name="sale"
                            checked={sale}
                            onChange={handleChange}
                        />
                    </div>
                    <input placeholder="price" type="number" name="price" value={price} onChange={handleChange} />
                    {/* <input placeholder="tags" type="text" name="tags" value={tags} onChange={handleChange} />*/}
                    <select name="tags" onChange={handleChange} value={tags} >
                        <option>TODOS</option>
                        <option>MOTOR</option>
                        <option>WORK</option>
                        <option>LIFESTYLE</option>
                        <option>MOBILE</option>
                    </select>
                    <input type="file" name="photo" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <div>
                        <button disabled={!name || !price || !tags}>
                            CREATE
                        </button>
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