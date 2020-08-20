const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            let responseXML = xhr.responseXML;
            
            let collection = []
            //gather all of the data through helper functions
            window.setInterval(()=>{
            let persistedData = {}

            //all helper functions grabbing specific data
            handleSystemUnitData(responseXML,persistedData)
            handlecameraDetails(responseXML,persistedData)
            handleNetworkDetails(responseXML,persistedData)
            handleSystemTime(responseXML,persistedData)
            handleContactInfo(responseXML,persistedData)
            handleAnomaliesInCapabilities(responseXML,persistedData)
            
            // if you look within the console on a window browser, the data persistance can be seen. 
            // Also look inside questions.md for a screenshot of data persistance
            collection.push(persistedData)
            console.log(collection)

            
            outputDOM(collection)

            return collection
            }
            ,60 * 1000)
        }
        if(xhr.status === 404){
            console.log("file not found")
        }
    }
}

function handleSystemUnitData(responseData,persistedData){
    let systemUnitData = {};
    let systemUnit = responseData.getElementsByTagName("SystemUnit")[0]
    for(let items of systemUnit.children){
        switch(items.tagName){
            case "Hardware":
                for(let innerElm of items.children){
                    if(innerElm.tagName == "Monitoring" || innerElm.tagName == "Module"){
                        let monitorArr = []
                        for(let innerElm2 of innerElm.children){
                            if(innerElm2.tagName == "Fan"){
                                monitorArr.push(innerElm2.children[0].innerHTML)
                            }else{
                                systemUnitData[innerElm2.tagName] = innerElm2.innerHTML;
                            }
                            systemUnitData["Monitoring"] = monitorArr;
                        }
                    }else systemUnitData[innerElm.tagName] = innerElm.innerHTML;
                }
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
    return persistedData["systemUnit"] = systemUnitData    
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

function handleAnomaliesInCapabilities(responseData,persistedData){ 
    let AnomalieCapabilitieData = []
    let capabilities = responseData.getElementsByTagName("Capabilities")
    for(innerElm of capabilities){
        for(innerElm2 of innerElm.children){
            if(innerElm.children[0].tagName !== "Options" || innerElm.children[0].tagName == undefined){
                AnomalieCapabilitieData.push({[`${innerElm2.tagName}-capabilities`]: innerElm2.children})
            }
        }
    }
    return persistedData["AnomaliesInCapabilities"] = AnomalieCapabilitieData
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