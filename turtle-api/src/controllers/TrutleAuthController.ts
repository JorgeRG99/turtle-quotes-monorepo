import { AuthModel } from '../models/AuthModel';
import { validateUser } from '../schemas/User';

export class TurtleAuthController {
  static async login(req, res, next) {
    try {
      const sessionToken = await AuthModel.login({ ...req.body });

      res.status(200).json({
        message: 'User logged successfully',
        data: {
          token: sessionToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const validationResult = validateUser(req.body);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.issues.map(
          (issue) => issue.message
        );
        res.status(422).json({ error: errorMessages });

        return;
      }

      const data = await AuthModel.register({ ...req.body });

      res.status(200).json({
        message: 'User created successfully',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      await AuthModel.logout({ token: req.headers.authorization.split(' ')[1]});

      res.status(200).json({
        message: 'User logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
