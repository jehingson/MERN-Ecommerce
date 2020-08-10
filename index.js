const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require('./models/User')


const config = require('./config/key')


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('DB is connected...'))
  .catch(err => console.log(err)) 


app.get('/', (req, res) => res.send('Hello World'))

app.post('/register', async (req, res) => {

  
  const user = new User(req.body)
  console.log(user)
  const resss = await user.save()
  
  if (!resss) {
    return res.json({success: false})
  } else {
    return res.status(200).json({
      success: true
    })
  }

})

app.listen(port, () => console.log(`Server on port: ${port}`))
