import { connection } from '../services/db-connection';

connection.connect();

connection.query('SHOW TABLES', (error, tables) => {
  if (error) throw error;

  tables.forEach((table) => {
    connection.query(
      `DROP TABLE IF EXISTS ${table['Tables_in_turtle-quotes']}`,
      (dropError) => {
        if (dropError) throw dropError;
      }
    );
  });

  connection.end();
});
