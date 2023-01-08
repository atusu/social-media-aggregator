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
    
    //check if the user exists and has posts 
    if(usernameData.hasOwnProperty("data")){
        const userId = parseInt(usernameData["data"][0]["id"]);  
        const tweetFields = "id,author_id,text,created_at" 
        const url2 = `https://api.twitter.com/2/users/${userId}/tweets`;
        const postsResponse = await fetch(url2, options)     
        const postsData = await postsResponse.json()
        
        //check if the user has posts
        if(postsData.hasOwnProperty("data")){
            data = postsData.data;
            //state = 1 -- if the user exists and has posts
            state = 1;
            //each post's text is added to an array which is passed to the server response object
            for(let i = 0; i < data.length; i++) {
                data[i] = data[i].text;
            }
            //-------------------------------------------------
        }else{
            //state = 2 -- if the user exists, but has no posts
            state = 2;
        }
        //-------------------------------------------------
    }else{
        //state = 3 -- user doesn't exist or empty input
        state = 3;
    }  

    switch (state) {
        case 1:
            responseForServer = {"posts":data, "error": false, "error-message":"We gucci", "status":"200"};   
            break;
        case 2:
            responseForServer = {"posts":"0", "error":true, "error-message":"The user has no posts", "status":"204"}; 
            break;
        case 3: 
            responseForServer = {"posts":"0", "error":true, "error-message":"No user / empty input", "status":"204"}; 
        default:
            break;
    }

    return responseForServer;

}
 