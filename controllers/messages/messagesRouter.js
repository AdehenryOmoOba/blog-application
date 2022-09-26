const {publicMessage:publicMessageController,privateMessage:privateMessageController} = require('./messagesController')

const router = require("express").Router()

router.get("/public", publicMessageController)
router.get("/private", privateMessageController)

module.exports = router