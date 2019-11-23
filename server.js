require('./db/dbConnection.js')
const express = require('express')
const router = require('./routes.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(router)

app.listen(port);
