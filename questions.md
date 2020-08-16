## Questions about XML parser


* __Language chosen and why?__
    * I chose to program my solution in JavaScript because I have the most experience with this langauge and take advantage of the DOM and debugging my code with the console.log functionality 
* __High level design. (A visio diagram or hand drawn image)__
    ![alt text](./images/parserDiagram.jpg)
* __How to deploy the solution.__
    * You can either add this to an existing project, and make a call to the backend of the application to persist the data on a server. This XML parser can be deployed on GitHub or any FrontEnd deploying website.
	•	Screenshots of formatted data presentation, in case we are not able to run the solution.
* __Source code__
        * Look inside the util folder
* __Steps to deploy the solution__
    * Project is deployed on GitHub at --> chubbard022.github.io/takeHomeAssignmentIR
* __highlighting any anomalies or errors__
    * I found that only in the < Capabilities > tags errors that didn't align with the camera data. Within the persisted data, there is a key value pair for the data under     AnomaliesInCapabilities
* __Screen shot showing data persisting__
    ![alt text](./images/screenshotDataPersist)
* __Steps to deploy the solution__
    1. call the backend to recieve the XML data
    2. use the parser created to sort out the necissary data.
    3. call parser function when the data is needed and easily grab the necissary data.