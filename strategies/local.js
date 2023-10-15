const localStrategy = require('passport-local')
const passport = require('passport')
const bcrypt = require('bcrypt');
const db = require("../database")

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    try {

        const [result] = await db.query(`select * from users
        where username = "${username}"`)
        if (result[0]) {
            done(null, result[0])
        }

    } catch (error) {
        done(null, false)
    }

})

passport.use(new localStrategy(async (username, password, done) => {
    try {
        const [user] = await db.query(`SELECT * FROM users
            where username = "${username}"`)
        if (user.length === 0) {
            done(null, false)
        } 
        else {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result === true) {
                    done(null, user[0])
                } else {
                    done(null, false)
                }

            })

        }
    } 
    catch (error) {
        done(null, false)
    }

}
))
