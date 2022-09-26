const {register:registerController, login:loginController,logout:logoutController} = require('./userController')

const router = require("express").Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/logout", logoutController)

module.exports = router