import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) =>{
    try {
        const {success} = await rateLimit.limit("my-limit-key") ; // in my-limit-key we normally put the user id 
        if(!success){
            return res.status(429).json({
                message:"Too many request, please try again later ",
            });
        }
        next() ;
    } catch (error) {
        console.log("Rate Limit error : ",error) ;

    }



}

export default rateLimiter ;
