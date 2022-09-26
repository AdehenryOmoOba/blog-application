const jwt = require('jsonwebtoken')
const userModel = require('../../models/userModel')

const publicMsg =  "God is good...all the time!!!"
const privateMsg =  "This is a confidential message."

const publicMessage = async (req, res) => {
    res.status(200).json({message:publicMsg})
  }

const privateMessage = async (req, res) => { 
    const bearerToken = req.headers.auhtorisation
    if(!bearerToken) return res.sendStatus(403)
    const accessToken = bearerToken.split(' ')[1]
    console.log({accessToken})
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE, (error, decodedToken) => {

      if(error) {
           if(error.message === "jwt expired"){

            const decodedAccessToken = jwt.decode(accessToken)

            console.log(`token is expired`)

            //Fetch user's refreshToken from client 
            const cookie = req.headers.cookie?.split('=')[1]
            if (!cookie) return res.sendStatus(403) 
            const clientRefreshToken = cookie

            //verify refresh token coming from client is not expired
            jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRETE, async (error, decodedRefreshToken) => {
              if(error) return res.sendStatus(403)

             //Fetch user's refreshToken from database
            const {id} = decodedAccessToken
            console.log({id})
            const userFromDB = await userModel.findOne({_id:id})
            console.log('refresh jwt from database',userFromDB.refreshToken)
            if(!userFromDB.refreshToken) return res.sendStatus(403)

             //Issue a new access token to client
              if(decodedRefreshToken.username === userFromDB.username) {
                const newAccessToken = jwt.sign({id:userFromDB._id,username:userFromDB.username}, process.env.ACCESS_TOKEN_SECRETE,{      
                  expiresIn:'20s' 
                 })
                 return  res.status(200).json({message:privateMsg,newAccessToken})
              }
            })
          }
        }else{
         res.username = decodedToken.username
         return res.status(200).json({message:privateMsg})
        }
    })
  }

  module.exports = {publicMessage,privateMessage}