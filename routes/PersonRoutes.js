const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware,generateToken}=require('../jwt')


router.post('/signup',async (req,res)=>{

    try{
     const data = req.body // the request body containe the person data
     // create a new person document using mongoose person models //
     const newPerson = new Person(data);
     
     // save the new person to the database //
     const response = await newPerson.save();
     console.log("data save");

     const payload = {
        id:response.id,
        username:response.username
     }

     const token = generateToken(payload);
     console.log('Token is:',token);

     res.status(200).json({response:response,token:token});
    }
    catch(err){
         console.log(err);
         res.status(500).json({error:"internal server error"})
    }
 
 });


//  Login Route //

router.post('/login',async (req,res)=>{
    try{
        // Extract username and password from requested body //
         const {username,password} = req.body;

        //  Find the user by username //
        const user = await Person.findOne({username:username});

        // if uer does not exist or password does not match, return error//

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        // Generate Token //

        const payload = {
            id:user.id,
            username:user.username
        }

        const token = generateToken(payload)

        // return token or response //

        res.json({token})
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
});


// Profile route //

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData = req.user;
        console.error("user data:",userData);

        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
})



 // Get method to get the person //

 router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
         const data = await Person.find();
         console.log('data fatch');
         res.status(200).json(data);
    }
    catch(err){
        console.log("error aa gaya");
    }
})



router.get('/:work',async (req,res)=>{
    try{
        //  Extract the work type from the URL parameter //
         const workType = req.params.work;
         if(workType=='cheif' || workType=='waiter' || workType=='manager'){
            const response = await Person.find({work:workType});
            console.log('response fatched');
            res.status(200).json(response);
         }
         else{
            res.status(500).json({error:'Invailid work Type'})
         }
    }
    catch(err){
         console.log(err);
         res.status(500).json({error:'Internal server error'});
    }
})


// Update Operation //
router.put('/:id',async (req,res)=>{
    try{
        // Extract the id from the URL parameter //
       const personId = req.params.id;
       const updatePersonData = req.body;

       const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
        new:true,//return the updated document
        runValidators:true //run the mongoose validator
       });

       console.log("Person Updated");
       res.status(200).json(response);

       if(!response){
        res.status(404).json({error:'Person not found'});
       }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

// Delete Operation //

router.delete('/:id',async(req,res)=>{
     
     try{
         const personId = req.params.id;
         const response = await Person.findByIdAndDelete(personId);
         if(!response){
            res.status(404).json({error:'Person not found'});
         }
         console.log("data delete");
         res.status(200).json({message:"Person Deleted"});
     }
     catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
     }
})


// export routes //
module.exports = router;
