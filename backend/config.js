const dotenv = require('dotenv').config();

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_PASS: process.env.DB_PASS||"",
    DB_USER: process.env.DB_USER || ""
  }