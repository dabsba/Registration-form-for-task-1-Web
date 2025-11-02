const express = require('express')
const path = require('path')
const fs = require("fs")
const app = express()
const port = 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'));



app.get('/', (req, res) => {
  res.sendFile("index.html", {root: path.join(__dirname)})
})

app.post('/', (req, res) => {
  console.log(">>>", req.body)
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "No data received" })
  }
  
  fs.appendFile("data.txt", JSON.stringify(req.body) + '\n', (err) => {
    if (err) {
      console.error(err)
      res.status(500).json({ success: false, message: "Ошибка! Пользователь не добавлен" })
    }
    else {
      res.status(201).json({ success: true, message: "Пользователь добавлен" }) 
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})