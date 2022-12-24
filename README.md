# Spreadsheet App

## How to run the app?

- Clone this repository in your machine
- Go to the root of the project
- run `npm i`
- run `npm run grant-permission`(This would give permission to the script file to be executed)
- run `npm run start-server`(This will pull the server docker file and run the docker file)
- run `npm start`
- Go to `localhost:3000`(If port 3000 was already in use, the server might start in the next available port)

## Screenshot

The following screenshot explains the different UI states supported by the application.

![Different States](./images/Different_States.png?raw=true "Different States")

The Application supports retry mechanism for the `/save` call, if the backend fails the it would try for atleast 10 times(this is configured in the constants file).

