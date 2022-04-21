import * as React from 'react';
import './TweetsNewPage.css'
import Layout from '../layout/Layout'

const TweetsNewPage = ({ isLogged, onLogout }) => {
    return (
        <Layout title="TweetNew" isLogged={isLogged} onLogout={onLogout}>
            <div className="tweetsNewPage">
                <ul>
                </ul>
            </div>
        </Layout>
    )
}

export default TweetsNewPage;