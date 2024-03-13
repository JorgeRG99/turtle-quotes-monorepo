import { StatsModel } from '../models/StatsModel';

export class StatsController {
  static async rankRound(req, res, next) {
    try {        
      const roundUUID = await StatsModel.rankRound({ ...req.body });
      const data = await StatsModel.sampleRanking({ uuid: roundUUID });

      res.status(200).json({
        message: 'Your round have been ranked successfully',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
}
