const http = require("http");
const fs = require("fs");
const mimeTypes = require("mime-types");

const port = process.env.port || 1234;

const server = http.createServer((req, res) => {
  let path = req.url.replace(/^\/+|\/+$/g, "");

  if (path === "") {
    path = "index.html";
  }

  const file = __dirname + "/public/" + path;

  fs.readFile(file, (error, content) => {
    if (error) {
      console.log(`File not found ${file}`);
      res.writeHead(404);
      res.end();
    }
    res.setHeader("X-Content-Type-Options", "nosniff");

    const mime = mimeTypes.lookup(path);
    res.writeHead(200, { "Content-Type": mime });

    // switch (path) {
    //   case "index.html":
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     break;
    //   case "about.html":
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     break;
    //   case "services.html":
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     break;
    //   case "style.css":
    //     res.writeHead(200, { "Content-Type": "text/css" });
    //     break;
    //   case "favicon.ico":
    //     res.writeHead(200, { "Content-Type": "image/x-icon" });
    //     break;
    // }
    res.write(content);
    res.end();
  });
});

server.listen(port, (error) => {
  if (error) {
    console.log("Unable to connect to the server");
  }

  console.log(`Server up and running on port ${port}`);
});
