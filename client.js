const button = document.querySelector("#my-button");
const div = document.querySelector("#myDiv");
const divul = document.querySelector("#response");

function returnOptions(){
    console.log(document.getElementById("my-input").text);
    return {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"content" :document.getElementById("my-input").value})};
}
button.addEventListener("click", function(){
    fetch('/here', returnOptions())
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
});

