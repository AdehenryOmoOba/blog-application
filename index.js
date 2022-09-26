if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  require('./models/userModel')
  const express = require("express");
  const cookieParser = require('cookie-parser')
  const app = express();
  const mongoose = require("mongoose")
  const cors = require("cors")
  const userRouter = require('./controllers/user/userRouter')
  const messagesRouter = require('./controllers/messages/messagesRouter')
  const uri =  process.env.DB_URI
  const PORT = process.env.PORT || 5000

  //Access-Control-Allow-Origin error
  const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,        
   }

  
  // Middlewares
  app.use(express.json());
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use("/api", userRouter)
  app.use("/api/messages", messagesRouter)
  
  mongoose.connect(uri,
   (err) => {
     if (err) {
       console.log("Error connecting to database" + err)
       return
     } else {
       console.log("Database connection successful")
    app.listen(PORT, () => {
    console.log("Server is listening on port 5000...");
  });
     }
   }
   )
  