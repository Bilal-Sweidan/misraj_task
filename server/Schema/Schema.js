const mongoose = require('mongoose')

const Accounts_Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    capsules: {
        type: [String],
    }
})

const Capsules_Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    text_content : {
        type: String,
        trim: true,
        lowercase: true
    },
    release_day : {
        type : Date,
        default : Date.now(),  
    },
    release_time : {
        type : String,
        required: true,
    },
    release_statuse : {
        type : Boolean,
        default : false
    },
    image : {
        type : String,
    }
})



const Accounts = mongoose.model("account", Accounts_Schema)
const Capsules = mongoose.model("capsule",Capsules_Schema)
module.exports = {
    Accounts,
    Capsules
}