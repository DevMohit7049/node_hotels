const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');


// Post Method for send or create the data for menuItem schema//
router.post('/',async (req,res)=>{
    try{
        //  The data are contain in body //
         const data = req.body;
         const menuItem = new MenuItem(data);
         const response = await menuItem.save();
         console.log("data are saved now");
         res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})


// get method for menu item //
router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log("menu Item fatch");
        res.status(200).json(data);
    }
    catch(err){
       res.status(500).json({error:"Internal Server Error"});
    }
})


router.get('/:taste',async (req,res)=>{
    try{
        const tasteType = req.params.taste;
        if(tasteType=='sweet'||tasteType=='Spicy'||tasteType=='Sour'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('response fatch');
            res.status(200).json(response);
        }
        else{
            res.status(500).json({error:'Invailid work Type'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});


// Update Menu //
router.put('/:id',async (req,res)=>{
    try{
          const menuId =  req.params.id;
          const updateMenuItem = req.body;

          const response = await MenuItem.findByIdAndUpdate(menuId,updateMenuItem,{
             new:true,
             runValidators:true
          })

          console.log("Menu Updated");
          res.status(200).json(response);

          if(!response){
            res.status(404).json({error:'Dish not found'});
           }
    }
    catch(err){
         console.log(err);
         res.status(500).json({error:'Internal server error'});
    }
})


// Delete Menu //

router.delete('/:id',async (req,res)=>{
     try{
         const menuId = req.params.id;
         const response = await MenuItem.findByIdAndDelete(menuId);

         if(!response){
            res.status(404).json({Error:"Menu Not Found"});
         }
         console.log("Menu Deleted");
         res.status(200).json({sucess:"Menu Deleted"})
     }
     catch(err){
          res.status(500).json({Error:"Internal Server Error"});
     }
});


module.exports = router;

