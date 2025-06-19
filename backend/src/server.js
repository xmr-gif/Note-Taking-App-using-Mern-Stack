import express from "express";
import cors from "cors";
import dotenv from "dotenv" ;
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config() ;
const app = express();
const PORT = process.env.PORT || 5001 ;
const __dirname = path.resolve()


//app.use(cors()) ;  allows every request from every single url
// to specify :
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173" ,
    }));
}

//middleware
app.use(express.json()); // this middleware will parse JSON bodies : req.body
app.use(rateLimiter) ;
app.use("/api/notes", notesRoutes) ;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server Started on PORT: ", PORT ) ;
    });
});


// endpoint
// an endpoint is combination of a URL + HTTP method that lets the client interact with a specific ressource
