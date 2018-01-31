require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , axios = require('axios')

const app = express();

app.use(bodyParser.json())
app.use(cors())

massive(process.env.DB_CONNECTION).then(db => {
    app.set('db', db)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(__dirname+ '/../build'))

app.get('/api/quotes',(req,res,next)=>{
    const db = app.get('db')
    db.getQuotes().then(response =>{
        res.status(200).send(response)
    })
})

app.post('/api/quotes',(req,res,next)=>{
    const db = app.get('db')
    const {info,source} = req.body
    db.addQuote(info,source).then(response => {
        res.status(200).send(response)
    })
})

app.put('/api/quotes/:id',(req,res,next)=>{
    const db = app.get('db')
    const { info,source,id} = req.body
    db.updateQuote(info,source,id).then(response => {
        res.status(200).send(response)
    })
})

app.delete('/api/quotes/:id',(req,res,next)=>{
    const db = app.get('db')
    const { id } = req.params
    db.deleteQuote([id]).then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/search', (req,res,next)=>{
    const db = app.get('db')
    db.searchQuote(`/api/search/?${req.body.search_input}`)
        .then(response => {
            res.status(200).send(response)
        })
})

app.listen(process.env.SERVER_PORT, () => { console.log(`Server listening on port ${process.env.SERVER_PORT}`) })