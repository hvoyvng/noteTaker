const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

//function getting notes
router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) { console.log(err) }
        res.json(JSON.parse(data))
    })
})

//function posting notes to JSON file
router.post('/api/notes', (req, res) => {
    const note = req.body
    fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) { console.log(err) }
        const newNotes = JSON.parse(data)
        newNotes.push(note)
        fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(newNotes), err => {
            if (err) { console.log(err) }
            res.sendStatus(200)
        })
    })
})

//function for deleting notes
router.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
        const deletedNotes = JSON.parse(data)
        for (let i = 0; i < deletedNotes.length; i++) {
            const dbElement = deletedNotes[i]
            if (dbElement.id === req.params.id) {
                deletedNotes.splice(i, 1)
            }
        }
        fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
            if (err) { console.log(err) }
            res.sendStatus(200)
        })
    })
})

module.exports = router