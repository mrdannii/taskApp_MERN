const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(cors())

app.use(express.json());
// Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/tasks',require('./routes/tasks'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})