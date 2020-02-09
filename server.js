'use strict';

const express = require("express")
const cors = require("cors")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })


const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (req, res) =>  {
     res.sendFile(process.cwd() + '/views/index.html')
  })

app.get('/hello', (req, res) => {
  res.json({greetings: "Hello, API"})
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  (req.file) ? res.json({name: req.file.originalname, size: req.file.size}) : 
    res.json({error: "No file found"})
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...')
})
