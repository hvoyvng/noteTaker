const express = require('express')
const path = require('path')
const router = require('express').Router()
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes/itemRoutes.js'))

//sends notes file to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//sends index file to *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//port for heroku
const port = process.env.PORT || 4000;

app.listen(port);