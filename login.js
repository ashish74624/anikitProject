const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();


const app = express();
var publicDir = require('path').join(__dirname,'/');
app.use(express.static(publicDir));
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/demo/login.html");
})

app.get("/register.html",function(req,res){
    res.sendFile(__dirname + "/demo/register.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/demo/index");
        } else {
            console.log("wrong password");
            res.redirect("/");
        }
        res.end();
    })
})

// when login is success
app.get("/demo/index",function(req,res){
    res.sendFile(__dirname + "/demo/index.html")
})

app.post('/reg',function(req,res){
    const f_name = req.body.f_name;
    const lname = req.body.l_name;
    const pass= req.body.password;
    const username=req.body.username;
    const phone=req.body.phoneNo;

    connection.query("INSERT INTO cutomer(`user_name`, `f_name`, `l_name`, `phone_no`,`password`) VALUES ('?','?','?','?','?')",[username,f_name,lname,phone,pass],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/");
        } else {
            console.log("wrong password");
            res.redirect("/");
        }
        res.end();})
})


//register part



// set app port 
app.listen(4000);