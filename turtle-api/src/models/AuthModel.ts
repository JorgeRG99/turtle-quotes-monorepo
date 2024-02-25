import { connection } from '../services/db-connection';
import util from 'util';
import bcrypt from 'bcrypt';
import { ErrorCode, SALT_ROUNDS } from '../config';
import { CustomError } from '../utils/classes/CustomError';

export class AuthModel {
  static async register({ name, email, password }) {
    const query = util.promisify(connection.query).bind(connection);
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await query(
      'INSERT INTO users (id, name, email, password_hash) VALUES (UUID(), ?, ?, ?)',
      [name, email, passwordHash]
    );
  }

  static async login({ email, password }) {
    const query = util.promisify(connection.query).bind(connection);
    const user = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) throw new CustomError('User not found', ErrorCode.NotFound);

    const passwordMatch = await bcrypt.compare(password, user[0].password_hash);

    if (!passwordMatch) throw new CustomError('Bad credentials', ErrorCode.BadCredentials);

    const newToken = crypto.randomUUID();

    await query(`UPDATE users SET token = '${newToken}' WHERE id = '${user[0].id}'`, [email]);

    return newToken;
  }

  static async logout({ token }) {
    const query = util.promisify(connection.query).bind(connection);
    await query(`UPDATE users SET token = NULL WHERE token = '${token}'`, [token]);
  }
}
