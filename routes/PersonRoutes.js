const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/',async (req,res)=>{

    try{
     const data = req.body // the request body containe the person data
     
     // create a new person document using mongoose person models //
     const newPerson = new Person(data);
     
     // save the new person to the database //
     const response = await newPerson.save();
     console.log("data save");
     res.status(200).json(response);
    }
    catch(err){
         console.log(err);
         res.status(500).json({error:"internal server error"})
    }
 
 })


 // Get method to get the person //

 router.get('/',async (req,res)=>{
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

module.exports = router;
