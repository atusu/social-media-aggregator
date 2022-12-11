import fetch from "node-fetch";

export async function callTwitterAPI(username){
    /* Twitter constants */
    const bearerToken = "AAAAAAAAAAAAAAAAAAAAAABIkQEAAAAAL1pQEBuExuzUXPPy9kc8JBRaIfM%3DZ7DzqAaxBdT5HQ7ggOvdauEoymZWdplgu01P07lV2UkL3VTULS"
    const options = {"headers": {"Authorization": `Bearer ${bearerToken}`}, "method": "GET"}
    const userName = username;
    const url = `https://api.twitter.com/2/users/by?usernames=${userName}`;
    // api twitter "users/by/username"
    const usernameResponse = await fetch(url, options);
    const usernameData = await usernameResponse.json();
    
    // should print { data: { id: '44196397', name: 'Elon Musk', username: 'elonmusk' } }
    
    // will get user's ID, required to get the tweets (44196397)
    const userId = parseInt(usernameData["data"][0]["id"]);  
    const tweetFields = "id,author_id,text,created_at" 
    // api twitter users/{id}/tweets
    const url2 = `https://api.twitter.com/2/users/${userId}/tweets`;
    const postsResponse = await fetch(url2, options)
    
    const postsData = await postsResponse.json()
    return postsData;
}
