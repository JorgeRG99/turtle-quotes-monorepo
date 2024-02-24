import { connection } from '../services/db-connection';
import util from 'util';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config';

export class AuthModel {
  static async register({ name, email, password }) {
    const query = util.promisify(connection.query).bind(connection);
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await query(
      'INSERT INTO users (id, name, email, password_hash) VALUES (UUID(), ?, ?, ?)',
      [name, email, passwordHash]
    );
  }
}
