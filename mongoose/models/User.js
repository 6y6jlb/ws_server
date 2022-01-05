const  {Schema,model} = require('mongoose')

const User = new Schema(({
    email:{type:String,unique:true,required:true},
    name:{type:String,unique:false,required:true},
    language:{type:String,unique:false,required:true},
    location: new Schema({
        country:{type:String,unique:false,required:true},
        city:{type:String,unique:false,required:true},

    }),
    password:{type:String,required:true},
    activationLink:{type:String,required:true},
    roles:[{type:String,ref: 'Role'}],
}))

module.exports = model('User', User)