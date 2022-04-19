import client from '../../api/client'

export const getLatestTweets = () => {
    return client.get('api/tweets');
}