const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:['sweet','Spicy','Sour'],
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredient:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
});

const menuItem=mongoose.model('menuItem',menuSchema);
module.exports=menuItem;
