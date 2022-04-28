import * as React from 'react';
import './AdvertsDetailsPage.css'
import Layout from '../layout/Layout'
import { Navigate, useParams } from 'react-router-dom';
import { getAdvert } from '../adverts/service';
import { configureClient } from '../../api/client'

class AdvertsDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            advert: null,
            error: null
        };
    }

    async componentDidMount() {
        try {
            const advert = await getAdvert(this.props.advertId);
            let { name, price, sale, tags, photo } = advert;
            this.nameAdvert = name;
            this.priceAdvert = price;
            this.saleAdvert = sale;
            this.tagsAdvert = tags;
            this.photoAdvert = photo;
            this.setState({ advert });
        }
        catch (error) {
            this.setState({ error });
        }
    }

    render() {

        if (this.state.error) {
            return <Navigate to="/errorPage" />
        }

        return (
            <Layout isLogged={(this.props.isLogged)} onLogout={(this.props.onLogout)} title="ADVERT DETAIL">
                <div className="advertsDetailsPage">
                    <h1>{this.nameAdvert}</h1>
                    <p>{this.priceAdvert}$</p>
                    <p hidden={!this.saleAdvert}>
                        VENTA
                    </p>
                    <p hidden={this.saleAdvert}>
                        COMPRA
                    </p>
                    <p>{this.tagsAdvert}</p>
                    <div className="containerImgs">
                        <img src={this.photoAdvert} alt={this.nameAdvert} />
                    </div>
                </div>
            </Layout>
            )
    }
}
const AdvertsDetailsPageFunction = ({ isLogged, onLogout }) => {
    const { advertId } = useParams();

    const accessToken = localStorage.getItem('token');
    configureClient({ accessToken });

    return <AdvertsDetailsPage isLogged={isLogged} onLogout={onLogout} advertId={advertId} />;
}

export default AdvertsDetailsPageFunction;