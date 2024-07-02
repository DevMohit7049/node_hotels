const express = require('express');
const app = express();
const db  = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT || 3000;

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
