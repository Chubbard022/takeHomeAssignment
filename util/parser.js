let persistedData = {}

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log(xhr.responseText)
            let responseText = xhr.responseText;

            let parsedData = document.getElementById("parsedData")

            let newNode = document.createElement("p")
            let text = document.createTextNode("working")
            newNode.appendChild(text)
            parsedData.appendChild(newNode)
        }
        if(xhr.status === 404){
            console.log("file not found")
        }
    }
}

xhr.open("get", 'status.xml', true);
xhr.send();

