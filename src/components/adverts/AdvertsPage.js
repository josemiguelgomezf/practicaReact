import * as React from 'react';
import { getLatestAdverts, getFilterAdverts } from './service';
import './AdvertsPage.css'
import Layout from '../layout/Layout'
import Search from './Search'
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
            <Layout title="LIST" isLogged={isLogged} onLogout={onLogout}>
                <div className="advertsPage">
                    <p>There isn't adverts!</p>
                </div>
            </Layout>
            )
    }
    return (
        <Layout title="LIST" isLogged={isLogged} onLogout={onLogout}>
            <Search>
            </Search>
            <button onClick={() => {
                var tags = [];
                tags = document.getElementById("tagInput").selectedOptions;
                var sale = document.getElementById("selectInput").value;
                var tagsSelected = Array.from(tags).map(({ value }) => value);
                console.log(tagsSelected);
                console.log(sale);
                let filtro = ''
                getFilterAdverts(filtro).then(adverts => setAdverts(adverts))
                    .catch(Error => setError(Error));
            }}>SEARCH</button>
            <button onClick={() => {
                document.getElementById("tagInput").value = "";
                document.getElementById("nameInput").value = "";
                document.getElementById("priceInputMin").value = "";
                document.getElementById("priceInputMax").value = "";
                document.getElementById("selectInput").value = "TODOS";
                getLatestAdverts().then(adverts => setAdverts(adverts))
                    .catch(Error => setError(Error));
            }}>CLEAR</button>
            <div className="advertsPage">
                {adverts.map(advert => (
                    <div className="singleAdvert" key={advert.id}>
                            <Link to={`/adverts/${advert.id}`}>
                            <p>
                                {advert.name}
                            </p>
                            </Link>
                            <p>
                                {advert.createdAt}
                            </p>
                            <p hidden={!advert.sale}>
                                VENTA
                            </p>
                            <p hidden={advert.sale}>
                               COMPRA
                            </p>
                            <p>
                                {advert.price}$
                            </p>
                            <p>
                                {advert.tags}
                            </p>
                        </div>
                    ))
                    }
            </div>
        </Layout>
    )
}

export default AdvertsPage;