const mongoose=require('mongoose');
const urlSchema=new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
  visitsHistory: [{
        timestamp: {
            type: Number,
            default: Date.now
        }
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    }
    
},{
    timestamps:true
}
);

const URL=mongoose.model("url",urlSchema);
module.exports=URL;
