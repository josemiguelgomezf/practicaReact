const tweets = [
    {
        content: "JAJAJAJA",
        userId: 1,
        updatedAt: new Date().toLocaleTimeString(),
        id: 1
    },
    {
        content: "JAJAJAJA2",
        userId: 1,
        updatedAt: new Date().toLocaleTimeString(),
        id: 2
    }
]

const TweetsPage = () => (
    <div className="tweetsPage">
        <ul>
            {tweets.map(tweet => (
                <li key={tweet.id}>{tweet.content}{tweet.updatedAt}</li>
                ))
            }
        </ul>
    </div>
);

export default TweetsPage;