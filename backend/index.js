const express = require("express")
var cors = require('cors')

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const register = require('./routes/register')

// use routers
app.use(register.router)

app.listen(5000, () => {
  console.log(`database running at http://localhost:5000`)
})