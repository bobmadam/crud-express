# crud-express
[![NPM
version](https://badgen.net/npm/v/express)](https://npmjs.org/package/express)

Example CRUD Express.js with PostgreSQL &amp; Redis
---

This is used for starting projects using the Express.js framework which requires a postgresql database connection and redis cache
### Requirements

For development, you will only need Node.js 20.10.0 and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.10.0

    $ npm --version
    10.2.3

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Running the project
- #### Check the credential
  Make sure the credentials for connecting to the PostgreSQL and Redis databases have been adjusted for your machine. Check and update them in the config/configs.json file.
  
- #### Run the file sql
  Run/execute table.sql in your local database
  
- #### Start

      $ npm start
