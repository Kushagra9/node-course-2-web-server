const express=require('express');

//exprrss app
var app=express();

const fs=require('fs');
const port=process.env.PORT || 3000;

//module handlerbars its a templating language
const hbs=require('hbs');
//partials it is gonna take the directory that i wanna use for partailsit can be used everywhere i.ie footer
hbs.registerPartials(__dirname+'/views/partials');
app.set('view status','hbs');

//middleware express.static is used to absolute path , if we move folder path changes luckily we have __dirname that provides access to __drirname store path tp project directory i.e node-web-server
//server setup complete with this function  use is used to setup middleware

//as many as imiddleware possible we can call use one for authentication , performance and asynchronus callimp next() it will not fire until next
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log =`${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err)
            console.log('Unable to append to server file.');
    });
    //next is use to tell server when your middleware function is done
    //only call next() middleware is gonna move on imp see without next() call
    next();//next handlers i.e  1) & 2) are never gonna fire without this
});

// maintenece handler

//app.use((req,res,next)=>{
//    res.render('maintenence.hbs',{
//        pageTitle:'Maintenance Page',
//        message:'We will be right back'
//    });
//   
//});
app.use(express.static(__dirname+'/public'));//middleware note if i keep this before maintenence.hbs handler all request to this page are still going to load solution: put it belowmaintenense.hbs


//handlet first search for Helper
//1)
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});//reuse the current year better way   name ,function

//screamIt on handler
//2)
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
//task
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        //currentYear:new Date().getFullYear(), removing it because we used helper
        message:'Welcome to home page'
    });
   
});
//register handler
//app.get('/',(req,res)=>{
//    //req contain bunch of data coming
//    //res.send('<h1>Hello express</h1>');//sneding string to client
//    res.send({
//        name:'sunny',
//        likes:[
//            'Biking',
//            'Cities'
//        ]
//    });
//});

//about page and request handler "localhost:3000" /about folder and response about.hbs
app.get('/about',(req,res)=>
       {
   // res.send('About Page'); 
    //rendering static page thouugh hbs templating
    res.render('about.hbs',{
        //this option {} is used for injecting dynamic data
        pageTitle :'About Page',
       // currentYear : new Date().getFullYear()//crrent year  removing it because we used helper

    });
});
app.get('/bad',(req,res)=>
       {
    res.send({
        errorMessage:'Error handling request.'
    });
});
//bind port and localmachine (changed from 300 to port )
//secondd parameter server is up and running ack
app.listen(port,()=>
          {
    console.log(`Server is up on port ${port}`);
});