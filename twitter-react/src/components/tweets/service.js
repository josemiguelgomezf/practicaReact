import client from '../../api/client'

export const getLatestTweets = () => {
    return client.get('api/tweets');
}

export const getTweet = (tweetId) => {
    return client.get(`api/tweets/${tweetId}`);
}

export const createTweet = tweet => {
    return client.post(`api/tweets/`, tweet, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
}