---
sidebar_position: 1
---

import { SectionUnderConstruction } from "@site/src/components/admonitions/under-construction.tsx";

# Hutch Agent

<SectionUnderConstruction />

The Hutch Agent is a .NET application written in C#. It is responsible for receiving 5-Safes RO-Crates with an approved workflow and triggering the execution of that workflow. It then awaits the results of the execution and packages them to be sent back to the TRE Controller.

## Installation to a remote Virtual Machine
:::info
Currently, we only support deploying to Ubuntu 22.04 LTS. The following instructions tell you how to do this using Ansible.
:::

### Installing Ansible
On your **local** machine, you will need to install [Ansible](https://www.ansible.com/). Then you will need to download the [Ansible playbooks](https://github.com/Health-Informatics-UoN/hutch/releases) for installing HutchAgent, the workflow executor ([WfExS](https://github.com/inab/WfExS-backend)) and all the side dependencies for the Hutch environment. Your **remote** machine must be accessible via `ssh` by your local machine. You must also have a user on the remote machine with `sudo` privileges.

### Providing HutchAgent configuration for Ansible
In the directory where you've downloaded and unpacked the Ansible playbooks, find the file `hutch-agent.service` in `playbooks/files`. Open this file in a text editor of your choice and set the configuration variables to suit your environment. Guidance on the use of the variables can be found [here](/getting-started/configuration/agent.md).

Once the configuration is finished, you can deploy HutchAgent to your VM. 

### Running Ansible

Open the file called `inventory.ini`, at the top directory where you downloaded the Ansible playbooks, and add either the IP address of the VM to which you are deploying or the hostname of the VM.

Open a terminal window in the top directory where you downloaded the Ansible playbooks and use the following command:

```bash
ansible-playbook -i inventory.ini -u <remote username> -K playbook.yml
```

:::info About the command
- `ansible-playbook`: the command that will run an Ansible playbook.
- `-i inventory.ini`: `-i` is the flag used when specifying an inventory file - a file with a list of IP addresses or hostnames to execute the playbook against. `inventory.ini` is the file with the IPs/hostnames and it is already in the playbook directory's root.
- `-u <remote user>`: `-u` is the flag to specify the username on the remote machine that will execute the playbook. Replace `<remote user>` with a username on the remote machine, e.g. `alice`.
- `-K`: this will cause `ansible-playbook` to prompt you for the `sudo` password on the remote machine.
- `playbook.yml`: the name of the main playbook in the directory.
:::
