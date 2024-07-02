const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
    },
    work:{
         type:String,
         enum:['cheif','waiter','manager'],
         require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    }
});

// Create Person Model //
const Person = mongoose.model('person',personSchema);

// Export Person //
module.exports=Person;
