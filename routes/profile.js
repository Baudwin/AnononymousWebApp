const {Router} = require("express")
const router = Router()
const db = require("../database")

// VIEW USER PROFILE PAGE
router.get("/profile", async(req, res) => {


    const [User] = await db.query(`SELECT * FROM users
    WHERE userID = ?`, req.user.userID)

    res.render("profile", { user:User[0]})
})


// router.get("/settings", (req, res) => {
//     res.render("settings")
// })



module.exports = router