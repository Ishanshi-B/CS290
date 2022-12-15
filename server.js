/*
 * Write your server code in this file.
 *
 * name: Ishanshi Bhardwaj
 * email: bhardwai@oregonstate.edu
 */

var http = require("http")
var fs = require('fs')

var htmlFile;
var javaScriptFile;
var styleFile;
var errors;
var benny;

//read the file 
fs.readFile("public/index.html", function(err,data){
    if(err){
        throw err;
    }
    htmlFile = data;
 });
fs.readFile("public/index.js",function(err,data){
    if(err){
        throw err;
    }
    javaScriptFile = data;
 });
 fs.readFile("public/style.css",function(err,data){
    if(err){
        throw err;
    }
    styleFile = data;
 });
fs.readFile("public/404.html",function(err,data){
   
    if(err){
        throw err;
    }
    errors = data;
   
});
fs.readFile("public/benny.jpg",function(err,data){
    if(err){
        throw err;
    }
    benny = data;
});

//check the port 
console.log("==process.env.PORT:", process.env.PORT);

//create the server
var server = http.createServer(function(req,res){
    console.log("method:",req.method)
    console.log("url:",req.url)
    console.log("headers:",req.headers)

if((req.url == "/index.html")|| (req.url == "/")){
    res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.write(htmlFile);

}
else if(req.url == "/style.css"){
    res.writeHead(200,{
        "Content-Type": "text/css"
    });
    res.write(styleFile);
}
else if(req.url == "/index.js"){
    res.writeHead(200,{
        "Content-Type": "text/js"
    });
    res.write(javaScriptFile);
}
else if(req.url == "/404.html"){
    res.writeHead(200,{
        "Content-Type": "text/html"
    });
    res.write(errors);
}
else if(req.url == "/benny.jpg"){
    res.writeHead(200,{
        "Content-Type": "image/jpg"
    });
    res.write(benny);
}
else{
        res.writeHead(404,{
            "Content-Type": "text/html"
        });
        res.write(errors);

}
res.end();
});

//listen to the server  
server.listen(process.env.PORT || 3000, function(error){
    if(error){
        console.log('Something went wrong', error)
    }
    else{
        console.log('Server is listening on port 3000')

    }
})
