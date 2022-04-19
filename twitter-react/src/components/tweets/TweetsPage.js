import * as React from 'react';
import { getLatestTweets } from './service';

const TweetsPage = () => {
    const [tweets, setTweets] = React.useState([]);

    React.useEffect(() => {
        getLatestTweets().then(tweets => setTweets(tweets));
    }, [])

    return (
        <div className="tweetsPage">
            <ul>
                {tweets.map(tweet => (
                    <li key={tweet.id}>{tweet.content}{tweet.updatedAt}</li>
                ))
                }
            </ul>
        </div>
    )
}

export default TweetsPage;