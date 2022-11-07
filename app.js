const express = require("express")
const http = require("http")
const path = require("path")

const app = express();


/*app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})*/

app.use(express.static("public"));

const server = http.createServer(app);

let port = process.env.PORT || 3002;

server.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})
