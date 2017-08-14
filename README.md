# nodejs-http-cli-starter
Basic nodejs http cli starter.

## Setup
Requires NodeJS.

    $ git clone https://github.com/strefethen/nodejs-http-cli-starter.git
    ...
    $ cd nodejs-http-cli-starter
    $ npm install

## VMware VAPI Example session
Here's an example of calling VMWare's REST API:

First, we authenticate to the vSphere REST endpoint:

    $ node app.js https://sc-rdops-vm08-dhcp-229-208.eng.vmware.com/rest/com/vmware/cis/session -m POST -u administrator@vsphere.local -p "Admin\!23"
    {
    value: "9cef7584c93dc839796513333b6aa4da"
    }

Next, we fetch a list of hosts (uses persistent cookie set in above auth call):

    $ node app.js https://sc-rdops-vm08-dhcp-229-208.eng.vmware.com/rest/vcenter/host
    {
    value: [    {
        host: "host-51",
        name: "10.160.242.245",
        connection_state: "CONNECTED",
        power_state: "POWERED_ON"
        },
        {
        host: "host-63",
        name: "10.160.244.237",
        connection_state: "CONNECTED",
        power_state: "POWERED_ON"
        }  ]
    }
