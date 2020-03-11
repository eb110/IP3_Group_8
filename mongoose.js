const mongoose = require('mongoose')

const url = 'mongodb+srv://eb110:fhekjrs343Df@cluster0-rnf08.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology : true
})
