const { Router } = require("express")
const router = Router()
const passport = require("passport")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../database")
const _ = require('lodash');


router.get("/", (req, res) => {
    res.render("login")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})



// REGISTER NEW USER

router.post("/signup", async (req, res) => {
    let { username,email, password } = req.body
    let usernamex = _.lowerCase(username)
    const link = `http://127.0.0.1:8080/anon.ymous/${usernamex}`

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = [username,email,hash,link]
        try {
            await db.query(`INSERT INTO users(username,email,password,link)
          VALUES(?,?,?,?)`, newUser)
            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }


    });



})



// LOGIN REGISTERED USERS
router.post("/login", passport.authenticate('local',{failureRedirect:'/'}), async (req, res) => {
    res.redirect("profile")
})




module.exports = router