import * as React from 'react';
import './TweetsDetailsPage.css'
import Layout from '../layout/Layout'
import { Navigate, useParams } from 'react-router-dom';
import { getTweet } from '../tweets/service'

class TweetsDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet: null,
            error: null
        };  
    }

    async componentDidMount() {
        try {
            const tweet = await getTweet(this.props.tweetId);
            this.setState({ tweet });
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
            <Layout isLogged={(this.props.isLogged)} onLogout={(this.props.onLogout)} title="TweetDetail">
                <div className="tweetsDetailsPage">
                    {JSON.stringify(this.state.tweet)}
                </div>
            </Layout>
            )
    }
}
const TweetsDetailsPageFunction = ({ isLogged, onLogout }) => {
    const { tweetId } = useParams();
    return <TweetsDetailsPage isLogged={isLogged} onLogout={onLogout} tweetId={tweetId} />;
}

export default TweetsDetailsPageFunction;