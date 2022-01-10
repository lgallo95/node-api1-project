// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model.js')

// const User = require('./users/model')

const server = express()

server.use(express.json()) 

server.post('/api/users', async (req, res)=>{

    const { id, name, bio } = req.body
    console.log("req.body", id, name, bio)
    try {
        const insertUsers = await Users.insert({ id, name, bio })
        if (!insertUsers.name || !insertUsers.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
        else {
            res.status(201).json(insertUsers)
        }
    }
    catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

module.exports = server // EXPORT YOUR SERVER instead of {}
