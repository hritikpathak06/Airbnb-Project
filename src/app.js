require("dotenv").config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
require("../src/db/connection");
const Employee = require("../src/model/login");
const app = express();
const port = process.env.PORT || 3000;
// *********************************************************************

const static_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname, "../tempelates/views");
const partial_path = path.join(__dirname, "../tempelates/partials");
// *********************************************************************

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partial_path);
// *********************************************************************

app.get("/", (req,res) => {
    res.render("index");
});

// app.get("/hotels", (req,res) => {
//     res.render("hotels")
// });

app.get("/register", (req,res) => {
    res.render("register")
});

app.post("/register", async(req,res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
       
        if(password === cpassword){
           const registerEmployee = new Employee({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            number:req.body.number,
            cpassword:req.body.cpassword,
            age:req.body.age,
            gender:req.body.gender,
           })
           console.log("the success part is: " + registerEmployee);

           const createUser = await registerEmployee.save();
           console.log("the page part : " + createUser);
           res.status(201).render("hotels")
        }else{
            res.render("error")
        }

    } catch (error) {
        res.send("error");
    }
});

app.get("/login", (req,res) => {
    res.render("login")
});

app.post("/login", async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Employee.findOne({email:email});
        if(userEmail.password === password){
            res.render("hotels")
        }else{
            res.send("something went wrong!")
        }
    }catch(err){
        res.status(404).render("error");
    }
})

app.get("/about", (req,res) => {
    res.render("about")
});

app.get("/contact", (req,res) => {
    res.render("contact")
});

app.get("/taj", (req,res) => {
    res.render("first");
})



// *********************************************************************

app.listen(port, () => {
    console.log(`server started successfully at the port ${port}`);
});
// *********************************************************************
