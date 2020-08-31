# takeHomeAssignment
xml parser



A client side utility that requests above xml file every 1 minute.
	•	For purpose of this assignment, we can read it from file system instead of requesting from a server.
	•	Parse the document and retrieve the following information:
	•	System Info <SystemUnit>
Hardware Details
Product Id
Product Platform
Product Type
Software Details
Diagnostic Information
State information
	•	Peripherals Connected <Peripherals>
If Peripheral is a camera, get additional info from <Cameras>
	•	Call Details, if live <Call>
	•	Network Info such as MAC, IPv4, IPv6 <Network>
	•	Capabilities <Capabilities>
	•	System Time <SystemTime>
	•	Contact Info <ContactInfo>	
	•	Present the above data in an easy to read/view format
	•	Visually indicate any anomalies or errors or crtical information
	•	Submission 
