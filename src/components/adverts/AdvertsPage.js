import * as React from 'react';
import { getLatestAdverts } from './service';
import './AdvertsPage.css'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom';
import {configureClient} from '../../api/client'

const AdvertsPage = ({ isLogged, onLogout }) => {
    const [adverts, setAdverts] = React.useState([]);
    const [error, setError] = React.useState(null);

    const accessToken = localStorage.getItem('token');
    configureClient({ accessToken });

    React.useEffect(() => {
        getLatestAdverts().then(adverts => setAdverts(adverts))
            .catch(Error => setError(Error));
    }, []);

    if (error) {
        return (
            <Layout title="LIST" isLogged={isLogged} onLogout={onLogout}>
                <div className="advertsPage">
                    <p>{error.message}</p>
                </div>
            </Layout>
        )
    }

    if (!adverts.length) {
        return (
            <Layout title="LISTADO" isLogged={isLogged} onLogout={onLogout}>
                <div className="advertsPage">
                    <p>There isn't adverts!</p>
                </div>
            </Layout>
            )
    }
    return (
        <Layout title="LISTADO" isLogged={isLogged} onLogout={onLogout}>
            <div className="advertsPage">
                <ul>
                    {adverts.map(advert => (
                        <div key={advert.id}>
                            <Link to={`/adverts/${advert.id}`}>
                                {advert.id}
                            </Link>
                            <p>
                                {advert.name}
                            </p>
                            <p>
                                {advert.createdAt}
                            </p>
                            <p>
                                {advert.sale}
                            </p>
                            <p>
                                {advert.price}
                            </p>
                            <p>
                                {advert.tags}
                            </p>
                        </div>
                    ))
                    }
                </ul>
            </div>
        </Layout>
    )
}

export default AdvertsPage;