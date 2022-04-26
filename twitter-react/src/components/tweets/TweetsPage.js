import * as React from 'react';
import { getLatestTweets } from './service';
import './TweetsPage.css'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom';
import {configureClient} from '../../api/client'

const TweetsPage = ({ isLogged, onLogout }) => {
    const [tweets, setTweets] = React.useState([]);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        if (isLogged) {
            const accessToken = localStorage.getItem('token');
            configureClient({ accessToken });
        }
        getLatestTweets().then(tweets => setTweets(tweets))
            .catch(Error => setError(Error));
    }, []);

    if (error) {
        return (
            <Layout title="Listado" isLogged={isLogged} onLogout={onLogout}>
                <div className="tweetsPage">
                    <p>{error.message}</p>
                </div>
            </Layout>
        )
    }

    if (!tweets.length) {
        return (
            <Layout title="Listado" isLogged={isLogged} onLogout={onLogout}>
                <div className="tweetsPage">
                    <p>¡No hay tweets!</p>
                </div>
            </Layout>
            )
    }
    return (
        <Layout title="Listado" isLogged={isLogged} onLogout={onLogout}>
            <div className="tweetsPage">
                <ul>
                    {tweets.map(tweet => (
                        <div key={tweet.id}>
                            <Link to={`/tweets/${tweet.id}`}>
                                {tweet.id}
                            </Link>
                            <p>
                                {tweet.name}
                            </p>
                            <p>
                                {tweet.createdAt}
                            </p>
                            <p>
                                {tweet.sale}
                            </p>
                            <p>
                                {tweet.price}
                            </p>
                            <p>
                                {tweet.tags}
                            </p>
                        </div>
                        
                    ))
                    }
                </ul>
            </div>
        </Layout>
    )
}

export default TweetsPage;