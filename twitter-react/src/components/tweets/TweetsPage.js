import * as React from 'react';
import { getLatestTweets } from './service';
import './TweetsPage.css'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom';

const TweetsPage = ({ isLogged, onLogout }) => {
    const [tweets, setTweets] = React.useState([]);

    React.useEffect(() => {
        getLatestTweets().then(tweets => setTweets(tweets));
    }, []);

    return (
        <Layout title="Listado" isLogged={isLogged} onLogout={onLogout}>
            <div className="tweetsPage">
                <ul>
                    {tweets.map(tweet => (
                        <li key={tweet.id}>
                            <Link to={`/tweets/${tweet.id}`}>
                                {tweet.content}
                            </Link>
                            <p>
                                {tweet.updatedAt}
                            </p>
                        </li>
                        
                    ))
                    }
                </ul>
            </div>
        </Layout>
    )
}

export default TweetsPage;