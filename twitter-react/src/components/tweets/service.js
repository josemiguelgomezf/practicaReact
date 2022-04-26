import client from '../../api/client'

export const getLatestTweets = () => {
    return client.get('/v1/adverts');
}

export const getTweet = (tweetId) => {
    return client.get(`v1/adverts/${tweetId}`);
}

export const createTweet = tweet => {
    return client.post(`api/tweets/`, tweet);
}