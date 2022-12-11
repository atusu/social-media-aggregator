const button = document.querySelector("#my-button");
const div = document.querySelector("#myDiv");
const divul = document.querySelector("#response");

const option1 = document.querySelector("#alisia");
const option2 = document.querySelector("#mihai");

function returnOptions(content){
    return {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"content" :content})};
}

function fetchReq(slash, content){
    fetch(slash, returnOptions(content))
        .then(function(response){
            if(response.ok) {
                response.json()
                    .then(function(data) {
                        let str = data.input;
                        divul.innerHTML = str;
                    });
                    return;
                }
            
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });
}



    button.addEventListener("click", function(){
        if(option1.selected == true){
            fetchReq("/here",document.getElementById("my-input").value);
        }else{
            fetchReq("/special-pt-mihai",document.getElementById("mihai").value+" crede ca ma pacaleste pe mine cu porkeriile lui");
        }
    });



