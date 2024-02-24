import mysql from 'mysql';

export const connection = mysql.createPool({
  connectionLimit : 10, 
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'turtle-quotes',
});