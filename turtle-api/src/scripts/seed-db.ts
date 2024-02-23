import { connection } from '../services/db-connection';

connection.connect();

connection.query(
  `CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`
);

connection.query(
  `CREATE TABLE game_modes (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
);

connection.query(
  `CREATE TABLE stats (
    id VARCHAR(36) PRIMARY KEY,
    wpm VARCHAR(5) NOT NULL,
    time VARCHAR(5) NULL,
    total_errors VARCHAR(5) NOT NULL,
    accuracy VARCHAR(4) NOT NULL,
    error_rate VARCHAR(5) NOT NULL,
    game_mode_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY (game_mode_id) REFERENCES game_modes(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`
);

connection.query('INSERT INTO game_modes (id, name) VALUES (UUID(), "countdown")');
connection.query('INSERT INTO game_modes (id, name) VALUES (UUID(), "finish quote")');

connection.query('INSERT INTO users (id, name, email, password) VALUES (UUID(), "jorgitoram", "jorge@demo.com", "12345678")');

connection.end();
