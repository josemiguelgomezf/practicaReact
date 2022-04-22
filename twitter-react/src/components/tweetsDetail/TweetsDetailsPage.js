import * as React from 'react';
import './TweetsDetailsPage.css'
import Layout from '../layout/Layout'
import { useParams } from 'react-router-dom';

const TweetsDetailsPage = () => {
    const { tweetId } = useParams();
    return (
        <Layout title="TweetDetail">
            <div className="tweetsDetailsPage">
                {tweetId}
            </div>
        </Layout>
    )
}

export default TweetsDetailsPage;