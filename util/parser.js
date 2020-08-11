let data = import("../data")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function makeRequest(someData){
    let newRequest = new XMLHttpRequest();
    console.log(newRequest.readyState)
}

makeRequest()