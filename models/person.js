const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        type:String,
        require:true
   
    },
    password:{
        type:String,
        require:true
    }
});

// pre is the middleWare function that call when save operation is called

personSchema.pre('save',async function(next){
    const person = this;
    // Hash the password only if it has been modified(or is new)
    if(!person.isModified('password')) return next();

    try {
     //hash password generation //
     const salt = await bcrypt.genSalt(10);

    //  Hash password //
    const hashPassword = await bcrypt.hash(person.password,salt);

    // Override the plain password with the hashed one
    person.password = hashPassword;

     next(); 
    } 
    catch (error)
    {
       return next(error)  
    }

})


personSchema.methods.comparePassword = async function(candidatePassword)
{
     try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
         
     } catch (error) {
        throw error;
     }
}



// Create Person Model //
const Person = mongoose.model('person',personSchema);

// Export Person //
module.exports=Person;
