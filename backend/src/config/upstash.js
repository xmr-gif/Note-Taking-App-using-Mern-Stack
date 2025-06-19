import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv" // to access env variables
dotenv.config() ;

// create a ratelimiter that allows 100 requests per minute
const rateLimit = new  Ratelimit({
    redis : Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10,"20 s"),
});

export default rateLimit ;
