
const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
phone:{
    type: String,
    required: true,
    min:6
}
,
fullname:{
    type: String,
    required: true,
    min:6
},
 othername:{
    type: String,
    required: true,
    min:2
},
 surname:{
    type: String,
    required: true,
    min:2
},
 sex:{
    type: String,
    required: true,
    min:4
},
 address:{
    type: String,
    required: true,
    min:5
},
 religion:{
    type: String,
    required: true,
    min:4
},
 appliedClass:{
    type: String,
    required: true,
    min:2
},
 prevSch:{
    type: String,
    required: true,
    min:3
},
 prevResult:{
    type: String,
    required: true,
    min:3
},
lga:{
    type: String,
    required: true,
    min:3
},
english:{
    type: String,
    required: true,
    min:3
},
email:{
    type: String,
    required: true,
    min: 6
},
state:{
    type: String,
    required: true,
    min:3
},
dob:{
    type: Date,
    required: true
},

dateRegistered:{
    type: String,
    default: Date.now
}
})
module.exports=mongoose.model('Form',formSchema)
  
 


 

