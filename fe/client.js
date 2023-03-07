const button = document.querySelector("#my-button");
const div = document.querySelector("#myDiv");
const response = document.querySelector("#response");

const option1 = document.querySelector("#twitter");
const option2 = document.querySelector("#reddit");

function returnOptions(content){
    return {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"content" :content})};
}

async function fetchReq(slash, content){
    const serverResponse = await fetch(slash, returnOptions(content))
    if(!serverResponse.ok){
        throw new Error('Request failed.');
    }
    const responseData = await serverResponse.json()
    console.log(responseData)
    if(responseData.error == true){
        response.innerHTML = "";
        let str = '<div style="border: 1px solid red;">'+responseData["error-message"]+'</div>';
        response.insertAdjacentHTML("beforeend", str);
    }else{
        response.innerHTML = "";
        for(let i = 0; i < responseData.input.length; i++){            
            let str = '<div class="tweet">'+
            '<div class="tweet-number">'+(i+1)+'</div>'+
            '<div class="tweet-text"><p>'+responseData.input[i]+'</p></div>'+
            // '<div class="tweet-id"><p>'+responseData.id[i]+'</p></div>'
            '</div>';
            response.insertAdjacentHTML("beforeend", str);  
        }
    } 
}

async function main() {
    button.addEventListener("click", function(){
        if(option1.selected == true){
            fetchReq("/twitter",document.getElementById("my-input").value);
        }else{
            fetchReq("/reddit",document.getElementById("my-input").value);
        }
    })
}

main()
