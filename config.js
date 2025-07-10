require('dotenv').config();
const db_url = process.env.db_url;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

module.exports  = {
    db_url,
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET
} 
