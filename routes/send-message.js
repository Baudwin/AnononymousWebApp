const { Router } = require("express")
const router = Router()
const db = require("../database")

router.get("/anonymous/:user", async(req, res) => {
    const username = req.params.user
    const [User] = await db.query(`SELECT * FROM users
    WHERE username = ?`, username)

    if (User.length > 0) {
       res.render("send-message", {user:User[0]})
    }
    else{
        res.redirect("/")
    }
    
})


// Send Annonymous message to user with link
router.post("/compose", async(req,res)=>{
    let id = req.body.id
    try {
        const message = req.body.message
        const newMessage = [id, message]
        await db.query(`INSERT INTO messages(userID, message)
        VALUES(?,?)`, newMessage)
res.redirect(`/signup`)
    } 
    catch (error) {
        res.send(error)
    }

    })




module.exports = router