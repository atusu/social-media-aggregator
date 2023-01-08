import fetch from "node-fetch";

export async function callRedditAPI(user){

    //Making a request for an access token
    const id = "oJTFZeJYktP5vz8F2lpb7g";
    const secret = "seDYWm2JafPR92cgN5RhCRw0KKa4eA";
    const basicAuth = Buffer.from(`${id}:${secret}`).toString("base64");
    const username = "Remarkable-Day324";
    const password = "9TmM.QA4/%gGhnS";
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);

    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`
        },
        body: params
    });

    const data = await response.json();
    let access_token = data.access_token;

    //now that we have the token, we can have access to what we need
    const responseForUser = await fetch(`https://oauth.reddit.com/user/${user}/submitted`, {
        method: "GET",
        headers: {
            Authorization: `bearer ${access_token}`
        }
    });
    
    const dataForUser = await responseForUser.json();
    let responseForServer = {};    
    let posts = [];

    //checks if the user does not exist and returns the corresponding response
    if(!dataForUser.hasOwnProperty("data")){
        return responseForServer = {"posts":"0", "status":"204", "error":true, "error-message":"No user / empty input"}; 
    }
    posts = dataForUser.data.children;

    //checks if the user has no posts and returns the corresponding response
    if(posts.length == 0){
        return responseForServer = {"posts":"0", "status":"204", "error":true, "error-message":"No posts for this user"};
    }

    //if it got here then it means that the user exists and also has posts
    //will put all posts in an array and pass it to the response object
    for(let i = 0; i < posts.length; i++){
        posts[i] = posts[i].data.selftext;            
    }

    return responseForServer = {"posts": posts, "status":"200", "error": false, "error-message":"We gucci"};
    
}


