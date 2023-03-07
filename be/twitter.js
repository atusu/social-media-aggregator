import fetch from "node-fetch";

export async function callTwitterAPI(username){
    /* Twitter constants */
    const bearerToken = "AAAAAAAAAAAAAAAAAAAAAABIkQEAAAAAL1pQEBuExuzUXPPy9kc8JBRaIfM%3DZ7DzqAaxBdT5HQ7ggOvdauEoymZWdplgu01P07lV2UkL3VTULS"
    const options = {"headers": {"Authorization": `Bearer ${bearerToken}`}, "method": "GET"}
    const userName = username;
    const url = `https://api.twitter.com/2/users/by?usernames=${userName}`;
    //------------------------------------------------- 
    const usernameResponse = await fetch(url, options);
    const usernameData = await usernameResponse.json();
    //-------------------------------------------------
    let responseForServer = {};
    let state = 0;
    let data = []; 
    
    //checks if the user exists and returns the corresponding response object in case not
    if(!usernameData.hasOwnProperty("data")){
        return responseForServer = {"posts":"0", "error":true, "error-message":"No user / empty input", "status":"204"};
    }
    //we know that the user exits so now we are extracting their posts
    const userId = parseInt(usernameData["data"][0]["id"]);  
    const tweetFields = "id,author_id,text,created_at" 
    const url2 = `https://api.twitter.com/2/users/${userId}/tweets`;
    const postsResponse = await fetch(url2, options)     
    const postsData = await postsResponse.json()
    //checks if the user has posts and returns the corresponding response object in case not
    if(!postsData.hasOwnProperty("data")){
        return responseForServer = {"posts":"0", "error":true, "error-message":"The user has no posts", "status":"204"}; 
    }
    //-------------------------------------------------
    data = postsData.data;
    console.log(data)

    let newData = [];
    newData["text"] = [];
    newData["id"] = [];
    //it got here which means user exists and also has posts
    //will pass the posts' text as an array within the response object    
    for(let i = 0; i < data.length; i++) {
        newData.text[i] = data[i].text;
        newData.id[i] = data[i].id;

        console.log((i+1) + newData.text[i])
        console.log((i+1) + newData.id[i]);
    }
    return responseForServer = {"posts":newData, "error": false, "error-message":"We gucci", "status":"200"};
}
 