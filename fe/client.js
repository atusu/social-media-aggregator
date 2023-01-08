const button = document.querySelector("#my-button");
const div = document.querySelector("#myDiv");
const response = document.querySelector("#response");

const option1 = document.querySelector("#alisia");
const option2 = document.querySelector("#mihai");
const option3 = document.querySelector("#twitter");
const option4 = document.querySelector("#reddit");

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
        let str = '<div style="border: 1px solid red;">'+responseData.input+'</div>';
        response.insertAdjacentHTML("beforeend", str);
    }else{
        response.innerHTML = "";
        for(let i = 0; i < responseData.input.length; i++){            
            let str = '<div style="display:flex;" class="tweet">'+
            '<div class="tweet-number" style="border: 1px solid black;">'+(i+1)+'</div>'+
            '<div class="tweet-text" style="border: 1px solid black;">'+responseData.input[i]+'</div>'+
            '</div>';
            response.insertAdjacentHTML("beforeend", str);  
        }
    }
    //else{
    //     response.innerHTML = "Nu am gasit user";
    // }   
}

async function main() {
    button.addEventListener("click", function(){
        if(option1.selected == true){
            fetchReq("/here",document.getElementById("my-input").value);
        }else if(option2.selected == true){
            fetchReq("/special-pt-mihai",document.getElementById("my-input").value);
        }else if(option3.selected == true){
            fetchReq("/twitter",document.getElementById("my-input").value);
        }else{
            fetchReq("/reddit",document.getElementById("my-input").value);
        }
    })
}

main()
