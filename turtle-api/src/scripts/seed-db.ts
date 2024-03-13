import { connection } from '../services/db-connection';
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config';

const query = promisify(connection.query).bind(connection);

async function initializeDatabase() {
  try {
    await query(`CREATE TABLE users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        token VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `);
    await query(`CREATE TABLE game_modes (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);
    await query(`CREATE TABLE stats (
        id VARCHAR(36) PRIMARY KEY,
        wpm INT NOT NULL,
        time INT NULL,
        total_errors INT NOT NULL,
        accuracy INT NOT NULL,
        error_rate INT NOT NULL,
        game_mode_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    
        FOREIGN KEY (game_mode_id) REFERENCES game_modes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);

    const coundownUUID = crypto.randomUUID();
    const finishQuoteUUID = crypto.randomUUID();

    await query(
      `INSERT INTO game_modes (id, name) VALUES ("${coundownUUID}", "countdown")`
    );
    await query(
      `INSERT INTO game_modes (id, name) VALUES ("${finishQuoteUUID}", "finish quote")`
    );

    const passwordHash = await bcrypt.hash('12345678', SALT_ROUNDS);
    const userUUID = crypto.randomUUID();

    await query(
      `INSERT INTO users (id, username, email, password_hash) VALUES ("${userUUID}", "jorgitoram", "jorge@demo.com", '${passwordHash}')`
    );

    for (let i = 1; i <= 50; i++) {
      const roundUUID = crypto.randomUUID();
      const wpm = Math.round(Math.random() * (130 - 10 + 1)) + 10;
      const time = Math.round(Math.random() * (70 - 20 + 1)) + 20;
      const totalErrors = Math.round(Math.random() * 50);
      const accuracy = Math.max(0, 100 - totalErrors);
      const errorRate = Math.floor(totalErrors / (wpm || 1));

      const insertQuery = `
              INSERT INTO stats (id, wpm, time, total_errors, accuracy, error_rate, game_mode_id, user_id)
              VALUES ("${roundUUID}", "${wpm}", "${time}", "${totalErrors}", "${accuracy}", "${errorRate}", "${finishQuoteUUID}", "${userUUID}")
            `;

      await query(insertQuery);
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    connection.end();
  }
}

initializeDatabase();
