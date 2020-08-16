const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            let responseXML = xhr.responseXML;
            
            let collection = []
            //gather all of the data through helper functions
            window.setInterval(()=>{
            let persistedData = {}

            handleSystemUnitData(responseXML,persistedData)
            handlecameraDetails(responseXML,persistedData)
            handleNetworkDetails(responseXML,persistedData)
            handleSystemTime(responseXML,persistedData)
            handleContactInfo(responseXML,persistedData)
            //output to DOM persisted data
            collection.push(persistedData)
            console.log(collection)
            outputDOM(collection)
            //console.log(persistedData)
            return collection
            }
            ,6000)
        }
        if(xhr.status === 404){
            console.log("file not found")
        }
    }
}

function handleSystemUnitData(responseData,persistedData){
    let systemUnitData = {};
    let systemUnit = responseData.getElementsByTagName("SystemUnit")[0]
    console.log(systemUnit)
    for(let items of systemUnit.children){
        switch(items.tagName){
            case "Hardware":
                console.log("Hardware",items.children) // ******************
                for(let innerElm of items.children){
                    console.log("Hardware",innerElm.innerHTML)
                }
               //console.log("Hardware",items.children.tagName, items.children.innerHTML)
                break;
            case "ProductId":
                systemUnitData["ProductId"] = items.innerHTML;
                break;
            case "ProductPlatform":
                systemUnitData["ProductPlatform"] = items.innerHTML;
                break;
            case "ProductType":
                systemUnitData["ProductType"] = items.innerHTML;
                break;
            case "Software":
                let softwareTemp = {
                    optionKeys: {}
                };
                for(let innerElm of items.children){
                    if(innerElm.tagName == "OptionKeys"){
                        for(let innerElm2 of innerElm.children)
                            softwareTemp.optionKeys[innerElm2.tagName] = innerElm2.innerHTML;
                    }else softwareTemp[innerElm.tagName] = innerElm.innerHTML;
                }
                systemUnitData["software"] = softwareTemp;
                break;
            case "Diagnostics":
                let diagTemp = {
                    message:[]
                }

                for(let innerElm of items.children){
                    if(innerElm.tagName =="Message"){
                        let innerDiagTemp = {}
                        for(let innerElm2 of innerElm.children){
                            innerDiagTemp[innerElm2.tagName] = innerElm2.innerHTML;
                        }
                        diagTemp.message.push(innerDiagTemp);
                        innerDiagTemp = {};
                    }else diagTemp[innerElm.tagName] = innerElm.innerHTML;
                }
                systemUnitData["Diagnostics"] = diagTemp;
                break;
            case "State":
                let temp = {}
                for(let innerElm of items.children){
                        temp[innerElm.tagName] = innerElm.innerHTML;
                    }
                    systemUnitData["state"] = temp;
                break;
            case "Uptime":
                systemUnitData["Uptime"] = items.innerHTML;
                break;
            default:
                break;
        }
    }
    return persistedData["systemUnit"] = systemUnit    
}

function handlecameraDetails(responseData,persistedData){
    let cameraDetails = []

    let peripherals = responseData.getElementsByTagName("Peripherals")
                        .item(0).getElementsByTagName("ConnectedDevice")
    let connectedWithCamera = [
        {0:peripherals[1].children},
        {0:peripherals[2].children}
    ]
    //grabbing details about camera and pushing to cameraDetails array.
    for(let i=0; i<connectedWithCamera.length; i++){
        let temp = {}
        for(let item of connectedWithCamera[i][0]){
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
                    let temp = {
                        capabilities: []
                    }
                    for(let cameraDetail of item.children){
                        if(cameraDetail.tagName == "Capabilities"){
                            temp.capabilities.push(cameraDetail.children[0].innerHTML)
                        }else temp[cameraDetail.tagName] = cameraDetail.innerHTML
                    }
                    cameraDetails[index] = Object.assign({},camera,temp)
                    temp={}
                }
            } 
    })
    return persistedData["camera"] = cameraDetails
}
function handleNetworkDetails(responseData,persistedData){
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
    return persistedData["network"] = networkDetails;
}

function handleSystemTime(responseData,persistedData){
    let systemTime = responseData.getElementsByTagName("SystemTime")
   return persistedData["systemTime"] = systemTime[0].innerHTML;
}

function handleContactInfo(responseData,persistedData){
    let contactInfoData = {
        number: []
    };
    let contactInfo = responseData.getElementsByTagName("ContactInfo")[0].children
    for(let info of contactInfo){
        if(info.tagName == "ContactMethod"){
            contactInfoData.number.push(info.children[0].innerHTML)
        }else{
            contactInfoData[info.tagName] = info.innerHTML
        }
    }
    return persistedData["contactInfo"] = contactInfoData;
}

function handleCapabilities(responseData,persistedData){
    //go through data
    //if capabilities are not in camera, add to list,
    //push into persistedData as outLires
}

function outputDOM(){
    //for every time put success message on for five seconds
    let parsedData = document.getElementById("parsedData")
    let newNode = document.createElement("p")
    let text = document.createTextNode("collected data successful")
    newNode.appendChild(text)
    parsedData.appendChild(newNode)
    window.setInterval(()=>{
        newNode.remove()
    },3000)
}


xhr.open("get", 'status.xml', true);
xhr.send();

