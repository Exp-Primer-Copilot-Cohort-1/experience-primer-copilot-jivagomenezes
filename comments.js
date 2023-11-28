//Create web server

var http = require("http");
var fs = require("fs");
var port = 8080;

var server = http.createServer(function (req, res) {
  if (req.url === "/comments.json") {
    fs.readFile("./comments.json", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      }
    });
  }
});

server.listen(port, function () {
  console.log("Server listening on port " + port);
});
