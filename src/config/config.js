require('dotenv').config();
const config = {
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV ==='production',
  port: process.env.PORT,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASWWORD,
}

module.exports = {config};
