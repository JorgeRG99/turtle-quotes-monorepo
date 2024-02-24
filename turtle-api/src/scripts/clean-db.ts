import { connection } from '../services/db-connection';
async function cleanDatabase() {
  try {
    connection.query('SHOW TABLES', (error, tables) => {
      if (error) throw error;  
      
      let completedOperations = 0;

      tables.forEach((table, index, array) => {
        connection.query(
          `DROP TABLE IF EXISTS ${table['Tables_in_turtle-quotes']}`,
          (dropError) => {
            if (dropError) throw dropError;

            completedOperations++;
            if (completedOperations === array.length) connection.end();
          }
        );
      });

      if (tables.length === 0) connection.end();

    });
  } catch (error) {
    console.log(error);
    connection.end();
  }
}

cleanDatabase()