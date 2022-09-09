const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log("url", req.url)
    if (req.url === "/users") {
        console.log("method", req.method);
        try{
            const users = fs.readFileSync('users.json', 'utf-8');
            console.log(users);
            res.writeHead(200, { "content-type": "application/json" });
            res.write(users);
            res.end();
        }catch(err){
            console.log(err)
        }
    }

    const newUser = {
        name: "Yuto",
        country: "Japan",
        id: 4
    };


      if(req.url === "/postuser"){
        console.log("method", req.method);
        let userData = fs.readFileSync('users.json', 'utf-8');
        let userObject = JSON.parse(userData);
        userObject.users.push(newUser);
        
        const jsonNewData = JSON.stringify(userObject, null, 2)
        fs.writeFile('users.json', jsonNewData, (err)=>{
            if(err){
                console.log(err)
            }else{
                res.end();
            }
        })
      }

      const deleteUser = (array, id) =>{
        return array.filter((data) => data.id !== id)
      }

      if(req.url === "/deleteuser"){
        let userData = fs.readFileSync('users.json', 'utf-8');
        console.log(userData);
        
        let userObject = JSON.parse(userData);
        console.log(userObject.users[3])
        userObject.users = deleteUser(userObject.users, 4)
        console.log(userObject);
        // console.log(newData);
        const jsonNewData = JSON.stringify(userObject, null, 2);
        console.log(jsonNewData)
       
        fs.writeFile('users.json', jsonNewData, (err)=>{
            if(err){
                console.log(err)
            }else{
                res.end();
            }
        })
      }

      req.on('users', chunk =>{
        console.log(`${chunk}`)
      })
      req.on('end', () =>{
        res.end()
      })
})

server.listen(5000, () => console.log("server running on 5000"));