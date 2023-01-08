import fetch from "node-fetch";

export async function callRedditAPI(user){
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
    //-------------------------------------------------
    let newuser = user;
    const responseForUser = await fetch(`https://oauth.reddit.com/user/${newuser}/submitted`, {
        method: "GET",
        headers: {
            Authorization: `bearer ${access_token}`
        }
    });
    
    const dataForUser = await responseForUser.json();
    //-------------------------------------------------
    let responseForServer = {};
    let state = 0;
    let posts = [];
    //-------------------------------------------------
    //checks if the user exists
    try {
        posts = dataForUser.data.children;
        //checks if the user exists and has posts
        if(posts.length > 0){
            //each post's text is added to an array which is passed to the server response object
            for(let i = 0; i < posts.length; i++){
                posts[i] = posts[i].data.selftext;
                //state = 1 -- if user exists and has posts
                state = 1;
            }
        }else{
            //state = 2 -- if the user exists but has no posts
            state = 2;
        }
        
    } catch (error) {
        //state = 3 -- if the user doesn't exist
        state = 3;
    }
    //-------------------------------------------------
    switch (state) {
        case 1:
            responseForServer = {"posts": posts, "status":"200", "error": false, "error-message":"We gucci"};
            break;
        case 2:
            responseForServer = {"posts":"0", "status":"204", "error":true, "error-message":"No posts for this user"};
            break;
        case 3:
            responseForServer = {"posts":"0", "status":"204", "error":true, "error-message":"No user/empty input"};
            break;
        default:
            break;
    }

    return responseForServer;
}


