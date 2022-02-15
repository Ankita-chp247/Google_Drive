const http = require("http");
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");                  
const path = require("path");
const fs = require("fs");                                                 
const handlebar = require("handlebars");                                        
const { default: axios } = require("axios");                                                                                                                      
const app = express();    
app.use(express.json());                                               


app.engine(                        
  ".hbs",                                                                                                                        
  engine({                                                                                                                                                              
    extname: ".hbs",                                                                                                                                                                                                                                                                                                                       
    defaultLayout : "main",                                                                                                                                                                                                                                        
  })                                                                                                                
)

app.use(express.urlencoded({extended : false}));
  app.use("/v4", routes);                    
  
  app.set("view engine",".hbs")                                                                                                                                      
  app.set("views", path.join(__dirname, "views"));                                                                                 

                                                                                                             
 const static_path = path.join(__dirname,"./public");                                                                                                                                                                                                                                                                                                                                                                          
  console.log(static_path)                                                                                                                                                                                         
  
  app.use(express.static(static_path));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                             
  
app.get("/", async(req, res,next) => {                                                                                                                                                                                                                                                                                                                                                                                                                       
  res.render("signup/register",{                                                                                                                                                                                                                                  
    StyleSheet :"register.css"                                                                                                                                                                                                                                                                                                
  })                                                                                                        
  next();                                                                          
});                                                    
app.get("/", async(req, res) => {                                                                                                                                                                                                                                                
  res.render("Signin/login",{                                                                                                                                                                     
    StyleSheet :"style.css"                                  
  })     
});
mongoose
  .connect("mongodb://localhost:27017/google_drive")                                                                                                                                                                       
  .then(() => console.log("Database connected successfully"))                                                                     
  .catch(console.log);                                                                                                                                

const server = http.createServer(app);                                                                                                                                                          
                                        
server
  .listen(4000)                                                                                                             
  .on("listening", () => {                                                                                                                                                                                                                                                      
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {                                                        
    console.log(err);
  });