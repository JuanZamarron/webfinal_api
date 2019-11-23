const mongoose = require('mongoose')

if ( process.env.NODE_ENV === 'production') {
    var connectionURL = process.env.connectionURL
} else {
    const config = require('../config')
    var connectionURL = config.connectionURL
    console.log("Me conecte localmente");
}

mongoose.connect( connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
