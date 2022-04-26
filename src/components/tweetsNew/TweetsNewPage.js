import * as React from 'react';
import './TweetsNewPage.css'
import Layout from '../layout/Layout'
import { createTweet } from '../tweets/service'
import { Navigate, useNavigate } from 'react-router-dom';

const TweetsNewPage = ({ isLogged, onLogout }) => {
    const [content, setContent] = React.useState("");
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const handleChange = event => {
        setContent(event.target.value)
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const tweetCreado = await createTweet({ content });
            navigate(`/tweets/${tweetCreado.id}`);
        }
        catch (error) {
            setError(error);
        }
    }

    if (error) {
        if (error.status === 401) {
            return <Navigate to="/login" />
        }
        return <Navigate to="/errorPage" />
    }

    return (
        <Layout title="TweetNew" isLogged={isLogged} onLogout={onLogout}>
            <div className="tweetsNewPage">
                <form onSubmit={handleSubmit}>
                    <input
                        type="textarea"
                        name="content"
                        value={content}
                        onChange={handleChange}
                    />
                    <button type="submit" disabled={!content}>Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default TweetsNewPage;