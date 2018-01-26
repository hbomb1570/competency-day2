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

app.listen(process.env.SERVER_PORT, () => { console.log(`Server listening on port ${process.env.SERVER_PORT}`) })