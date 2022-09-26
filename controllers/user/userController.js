const userModel = require('../../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  
  try {
     const {username:name, password} = req.body
     const salt = await bcrypt.genSalt(11)
     const hashedPassword = await bcrypt.hash(password,salt)
     const newUser = new userModel({username:name, password:hashedPassword})
     const savedUser = await newUser.save()
     const {_id,username} = savedUser
      res.status(201).json({_id,username})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

const login = async (req, res) => {
  
  try {
     const {username:name, password} = req.body
     const user = await userModel.findOne({username:name})
     if(!user) throw new Error('Username not found')
     const checkPassword = await bcrypt.compare(password, user.password)
     if(!checkPassword) throw new Error('Password is incorrect')
     
     const accessToken = jwt.sign({id:user._id,username:user.username}, process.env.ACCESS_TOKEN_SECRETE,{      
     expiresIn:'20s' 
    })
     const refreshToken = jwt.sign({id:user._id,username:user.username}, process.env.REFRESH_TOKEN_SECRETE,{      
     expiresIn: 60,
    })

     await userModel.findOneAndUpdate({username:user.username},{refreshToken: refreshToken})
      
      res.cookie('refreshJWT', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 60 * 1000}) // 1 day: 24 * 60 * 60 * 1000
      res.status(200).json({id:user._id,username:user.username, accessToken})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

const logout = async (req, res) => {

  //Fetch user's refreshToken from client 
  const cookie = req.headers.cookie?.split('=')[1]
  if (!cookie) return res.sendStatus(403) 
  const clientRefreshToken = cookie

  const decodedRefreshToken = jwt.decode(clientRefreshToken)
  const {id} = decodedRefreshToken
  
  try {
      await userModel.findOneAndUpdate({_id:id},{refreshToken: ""})      
      res.clearCookie('refreshJWT', {httpOnly: true, sameSite:'None', secure: true, maxAge: 60 * 1000}) // 1 day: 24 * 60 * 60 * 1000
      res.sendStatus(204)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  module.exports = {register,login,logout}