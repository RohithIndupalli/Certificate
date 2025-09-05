// const mongoose=require('mongoose')

// const EmployeeSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })

// const EmployeeModel=mongoose.model("register",EmployeeSchema)
// module.exports=EmployeeModel


const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
