const express = require('express')
const app = express()
const port = 3000


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/databaseJon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('DB is connected...'))
  .catch(err => console.log(err)) 


app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Server on port: ${port}`))
