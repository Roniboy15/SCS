const express = require("express")
const http = require("http")
const path = require("path");

const { routesInit } = require("./routes/configRoutes");

require("./db/mongoConnected.js");

const bodyParser = require('body-parser')


const app = express();

app.use(express.urlencoded({
    extended: true
  }))
  
app.use( bodyParser.json() )
app.use(express.json());

/*app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})*/

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static("public"));

routesInit(app);



const server = http.createServer(app);

let port = process.env.PORT || 3005;

server.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})
