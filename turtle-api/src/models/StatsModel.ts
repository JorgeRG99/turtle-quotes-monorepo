import { connection } from '../services/db-connection';
import util from 'util';

export class StatsModel {
  static async rankRound({
    wpm,
    time,
    totalErrors,
    accuracy,
    errorRate,
    gameModeId,
    userId,
  }) {
    const query = util.promisify(connection.query).bind(connection);
    const rankingId = crypto.randomUUID();
    await query(
      'INSERT INTO stats (id, wpm, time, total_errors, accuracy, error_rate, game_mode_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        rankingId,
        wpm,
        time,
        totalErrors,
        accuracy,
        errorRate,
        gameModeId,
        userId,
      ]
    );

    return rankingId;
  }

  static async sampleRanking({ uuid }) {
    const query = util.promisify(connection.query).bind(connection);
    const stats = await query(
      `SELECT s.id, s.wpm, s.time, s.total_errors, s.accuracy, s.error_rate, u.username
      FROM stats s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.wpm DESC, s.accuracy DESC`
    );

    function filterRanking(uuid, stats) {
      const mappedStats = stats.map((stat, index) => ({
        id: stat.id,
        rank: index + 1,
        wpm: stat.wpm,
        totalTime: stat.time,
        totalErrors: stat.total_errors,
        accuracy: stat.accuracy,
        errorRate: stat.error_rate,
        username: stat.username,
      }));
      const userStatIndex = mappedStats.findIndex((stat) => stat.id === uuid);

      return mappedStats.slice(userStatIndex);
    }

    return {
      stats: filterRanking(uuid, stats),
    };
  }
}
