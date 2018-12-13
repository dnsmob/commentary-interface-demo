# commentary-interface-demo

requires node/npm.

run `npm install` to get all node modules downloaded.
then run `npm start`. this should get json-server and webpack-dev running simultaneously. webpack should open a browser window by default and load the project.

if for any reason that does not work, it's possible to start the server manually by calling from the project root folder  
`./node_modules/.bin/json-server --watch db.json --port 3004`

and on a separate terminal window   
`./node_modules/.bin/webpack-dev-server --open --mode development --port 3003`


then navigate to `http://localhost:3003/` on your browser.