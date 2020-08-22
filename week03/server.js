const http = require("http");
http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(Buffer.from(chunk.toString()));
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        console.log("body:", body);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(
          `<html maaa=a>
          <head>
            <style>
            body div #myid{
              width:100px
            }
             div .cls{
              width:100px
            }
            </style>
          </head> 
          <body>
          <div>
          <div id="myid"></div>
          </div>
          
          </body>

        `
        );
      });
  })
  .listen(8088);
console.log("Server started!");
