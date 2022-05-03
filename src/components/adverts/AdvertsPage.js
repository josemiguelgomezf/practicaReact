import * as React from 'react';
import { getLatestAdverts, getFilterAdverts, deleteAdvert } from './service';
import './AdvertsPage.css'
import Layout from '../layout/Layout'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom';
import { configureClient } from '../../api/client';
import swal from 'sweetalert';

const AdvertsPage = ({ isLogged, onLogout }) => {
    const [adverts, setAdverts] = React.useState([]);
    const [error, setError] = React.useState(null);
    const Navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    configureClient({ accessToken });
    //funcion para poder buscar por filtros
    const botonSearch = () => {
        //price
        var filtroPriceMin = '';
        var filtroPriceMax = '';
        var priceMin = document.getElementById("priceInputMin").value;
        var priceMax = document.getElementById("priceInputMax").value;
        if (priceMin) {
            filtroPriceMin = `price=${priceMin}`
        }
        if (priceMax) {
            filtroPriceMax = `price=${priceMax}`
        }
        console.log(priceMin);
        console.log(priceMax);
        //name
        var filtroName = '';
        var name = document.getElementById("nameInput").value;
        if (name) {
            filtroName = `name=${name}`
        }
        //tags
        var filtroTags = '';
        var tags = [];
        tags = document.getElementById("tagInput").selectedOptions;
        var tagsSelected = Array.from(tags).map(({ value }) => value);
        for (let i = 0; i < tagsSelected.length; i++) {
            filtroTags += `&tags=${tagsSelected[i]}`
        }
        //sale
        var filtroSale = '';
        var sale = document.getElementById("selectInput").value;
        if (sale !== "TODOS") {
            if (sale === "COMPRA") {
                sale = false;
            }
            else {
                sale = true;
            }
            filtroSale = `sale=${sale}`
        }
        let filtro = ''
        filtro = `${filtroName}&${filtroSale}&${filtroPriceMin}&${filtroPriceMax}&${filtroTags}`;
        getFilterAdverts(filtro).then(adverts => setAdverts(adverts))
            .catch(Error => setError(Error));
    };

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
            <button onClick={botonSearch}>SEARCH</button>
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
                            <div className="errorDiv2">
                            <button onClick={() => {
                                swal({
                                    title: "Are you sure?",
                                    text: "Are you sure that you want to delete this advert?",
                                    icon: "warning",
                                    dangerMode: true,
                                })
                                    .then(willDelete => {
                                        if (willDelete) {
                                            deleteAdvert(advert.id);
                                            swal("Deleted!", `${advert.name} has been deleted.`, "success");
                                            Navigate("/");
                                        }
                                    });
                            }}>
                                <p>DELETE</p>
                            </button>
                            </div>
                        </div>
                    ))
                    }
            </div>
        </Layout>
    )
}

export default AdvertsPage;