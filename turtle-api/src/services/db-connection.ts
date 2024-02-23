import mysql from 'mysql';

export const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'turtle-quotes',
});