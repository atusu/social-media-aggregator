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
    console.log(access_token);

    let newuser = user;
    //async function apiCall(){
    const responseForUser = await fetch(`https://oauth.reddit.com/user/${newuser}/submitted`, {
        method: "GET",
        headers: {
            Authorization: `bearer ${access_token}`
        }
    });
    
    const dataForUser = await responseForUser.json();
    //console.log(dataForUser.data.children);
    try {
        let posts = dataForUser.data.children;
        return posts;
    } catch (error) {
        let res = {"error":"This Reddit user doesn't exist"};
        return res;
    }

    //get user posts

    // for(let i = 0; i < posts.length; i++){
    //     let counter = i+1;
    //     console.log(counter + ". " +posts[i].data.selftext + "\n" + posts[i].data.url);
    // }
    //}

    //apiCall();
}


