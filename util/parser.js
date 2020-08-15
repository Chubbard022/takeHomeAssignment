
let persistedData = {}

const xhr = new XMLHttpRequest();

window.setInterval(xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            let responseXML = xhr.responseXML;

            //gather all of the data through helper functions
            handleSystemUnitData(responseXML)
            handlecameraDetails(responseXML)
            handleNetworkDetails(responseXML)
            handleCapabilities(responseXML)
            handleSystemTime(responseXML)
            handleContactInfo(responseXML)

            //output to DOM persisted data
            outputDOM()
        }
        if(xhr.status === 404){
            console.log("file not found")
        }
    }
},60000)

function handleSystemUnitData(responseData){
    //systemUnit and all of its child nodes needed
    let systemUnit = responseData.getElementsByTagName("SystemUnit")[0]
    persistedData["systemUnit"] = systemUnit    
}

function handlecameraDetails(responseData){
    let cameraDetails = []

    let peripherals = responseData.getElementsByTagName("Peripherals")
                        .item(0).getElementsByTagName("ConnectedDevice")
    let connectedWithCamera = [
        {1:peripherals[1].children},
        {1:peripherals[2].children}
    ]
    //grabbing details about camera and pushing to cameraDetails array.
    for(let i=0; i<connectedWithCamera.length; i++){
        let temp = {}
        for(let item of connectedWithCamera[i][1]){
            temp[item.tagName] = item.innerHTML
        }
        cameraDetails.push(temp)
        temp = {}
    }

    //grabbing additional camera details from <Camera> elements that match camera
    let cameras = responseData.getElementsByTagName("Camera")
    cameraDetails.forEach((camera,index)=>{
        let cameraID = camera.ID;
            for(let item of cameras){
                if( cameraID == item.getElementsByTagName("MacAddress")[0].textContent){
                    let temp = {}
                    for(let cameraDetail of item.children){
                        temp[cameraDetail.tagName] = cameraDetail.innerHTML
                    }
                    cameraDetails[index] = Object.assign({},camera,temp)
                    temp={}
                }
            } 
    })
    persistedData["camera"] = cameraDetails
}
function handleNetworkDetails(responseData){
    let networkDetails = []
    let network = responseData.getElementsByTagName("Network")
    for(let item of network){
        for(let i=0; i<item.children.length;i++){
            let itemElement = item.children[i];
            switch(itemElement.tagName){
                case "Ethernet":
                    networkDetails.push({[itemElement.tagName] : itemElement.innerHTML})
                    break;
                case "IPv4":
                    networkDetails.push({[itemElement.tagName]: itemElement.innerHTML})
                    break;
                case "IPv6":
                    networkDetails.push({[itemElement.tagName]: itemElement.innerHTML})
                    break;
                default:
                    break;
            }
        }
    }
    persistedData["network"] = networkDetails;
}

function handleCapabilities(responseData){

}

function handleSystemTime(responseData){

}

function handleContactInfo(responseData){

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

