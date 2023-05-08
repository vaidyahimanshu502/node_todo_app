const mongoose = require('mongoose');

const categoryList = ["gym", "school", "work", "yoga"];

var TOdoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date,
        required:true,
    },
    status:{
        type:Number,
        enum:[0,1],
        default:0
    }
},
{
    timestamps:true
 }
);

TOdoSchema.statics.getCategoryList= function getCategoryList() {
    return categoryList;
};
TOdoSchema.statics.isValidCategory= function isValidCategory(categoryItem) {
    if(categoryList.indexOf(categoryItem) == -1) {
        return false;
    }
    return true;
}

var todoModel= mongoose.model('todo', TOdoSchema);


module.exports= todoModel;