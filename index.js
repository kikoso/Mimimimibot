const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api",
    consumer_key: "", // from Twitter.
    consumer_secret: "", // from Twitter.
    access_token_key: "", // from your User (oauth_token)
    access_token_secret: "" // from your User (oauth_token_secret)
});

client.post("statuses/update", {status: 'Hello, World!'})
    .then(() => console.log('Success!'))

const parameters = {
    track: "@MimimimimimiBot",
    follow: "1130289164019126272",
};


const stream = client.stream("statuses/filter", parameters)

    .on("start", response => console.log("start"))
    .on("data", tweet => mimify(tweet))
    .on("ping", () => console.log("ping"))
    .on("error", error => console.log("error", error))
    .on("end", response => console.log("end"));

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

async function mimify(tweet) {
    if (tweet.user.id != 1130289164019126300) {

        if (tweet.in_reply_to_status_id_str != null) {
            var x = await client.get("statuses/show", {id: tweet.in_reply_to_status_id_str, tweet_mode: "extended"})
            replaceAndUpdate(x.full_text, tweet)
        } else {
            var x = tweet.text
            replaceAndUpdate(x, tweet)
        }
    }
}

function replaceAndUpdate(x, tweet) {
    var y = replaceAll(x, "@MimimimimimiBot ", "")
    y = replaceAll(y, "@MimimimimimiBot", "")
    y = y.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    y = replaceAll(y, 'a', 'i')
    y = replaceAll(y, 'e', 'i')
    y = replaceAll(y, 'o', 'i')
    y = replaceAll(y, 'u', 'i')
    y = replaceAll(y, 'A', 'I')
    y = replaceAll(y, 'E', 'I')
    y = replaceAll(y, 'O', 'I')
    y = replaceAll(y, 'U', 'I')
    y = "@" + tweet.user.screen_name + " " + y
    client.post("statuses/update", {status: y, in_reply_to_status_id: tweet.id_str})
        .then(() => console.log('Success!'))
}