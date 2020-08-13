let persistedData = {}

const xhr = new XMLHttpRequest();

window.setInterval(xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            let responseXML = xhr.responseXML;


            getData(responseXML)
        
            outputDOM()
        }
        if(xhr.status === 404){
            console.log("file not found")
        }
    }
},10000)
function getData(responseData){
    //systemUnit and all of its child nodes needed
    let systemUnit = responseData.getElementsByTagName("SystemUnit")[0]
    persistedData["systemUnit"] = systemUnit

    let peripherals = responseData.getElementsByTagName("Peripherals").item(0)
    console.log(peripherals)

}
function outputDOM(){
    let parsedData = document.getElementById("parsedData")
    let newNode = document.createElement("p")
    let text = document.createTextNode("working")
    newNode.appendChild(text)
    parsedData.appendChild(newNode)
}


xhr.open("get", 'status.xml', true);
xhr.send();

