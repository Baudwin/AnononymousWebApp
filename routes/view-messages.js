const { Router } = require("express")
const router = Router()
const db = require("../database")





// GET ALL MESSAGES SENT TO A PARTICULAR USER
router.get("/messages/:user", async (req, res) => {
    const user = req.params.user

    const [messages] = await db.query(`SELECT * FROM messages
                WHERE userID = ?`, req.user.userID)
    const [User] = await db.query(`SELECT * FROM users
                WHERE userID = ?`, req.user.userID)
    res.render("messages", { messages: messages, users: User })


})



module.exports = router