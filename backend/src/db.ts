import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASS = process.env.PASS;
const DATABASE = process.env.DATABASE;

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASS,
  database: DATABASE,
  connectionLimit: 10,
}).promise();

export default pool;