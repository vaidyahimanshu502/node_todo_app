var todoModel = require('../models/todo');

module.exports.createTodo = async (req, res) => {
    //Destructure
    const {name, category, date} = req.body;

     try{

        if(!name || !category || !date){
            return res.status(402).json({
                success:false,
                message:'Either of three is not valid !'
            })
        }
         console.log(`name : ${name}, category :${category}, date : ${date}`);

         if(!todoModel.isValidCategory(category)) {
            return res.status(402).json({
                success:false,
                message:'Invalid Category !Try Another one ! !'
            }); 
        }

        let res = await todoModel.findOne({name:name});
        if(res) {
            return res.status(402).json({
                success:false,
                message:'Name is Already exist Try another ! !'
            })
        }
        
        let data = await todoModel.create({
            name:name,
            category:category,
            date:date
        })
        return res.status({
            success:true,
            data:data
        })
        
    } catch (error) {
        let errMssg=error.message;
        if(process.env.environment== 'production'){
            errMssg='Internal Server error!!'
        }
        return res.status(500).json({
            success:false,
            message:errMssg
        })
    }
}

// for reading our data from database
module.exports.getTodo =  async  (req, res) => {
    try {
        let data = await todoModel.find({});
        return res.status(200).json({
            success:true,
            data:data
        })
    } catch (error) {
        let errMssg=error.message;
        if(process.env.environment== 'production'){
            errMssg='Internal Server error!!'
        }
        return res.status(500).json({
            success:false,
            message:errMssg
        })
    }
}

module.exports.getTodoByID = async  (req, res) => {

    const { id } = req.params;
    try {
        if(!id) {
            return res.status(402).json({
                success:false,
                message:"invalid Id !!!"
            })
        }
        let data = await todoModel.findById(id);
        return res.status(200).json({
            success:true,
            data:data
        })
    } catch (error) {
        let errMssg=error.message;
        if(process.env.environment== 'production'){
            errMssg='Internal Server error!!'
        }
        return res.status(500).json({
            success:false,
            message:errMssg
        })
    }
}

module.exports.updateStatus = async (req, res) => {
    const { id, status_id } = req.params;
    try {
        if(!(status_id == 0 || status_id == 1)) {
            return res.status(402).json({
                success:false,
                message:"Invalid Status_ID !!!"
            })
        }
        if(!id) {
            return res.status(402).json({
                success:false,
                message:"Invalid ID !!!"
            })
        }
        let data =await todoModel.findById(id);
        if(!data){
            return res.status(402).json({
                success:false,
                message:"Id not found !!!"
            })
        }
        if(status_id==1){
            data.status = 1;
        }else{
            data.status = 0;
        }
        await data.save();

        return res.status(200).json({
            success:true,
            data:data,
            message:"Updated Successfuly !"
        })
    } catch (error) {
        let errMssg=error.message;
        if(process.env.environment== 'production'){
            errMssg='Internal Server error!!'
        }
        return res.status(500).json({
            success:false,
            message:errMssg
        })
    }
}

module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        if(!id) {
            return res.status(402).json({
                success:false,
                message:"You have selected Invalid ID !!!"
            })
        }
        let deletedItem = await todoModel.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            data:deletedItem
        })
    } catch (error) {

        let errMssg=error.message;
        if(process.env.environment== 'production'){
            errMssg='Internal Server error!!'
        }
        return res.status(500).json({
            success:false,
            message:errMssg
        })
        
    }
}


//for front-end part of the project
module.exports.getTodoEJS =  async  (req, res) => {
    
        let data = await todoModel.find({});

        return res.render("home", {
            listItems:data,
            categoryList:todoModel.getCategoryList()
        }) 
}

//to take input from the user by form
module.exports.createTodoEJS = async (req, res) => {
    //Destructure
    const {name, category, date} = req.body;

     await todoModel.create({
            name:name,
            category:category,
            date:date
        })

        return res.redirect('/')
}

module.exports.deleteTodoEJS = async (req, res) => {
    const { id } = req.params;
       
    try {
        await todoModel.findByIdAndDelete(id)
        return res.redirect('/')

    } catch (error) {
        console.log(error)
    }     
}


