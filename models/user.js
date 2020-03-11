/*we have to initiate mongoose as we are going to use
its method 'model'*/
const mongoose = require('mongoose')
//model
const User = mongoose.model('User', {
    userName:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    }
})

/*we have to export our function as 
we want to use it*/

module.exports = User
