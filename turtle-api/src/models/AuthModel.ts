import { connection } from '../services/db-connection';
import util from 'util';
import bcrypt from 'bcrypt';
import { ErrorCode, SALT_ROUNDS } from '../config';
import { CustomError } from '../utils/classes/CustomError';

export class AuthModel {
  static async sessionCheck({ token }) {
    const query = util.promisify(connection.query).bind(connection);
    const user = await query('SELECT * FROM users WHERE token = ?', [token]);

    if (user.length === 0)
      throw new CustomError('User not found', ErrorCode.NotFound);

    return {
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
    };
  }

  static async register({ username, email, password }) {
    const query = util.promisify(connection.query).bind(connection);
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newToken = crypto.randomUUID();
    const id = crypto.randomUUID();

    await query(
      `INSERT INTO users (id, username, email, password_hash, token) VALUES (?, ?, ?, ?, ?)`,
      [id, username, email, passwordHash, newToken]
    );

    return {
      user: {
        id,
        username,
        email,
      },
      token: newToken,
    };
  }

  static async login({ email, password }) {
    const query = util.promisify(connection.query).bind(connection);
    const user = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0)
      throw new CustomError('User not found', ErrorCode.NotFound);

    const passwordMatch = await bcrypt.compare(password, user[0].password_hash);

    if (!passwordMatch)
      throw new CustomError('Bad credentials', ErrorCode.BadCredentials);

    const newToken = crypto.randomUUID();

    await query(
      `UPDATE users SET token = '${newToken}' WHERE id = '${user[0].id}'`,
      [email]
    );

    return {
      token: newToken,
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
    };
  }

  static async logout({ token }) {
    const query = util.promisify(connection.query).bind(connection);
    await query(`UPDATE users SET token = NULL WHERE token = '${token}'`, [
      token,
    ]);
  }
}
