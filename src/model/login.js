const mongoose = require("mongoose");

const airbnbSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    cpassword:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const bookingSchema = new mongoose.Schema({
    checkin:{
        type:Date,
        required:true
    },
    checkout:{
        type:Date,
        required:true 
    }
})

const Employee = new mongoose.model("Employee", airbnbSchema);
const BookinDetail = new mongoose.model("BookingDetail", bookingSchema)

module.exports = Employee;