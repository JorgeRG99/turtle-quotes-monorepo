import { connection } from '../services/db-connection';
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config';


const query = promisify(connection.query).bind(connection);

async function initializeDatabase() {
  try {
    await query(`CREATE TABLE users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
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
        wpm VARCHAR(5) NOT NULL,
        time VARCHAR(5) NULL,
        total_errors VARCHAR(5) NOT NULL,
        accuracy VARCHAR(4) NOT NULL,
        error_rate VARCHAR(5) NOT NULL,
        game_mode_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    
        FOREIGN KEY (game_mode_id) REFERENCES game_modes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);

    await query(
      'INSERT INTO game_modes (id, name) VALUES (UUID(), "countdown")'
    );
    await query(
      'INSERT INTO game_modes (id, name) VALUES (UUID(), "finish quote")'
    );
    
    const passwordHash = await bcrypt.hash("12345678", SALT_ROUNDS);

    await query(
      `INSERT INTO users (id, name, email, password_hash) VALUES (UUID(), "jorgitoram", "jorge@demo.com", '${passwordHash}')`
    );
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    connection.end();
  }
}

initializeDatabase();
