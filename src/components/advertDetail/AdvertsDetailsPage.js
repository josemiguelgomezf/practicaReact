import * as React from 'react';
import './AdvertsDetailsPage.css'
import Layout from '../layout/Layout'
import { Navigate, useParams } from 'react-router-dom';
import { getAdvert } from '../adverts/service'

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
                    {JSON.stringify(this.state.advert)}
                </div>
            </Layout>
            )
    }
}
const AdvertsDetailsPageFunction = ({ isLogged, onLogout }) => {
    const { advertId } = useParams();
    return <AdvertsDetailsPage isLogged={isLogged} onLogout={onLogout} advertId={advertId} />;
}

export default AdvertsDetailsPageFunction;