require('dotenv').config();
const SERVER_PORT = process.env.SERVER_PORT || 3002;
const MONGO_DB_ATLUS_URL = process.env.MONGO_DB_ATLUS_URL || 'mongodb://localhost:27017/EcommerceMernDB';
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/assestes/UserImage/UserImage.png';
const activationkey = process.env.PROCESS_REGISTER_ACTIVATION_KEY || 'dkjsnckdsncknsdiwodn';
const smtpUserName = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';

module.exports = {SERVER_PORT,MONGO_DB_ATLUS_URL,defaultImagePath,activationkey,smtpUserName,smtpPassword,smtpHost};