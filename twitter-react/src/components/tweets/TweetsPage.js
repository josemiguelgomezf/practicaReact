import * as React from 'react';
import { getLatestTweets } from './service';
import './TweetsPage.css'
import Layout from '../layout/Layout'

const TweetsPage = () => {
    const [tweets, setTweets] = React.useState([]);

    React.useEffect(() => {
        getLatestTweets().then(tweets => setTweets(tweets));
    }, []);

    return (
        <Layout title="Listado">
            <div className="tweetsPage">
                <ul>
                    {tweets.map(tweet => (
                        <li key={tweet.id}>{tweet.content}{tweet.updatedAt}</li>
                    ))
                    }
                </ul>
            </div>
        </Layout>
    )
}

export default TweetsPage;