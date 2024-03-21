import dotenv from "dotenv"

dotenv.config()

export default {
    persistence: process.env.PERSISTANCE,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/test',
}