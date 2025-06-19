import express from "express";
import cors from "cors";
import dotenv from "dotenv" ;

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config() ;
const app = express();
const PORT = process.env.PORT || 5001 ;

//middleware
app.use(express.json()); // this middleware will parse JSON bodies : req.body
//app.use(cors()) ;  allows every request from every single url
// to specify :
app.use(cors({
    origin:"http://localhost:5173" ,
}))
app.use(rateLimiter) ;
app.use("/api/notes", notesRoutes) ;

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server Started on PORT: ", PORT ) ;
    });
});


// endpoint
// an endpoint is combination of a URL + HTTP method that lets the client interact with a specific ressource
