const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const ejs = require('ejs')
const db = require("./database")
const messages = require("./routes/view-messages")
const sendMessages = require("./routes/send-message")
const users = require("./routes/user")
const profile = require("./routes/profile")
const local = require("./strategies/local")
const PORT  = 8080
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

app.use(session({
    secret: 'mysecret',
    // cookie: {maxAge:120000},
    resave: false,
    saveUninitialized: false
}))



app.use(express.urlencoded({extended:false}))
app.use(express.json())




app.use(users)
app.use(sendMessages )
app.use(passport.initialize())
app.use(passport.session())



app.use((req,res,next)=>{

    if (req.user) {
        next()
    }else{
        res.redirect("/")
    }

})


app.use(profile)
app.use(messages)



app.listen(PORT ,() =>{
    console.log('server running on port 8080');
})