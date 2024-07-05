const express = require('express');
const app = express();
const db  = require('./db');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const passport = require('./auth')


app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// ..........Middleware Function..........//
const logRequest=(req,res,next)=>{
     console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
     next(); //Move on to the next phase //
}


app.use(passport.initialize());
app.use(logRequest);

const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',function(req,res){
    res.send('Welcome to my hotel..how can i help you')
})

const personRoutes = require('./routes/PersonRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/MenuRoutes');
app.use('/menuItem',menuRoutes);

app.listen(PORT,()=>{
    console.log("Listenign on==",PORT);
});
