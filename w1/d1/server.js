const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request received", req.url);
  
  if(req.url == '/dog'){
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Dog. woof</h1>");
    res.end();
  } else if(req.url == '/cat'){
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Cat. meow</h1>");
    res.end();
  }else{
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello World!!!!!!!</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
