## XML data parsing and persisting assignment

## Requirments 
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



```
data = {
    1: {
        systemUnit: {
            hardware: {eaeeaf
                "moduleSerialNumber": FTT192501W7,
                Monitoring: {
                    fan: {
                        1 : 2550,
                        2 : 2550,
                        3 : 2520,
                        4 : 2550
                    }
                },
                "temp": 66.7
            },
            productId: "Cisco TelePresence SX80,",
            productPlatform: "SX80",
            productType: "Cisco Codec",
            software: {
                name: s52020,
                optionKeys: {
                    encription: true,
                    multiSite: false,
                    PremiumResolution: true,
                    RemoteMonitoring: true
                },
                releaseDate: "2016-01-18",
                version: "ce8.0.1.1e47efe"
            },
            diagnostics: {
                1: {
                    lastRun: {
                        1: "2015-07-29T00:40:01Z",
                    },
                    message: {
                        1: {
                            item: 1,
                            description: "Microphone is not connected any more, check the connection",
                            level: "Error",
                            reference: "",
                            type: "MicrophoneDisconnected"
                        },
                        2: {
                            item:5,
                            Description: "NTP is not correctly configured. If the system clock is not correctly configured, certain features (e.g. encryption) may fail.",
                            level: Warning,
                            references: status=Discarded,
                            type: NTPStatus
                        }
                    }
                }
            },
            state: {
                numberOfActiveCalls: 1,
                NumberOfInProgressCalls: 0,
                NumberOfSuspendedCalls: 0
            }
        },
        peripherals:{
            connectedDevice: {
                1001:{
                    hardwareInfo: "102310-1",
                    id: "88:43:e1:c6:ae:12",
                    name: "Cisco TelePresence Touch",
                    softwareInfo: "TI8.0.1 1e47efe 2016-01-18",
                    status: "connected",
                    type: "touchPanel",
                    upgradeStatus: "None"
                },
                1045:{
                    hardwareInfo: "",
                    id: "18:8B:9D:D4:97:08",
                    name: "Precision 60 Camera",
                    softwareInfo: "HC8.0.1.1e47efe",
                    status: "connected",
                    type: "camera",
                    upgradeStatus: "None"
                },
                1046:{
                    hardwareInfo: "",
                    id: "18:8B:9D:D4:73:8C",
                    name: "Precision 60 Camera",
                    softwareInfo: "HC8.0.1.1e47efe",
                    status: "connected",
                    type: "camera",
                    upgradeStatus: "None",
                    additionalInfo: {

                    }
                },                
                1066:{
                    hardwareInfo: "",
                    id: "DC:EB:94:B4:0F:B8",
                    name: "SpeakerTrack 60",
                    softwareInfo: "MT8.0.1.1e47efe",
                    status: "connected",
                    type: "SpeakerTracker",
                    upgradeStatus: "None"s
                },
                Capabilities: {.....},
            }
        },
        callDetails: {
            item: 62,
            bookingId 15909,
            capabilities: {
                FECC: {
                    mode: On,
                    NumberOfPresents: 0,
                    NumberOfSources: 1,
                    Source: {
                        name: "n/a",
                        options: "ptzf",
                        sourceId: 1
                    }
                }, faredMessage: {
                    mode: off
                },
                hold: true,
                IxChannel: {
                    status: Active
                }, 
                Presentation: true

            },
            Manufacturer: Tandberg,
            MicrophonesMuted: False,
            SoftwareID: "unknown (new?)"
        },
        networkInfo: {
            macAddress: "80:E0:1D:F7:80:10",
            IPv4: {
                address: "10.254.180.166",
                gateWay: "10.254.180.10",
                subnetMask: "255.255.255.0"
            },
            IPv6: {
                address: "",
                gateway: ""
            }
        },
        systemTime: "2016-03-10T16:56:31Z",
        contactInfo: {
            contactMethod: {
                1: {
                    number:"2991063@ir.com"
                },
                2: {
                    number: "2991063"
                }
            },
            name: "CMC L 630-645-1063"
        }
    }
}

```