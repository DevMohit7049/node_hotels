
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy
const person = require('./models/person');

// ..........Passport Middleware Function..........//

passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done)=>{
    //  authentication logic here
    try{
        // console.log('Received credential:',USERNAME,PASSWORD);
        const user = await person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:"Incorrect username"});
        }

        const isPasswordMatch = await user.comparePassword(PASSWORD);

        if(isPasswordMatch){
            return done(null,user);
        }
        else{
             return done(null,false,{message:"Incorrect password"});
        }
    }
    catch(err){
         return done(err);
    }
}))

module.exports = passport //Export configure passport 